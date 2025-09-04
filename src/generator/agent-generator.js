import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';

/**
 * Generate Claude agents from processed documentation content
 */
export class AgentGenerator {
  constructor(options = {}) {
    this.options = options;
  }

  /**
   * Generate agent from processed knowledge
   */
  async generateAgent(knowledge, metadata) {
    const spinner = ora('Generating Claude agent...').start();
    
    try {
      const agent = this.buildAgentStructure(knowledge, metadata);
      const outputPath = await this.saveAgent(agent, metadata);
      
      spinner.succeed(`Agent generated: ${outputPath}`);
      return { agent, outputPath };
      
    } catch (error) {
      spinner.fail('Agent generation failed');
      throw error;
    }
  }

  /**
   * Build the agent structure
   */
  buildAgentStructure(knowledge, metadata) {
    const agent = {
      name: this.generateAgentName(metadata),
      description: this.generateDescription(knowledge, metadata),
      version: "1.0.0",
      generated_at: new Date().toISOString(),
      source: {
        url: metadata.url,
        crawled_pages: metadata.totalPages,
        last_updated: new Date().toISOString()
      },
      
      expertise: {
        primary_focus: this.determinePrimaryFocus(knowledge, metadata),
        knowledge_areas: this.extractKnowledgeAreas(knowledge),
        specializations: this.extractSpecializations(knowledge),
        confidence_level: this.calculateConfidenceLevel(knowledge)
      },
      
      knowledge_base: {
        overview: this.processOverview(knowledge.overview),
        apis: this.processAPIs(knowledge.apis),
        examples: this.processExamples(knowledge.examples),
        concepts: this.processConcepts(knowledge.concepts),
        patterns: this.processPatterns(knowledge.patterns),
        troubleshooting: this.processTroubleshooting(knowledge.troubleshooting),
        configuration: this.processConfiguration(knowledge.configuration)
      },
      
      capabilities: {
        can_provide_examples: knowledge.examples.length > 0,
        can_debug_issues: knowledge.troubleshooting.length > 0,
        can_explain_concepts: knowledge.concepts.length > 0,
        can_suggest_patterns: knowledge.patterns.length > 0,
        has_api_knowledge: knowledge.apis.length > 0,
        has_configuration_help: knowledge.configuration.length > 0
      },
      
      instructions: this.generateInstructions(knowledge, metadata),
      
      metadata: {
        generation_stats: {
          pages_processed: metadata.totalPages,
          examples_found: knowledge.examples.length,
          concepts_extracted: knowledge.concepts.length,
          api_endpoints: this.countAPIEndpoints(knowledge.apis),
          code_blocks: this.countCodeBlocks(knowledge.examples)
        },
        quality_score: this.calculateQualityScore(knowledge),
        coverage_areas: this.calculateCoverage(knowledge)
      }
    };

    return agent;
  }

  /**
   * Generate agent name from metadata
   */
  generateAgentName(metadata) {
    if (this.options.name) {
      return this.options.name;
    }
    
    const url = new URL(metadata.url);
    const domain = url.hostname.replace('www.', '');
    const toolName = this.extractToolName(domain, url.pathname);
    
    return `${toolName}-expert`.toLowerCase();
  }

  /**
   * Extract tool name from URL
   */
  extractToolName(domain, pathname) {
    // Try to extract from domain
    const domainParts = domain.split('.');
    if (domainParts.length >= 2) {
      const mainPart = domainParts[domainParts.length - 2];
      if (mainPart !== 'github' && mainPart !== 'gitlab' && mainPart.length > 2) {
        return mainPart;
      }
    }
    
    // Try to extract from pathname
    const pathParts = pathname.split('/').filter(Boolean);
    if (pathParts.length > 0) {
      return pathParts[0];
    }
    
    return 'documentation';
  }

  /**
   * Generate agent description
   */
  generateDescription(knowledge, metadata) {
    const toolName = this.extractToolName(
      new URL(metadata.url).hostname.replace('www.', ''),
      new URL(metadata.url).pathname
    );
    
    let description = `Expert assistant for ${toolName.charAt(0).toUpperCase() + toolName.slice(1)}`;
    
    if (knowledge.overview.length > 0) {
      const mainOverview = knowledge.overview[0];
      if (mainOverview.keyPoints.length > 0) {
        description += `. ${mainOverview.keyPoints[0]}`;
      }
    }
    
    description += ` Auto-generated from official documentation with comprehensive knowledge of APIs, examples, and best practices.`;
    
    return description;
  }

