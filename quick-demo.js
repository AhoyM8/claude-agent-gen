#!/usr/bin/env node

/**
 * Quick demo that limits pages to show the complete workflow
 */

import { generateAgent } from './src/index.js';
import chalk from 'chalk';

async function quickDemo() {
  console.log(chalk.blue('🚀 Claude Agent Generator - Quick Demo'));
  console.log(chalk.gray('This demo limits pages for faster completion\n'));
  
  const options = {
    url: 'https://tailwindcss.com/docs/installation',
    name: 'tailwind-quick-demo',
    depth: 1,
    output: './demo-output',
    verbose: true,
    mcpServer: 'simple',
    maxPages: 5  // Limit to 5 pages for quick demo
  };

  try {
    const result = await generateAgent(options);
    
    console.log(chalk.green('\n🎉 Demo completed successfully!'));
    console.log(chalk.white(`Agent created: ${result.outputPath}`));
    
    // Show the generated agent summary
    console.log(chalk.blue('\n📋 Generated Agent Preview:'));
    console.log(chalk.gray(`Name: ${result.agent.name}`));
    console.log(chalk.gray(`Description: ${result.agent.description.substring(0, 100)}...`));
    console.log(chalk.gray(`Confidence: ${result.agent.expertise.confidence_level}`));
    console.log(chalk.gray(`Knowledge Areas: ${result.agent.expertise.knowledge_areas.join(', ')}`));
    console.log(chalk.gray(`APIs Found: ${result.agent.knowledge_base.apis.length}`));
    console.log(chalk.gray(`Examples Found: ${result.agent.knowledge_base.examples.length}`));
    console.log(chalk.gray(`Concepts Found: ${result.agent.knowledge_base.concepts.length}`));
    
    console.log(chalk.blue('\n💡 Next Steps:'));
    console.log(chalk.gray('1. Open the generated agent file to see the full knowledge base'));
    console.log(chalk.gray('2. Copy the agent to your Claude Desktop agents folder'));
    console.log(chalk.gray('3. Try generating agents from other documentation sites!'));
    
  } catch (error) {
    console.error(chalk.red('\n❌ Demo failed:'), error.message);
    process.exit(1);
  }
}

quickDemo();