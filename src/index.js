import chalk from 'chalk';
import ora from 'ora';
import { DocumentationCrawler } from './scraper/crawler.js';
import { ContentExtractor } from './processor/content-extractor.js';
import { AgentGenerator } from './generator/agent-generator.js';
import { validateConfig } from './cli/config.js';

/**
 * Main entry point for generating Claude agents from documentation
 */
export async function generateAgent(options) {
  // Validate configuration
  const configErrors = validateConfig(options);
  if (configErrors.length > 0) {
    throw new Error(`Configuration errors:\\n${configErrors.join('\\n')}`);
  }

  const startTime = Date.now();
  let pages = [];
  let knowledge = {};
  
  try {
    // Phase 1: Web Crawling
    console.log(chalk.blue('\\n📡 Phase 1: Crawling Documentation'));
    console.log(chalk.gray(`Target: ${options.url}`));
    console.log(chalk.gray(`Depth: ${options.depth} levels`));
    console.log(chalk.gray(`MCP Server: ${options.mcpServer}`));
    
    const crawler = new DocumentationCrawler({
      ...options,
      verbose: options.verbose
    });
    
    pages = await crawler.crawl(options.url);
    
    const stats = crawler.getStats();
    console.log(chalk.green('✅ Crawling completed'));
    console.log(chalk.gray(`  └─ Pages: ${stats.totalPages}`));
    console.log(chalk.gray(`  └─ Links: ${stats.totalLinks}`));
    console.log(chalk.gray(`  └─ Code blocks: ${stats.totalCodeBlocks}`));

    // Phase 2: Content Processing
    console.log(chalk.blue('\\n🧠 Phase 2: Processing Content'));
    
    const extractor = new ContentExtractor(options);
    knowledge = await extractor.processPages(pages);
    
    console.log(chalk.green('✅ Content processing completed'));
    console.log(chalk.gray(`  └─ APIs: ${knowledge.apis.length}`));
    console.log(chalk.gray(`  └─ Examples: ${knowledge.examples.length}`));
    console.log(chalk.gray(`  └─ Concepts: ${knowledge.concepts.length}`));
    console.log(chalk.gray(`  └─ Patterns: ${knowledge.patterns.length}`));
    
    // Phase 3: Agent Generation
    console.log(chalk.blue('\\n🤖 Phase 3: Generating Claude Agent'));
    
    const generator = new AgentGenerator(options);
    const metadata = {
      url: options.url,
      totalPages: pages.length,
      crawlDepth: options.depth,
      ...stats
    };
    
    const result = await generator.generateAgent(knowledge, metadata);
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    
    // Success summary
    console.log(chalk.green('\\n🎉 Agent Generation Complete!'));
    console.log(chalk.white(`Agent: ${result.agent.name}`));
    console.log(chalk.white(`File: ${result.outputPath}`));
    console.log(chalk.gray(`Duration: ${duration}s`));
    
    // Display agent capabilities
    console.log(chalk.blue('\\n📋 Agent Capabilities:'));
    const capabilities = result.agent.capabilities;
    Object.entries(capabilities).forEach(([key, value]) => {
      const icon = value ? '✅' : '❌';
      const capability = key.replace('can_', '').replace('has_', '').replace(/_/g, ' ');
      console.log(chalk.gray(`  ${icon} ${capability}`));
    });
    
    // Display quality metrics
    console.log(chalk.blue('\\n📊 Quality Metrics:'));
    console.log(chalk.gray(`  Confidence Level: ${result.agent.expertise.confidence_level}`));
    console.log(chalk.gray(`  Quality Score: ${result.agent.metadata.quality_score}/100`));
    console.log(chalk.gray(`  Knowledge Areas: ${result.agent.expertise.knowledge_areas.length}`));
    
    // Usage instructions
    console.log(chalk.blue('\\n💡 Usage Instructions:'));
    console.log(chalk.gray('1. Copy the agent file to your Claude Desktop agents folder'));
    console.log(chalk.gray('2. Restart Claude Desktop to load the new agent'));
    console.log(chalk.gray('3. Select the agent in Claude Desktop to start using it'));
    
    if (options.verbose) {
      console.log(chalk.blue('\\n🔍 Detailed Statistics:'));
      console.log(chalk.gray(`  Primary Focus: ${result.agent.expertise.primary_focus}`));
      console.log(chalk.gray(`  Specializations: ${result.agent.expertise.specializations.join(', ')}`));
      console.log(chalk.gray(`  API Endpoints: ${result.agent.metadata.generation_stats.api_endpoints}`));
      console.log(chalk.gray(`  Coverage Areas: ${result.agent.metadata.coverage_areas.join(', ')}`));
    }
    
    return result;
    
  } catch (error) {
    console.error(chalk.red('\\n❌ Agent generation failed'));
    
    if (error.message.includes('MCP')) {
      console.error(chalk.yellow('\\n💡 MCP Troubleshooting:'));
      console.error(chalk.gray('1. Ensure MCP Playwright server is installed'));
      console.error(chalk.gray('2. Check that the server is running'));
      console.error(chalk.gray('3. Verify MCP_PLAYWRIGHT_SERVER environment variable'));
      console.error(chalk.gray('4. Try running: npm install @executeautomation/mcp-playwright'));
    } else if (error.message.includes('network') || error.message.includes('timeout')) {
      console.error(chalk.yellow('\\n💡 Network Troubleshooting:'));
      console.error(chalk.gray('1. Check your internet connection'));
      console.error(chalk.gray('2. Verify the documentation URL is accessible'));
      console.error(chalk.gray('3. Try increasing timeout with longer wait'));
    } else if (pages.length === 0) {
      console.error(chalk.yellow('\\n💡 No Content Found:'));
      console.error(chalk.gray('1. Verify the URL contains documentation'));
      console.error(chalk.gray('2. Check if the site requires authentication'));
      console.error(chalk.gray('3. Try a different starting URL'));
    }
    
    throw error;
  }
}

/**
 * Utility function to list generated agents
 */
export async function listAgents(agentsDir = '.claude/agents') {
  const fs = await import('fs-extra');
  const path = await import('path');
  
  try {
    const agentsPath = path.resolve(agentsDir);
    const files = await fs.readdir(agentsPath);
    const agentFiles = files.filter(file => file.endsWith('.json') && !file.includes('.metadata.'));
    
    if (agentFiles.length === 0) {
      console.log(chalk.yellow('No agents found in ' + agentsPath));
      return;
    }
    
    console.log(chalk.blue(`\\n🤖 Found ${agentFiles.length} agents:`));
    
    for (const file of agentFiles) {
      const agentPath = path.join(agentsPath, file);
      const agent = await fs.readJSON(agentPath);
      
      console.log(chalk.white(`\\n${agent.name}`));
      console.log(chalk.gray(`  Description: ${agent.description}`));
      console.log(chalk.gray(`  Source: ${agent.source.url}`));
      console.log(chalk.gray(`  Generated: ${new Date(agent.generated_at).toLocaleDateString()}`));
      console.log(chalk.gray(`  Confidence: ${agent.expertise.confidence_level}`));
    }
    
  } catch (error) {
    console.error(chalk.red('Error listing agents:'), error.message);
  }
}

export default { generateAgent, listAgents };