  /**
   * Determine primary focus area
   */
  determinePrimaryFocus(knowledge, metadata) {
    const areas = [
      { name: 'API Development', score: knowledge.apis.length * 2 },
      { name: 'Configuration Management', score: knowledge.configuration.length * 1.5 },
      { name: 'Code Examples & Tutorials', score: knowledge.examples.length },
      { name: 'Troubleshooting & Support', score: knowledge.troubleshooting.length * 1.2 },
      { name: 'Concepts & Theory', score: knowledge.concepts.length * 0.8 }
    ];
    
    areas.sort((a, b) => b.score - a.score);
    return areas[0]?.name || 'General Documentation';
  }

  /**
   * Extract knowledge areas
   */
  extractKnowledgeAreas(knowledge) {
    const areas = [];
    
    if (knowledge.apis.length > 0) areas.push('api-reference');
    if (knowledge.examples.length > 0) areas.push('code-examples');
    if (knowledge.configuration.length > 0) areas.push('configuration');
    if (knowledge.patterns.length > 0) areas.push('best-practices');
    if (knowledge.troubleshooting.length > 0) areas.push('troubleshooting');
    if (knowledge.concepts.length > 0) areas.push('concepts');
    
    return areas.length > 0 ? areas : ['general'];
  }

  /**
   * Extract specializations
   */
  extractSpecializations(knowledge) {
    const specializations = new Set();
    
    // Extract from examples
    knowledge.examples.forEach(example => {
      if (example.category) specializations.add(example.category);
      if (example.language) specializations.add(`${example.language}-development`);
    });
    
    // Extract from concepts
    knowledge.concepts.forEach(concept => {
      concept.tags?.forEach(tag => specializations.add(tag));
    });
    
    return Array.from(specializations).slice(0, 10);
  }

  /**
   * Calculate confidence level based on content quality
   */
  calculateConfidenceLevel(knowledge) {
    let score = 0;
    let maxScore = 0;
    
    // API documentation
    if (knowledge.apis.length > 0) {
      score += Math.min(knowledge.apis.length * 10, 50);
      maxScore += 50;
    }
    
    // Code examples
    if (knowledge.examples.length > 0) {
      score += Math.min(knowledge.examples.length * 5, 30);
      maxScore += 30;
    }
    
    // Concepts coverage
    if (knowledge.concepts.length > 0) {
      score += Math.min(knowledge.concepts.length * 2, 20);
      maxScore += 20;
    }
    
    const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
    
    if (percentage >= 80) return 'high';
    if (percentage >= 60) return 'medium';
    return 'basic';
  }

  /**
   * Process overview for agent
   */
  processOverview(overview) {
    return overview.map(item => ({
      title: item.title,
      summary: this.summarizeContent(item.content, 200),
      key_points: item.keyPoints,
      source_url: item.url
    }));
  }

  /**
   * Process APIs for agent
   */
  processAPIs(apis) {
    return apis.map(api => ({
      title: api.title,
      methods: api.methods.slice(0, 20), // Limit to prevent bloat
      parameters: api.parameters.slice(0, 30),
      endpoints: api.endpoints,
      examples: api.examples.slice(0, 10),
      source_url: api.url
    }));
  }

