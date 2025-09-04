#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { generateAgent } from '../src/index.js';

const program = new Command();

program
  .name('claude-agent-gen')
  .description('Generate specialized Claude agents from documentation using Playwright MCP')
  .version('1.0.0');

program
  .requiredOption('-u, --url <url>', 'Documentation URL to scrape')
  .option('-n, --name <name>', 'Agent name (auto-generated if not provided)')
  .option('-d, --depth <number>', 'Crawl depth for linked pages', '2')
  .option('-e, --include-examples', 'Extract code examples', false)
  .option('-o, --output <path>', 'Output directory for agent file', '.claude/agents')
  .option('--mcp-server <server>', 'MCP server to use (playwright/simple)', 'simple')
  .option('--update', 'Update existing agent', false)
  .option('--verbose', 'Enable verbose logging', false)
  .option('--force-mcp', 'Force MCP usage (fail if not available)', false)
  .action(async (options) => {
    try {
      console.log(chalk.blue('🤖 Claude Agent Generator'));
      console.log(chalk.gray(`Generating agent from: ${options.url}`));
      
      await generateAgent(options);
      
      console.log(chalk.green('✅ Agent generated successfully!'));
    } catch (error) {
      console.error(chalk.red('❌ Error generating agent:'), error.message);
      if (options.verbose) {
        console.error(error.stack);
      }
      process.exit(1);
    }
  });

program.parse(process.argv);