  /**
   * Process examples for agent
   */
  processExamples(examples) {
    // Group examples by category and language
    const grouped = examples.reduce((acc, example) => {
      const key = `${example.category}-${example.language}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(example);
      return acc;
    }, {});
    
    // Take best examples from each group
    const processed = [];
    Object.values(grouped).forEach(group => {
      // Sort by code quality (longer, more complete examples first)
      group.sort((a, b) => b.code.length - a.code.length);
      processed.push(...group.slice(0, 3)); // Max 3 per group
    });
    
    return processed.slice(0, 50).map(example => ({
      title: example.title,
      language: example.language,
      code: example.code,
      description: example.description,
      category: example.category,
      source_url: example.source
    }));
  }

  /**
   * Process concepts for agent
   */
  processConcepts(concepts) {
    return concepts.slice(0, 100).map(concept => ({
      title: concept.title,
      level: concept.level,
      explanation: this.summarizeContent(concept.content, 300),
      tags: concept.tags,
      source_url: concept.url
    }));
  }

  /**
   * Process patterns for agent
   */
  processPatterns(patterns) {
    return patterns.slice(0, 50).map(pattern => ({
      type: pattern.type,
      description: pattern.description,
      examples: pattern.examples.slice(0, 3),
      source_url: pattern.source
    }));
  }

  /**
   * Process troubleshooting for agent
   */
  processTroubleshooting(troubleshooting) {
    return troubleshooting.map(item => ({
      title: item.title,
      common_issues: item.issues.slice(0, 10),
      solutions: item.solutions.slice(0, 10),
      error_codes: item.errorCodes.slice(0, 20),
      source_url: item.url
    }));
  }

  /**
   * Process configuration for agent
   */
  processConfiguration(configuration) {
    return configuration.map(config => ({
      title: config.title,
      options: config.options.slice(0, 50),
      examples: config.examples.slice(0, 5),
      prerequisites: config.prerequisites.slice(0, 10),
      source_url: config.url
    }));
  }

  /**
   * Generate comprehensive instructions for the agent
   */
  generateInstructions(knowledge, metadata) {
    const toolName = this.extractToolName(
      new URL(metadata.url).hostname.replace('www.', ''),
      new URL(metadata.url).pathname
    );

    return `You are an expert assistant specialized in ${toolName}. Your knowledge comes from comprehensive analysis of the official documentation.

## Your Expertise

You have deep knowledge in the following areas:
${this.extractKnowledgeAreas(knowledge).map(area => `- ${area.replace('-', ' ')}`).join('\\n')}

## How to Help Users

1. **Provide Accurate Information**: Use your knowledge base to give precise, up-to-date guidance based on official documentation.

2. **Show Examples**: When possible, provide relevant code examples from your knowledge base to illustrate concepts.

3. **Explain Concepts**: Break down complex topics using the concepts and explanations in your knowledge base.

4. **Suggest Best Practices**: Share patterns and best practices you've learned from the documentation.

5. **Help with Troubleshooting**: Use your troubleshooting knowledge to help diagnose and solve problems.

6. **Configuration Assistance**: Provide guidance on setup and configuration options.

## Response Guidelines

- Always cite source documentation when providing specific technical details
- Provide working code examples when available
- Explain the reasoning behind recommendations
- Suggest related concepts that might be helpful
- Be specific about version compatibility when relevant

## Knowledge Limitations

Your knowledge is based on documentation crawled on ${new Date().toLocaleDateString()} from ${metadata.url}. 
- Total pages processed: ${metadata.totalPages}
- Examples available: ${knowledge.examples.length}
- API endpoints documented: ${this.countAPIEndpoints(knowledge.apis)}

Always acknowledge when you're uncertain about information not covered in your knowledge base.`;
  }

  /**
   * Save agent to file
   */
  async saveAgent(agent, metadata) {
    const outputDir = path.resolve(this.options.output || '.claude/agents');
    await fs.ensureDir(outputDir);
    
    const fileName = `${agent.name}.json`;
    const outputPath = path.join(outputDir, fileName);
    
    await fs.writeJSON(outputPath, agent, { spaces: 2 });
    
    // Also save metadata
    const metadataPath = path.join(outputDir, `${agent.name}.metadata.json`);
    await fs.writeJSON(metadataPath, {
      generated_at: new Date().toISOString(),
      source_url: metadata.url,
      options: this.options,
      stats: {
        pages_crawled: metadata.totalPages,
        knowledge_extracted: {
          apis: agent.knowledge_base.apis.length,
          examples: agent.knowledge_base.examples.length,
          concepts: agent.knowledge_base.concepts.length,
          patterns: agent.knowledge_base.patterns.length
        }
      }
    }, { spaces: 2 });
    
    return outputPath;
  }

  // Helper methods

  summarizeContent(content, maxLength) {
    if (!content || content.length <= maxLength) {
      return content;
    }
    
    const truncated = content.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    return lastSpace > maxLength * 0.8 
      ? truncated.substring(0, lastSpace) + '...'
      : truncated + '...';
  }

  countAPIEndpoints(apis) {
    return apis.reduce((sum, api) => sum + (api.endpoints?.length || 0), 0);
  }

  countCodeBlocks(examples) {
    return examples.length;
  }

  calculateQualityScore(knowledge) {
    let score = 0;
    
    // Content diversity
    if (knowledge.apis.length > 0) score += 20;
    if (knowledge.examples.length > 5) score += 25;
    if (knowledge.concepts.length > 10) score += 20;
    if (knowledge.patterns.length > 0) score += 15;
    if (knowledge.troubleshooting.length > 0) score += 10;
    if (knowledge.configuration.length > 0) score += 10;
    
    return Math.min(score, 100);
  }

  calculateCoverage(knowledge) {
    const areas = [];
    
    if (knowledge.apis.length > 3) areas.push('comprehensive-api');
    if (knowledge.examples.length > 10) areas.push('rich-examples');
    if (knowledge.concepts.length > 20) areas.push('detailed-concepts');
    if (knowledge.troubleshooting.length > 2) areas.push('troubleshooting-support');
    if (knowledge.configuration.length > 1) areas.push('configuration-guidance');
    
    return areas;
  }
}