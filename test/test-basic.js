#!/usr/bin/env node

/**
 * Basic test to verify the claude-agent-gen tool works
 * This test uses mock data instead of real web scraping
 */

import { generateAgent } from '../src/index.js';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

async function testBasicGeneration() {
  console.log(chalk.blue('🧪 Testing Claude Agent Generator'));
  
  const testOptions = {
    url: 'https://example.com/docs',
    name: 'example-test-agent',
    depth: 1,
    output: './test-output',
    verbose: true,
    mcpServer: 'playwright'
  };

  try {
    // Set mock environment for testing
    process.env.MCP_PLAYWRIGHT_SERVER = 'true';
    
    console.log(chalk.gray('Starting test generation...'));
    
    const result = await generateAgent(testOptions);
    
    console.log(chalk.green('✅ Test generation completed!'));
    console.log(chalk.gray(`Agent file: ${result.outputPath}`));
    
    // Verify the generated file
    const agentExists = await fs.pathExists(result.outputPath);
    if (agentExists) {
      const agent = await fs.readJSON(result.outputPath);
      
      console.log(chalk.blue('\\n📋 Generated Agent Summary:'));
      console.log(chalk.white(`Name: ${agent.name}`));
      console.log(chalk.white(`Description: ${agent.description}`));
      console.log(chalk.white(`Confidence: ${agent.expertise.confidence_level}`));
      console.log(chalk.white(`Knowledge Areas: ${agent.expertise.knowledge_areas.length}`));
      
      // Verify required fields
      const requiredFields = ['name', 'description', 'expertise', 'knowledge_base', 'instructions'];
      const missingFields = requiredFields.filter(field => !agent[field]);
      
      if (missingFields.length === 0) {
        console.log(chalk.green('✅ All required fields present'));
      } else {
        console.log(chalk.red(`❌ Missing fields: ${missingFields.join(', ')}`));
      }
      
      // Clean up test output
      await fs.remove('./test-output');
      console.log(chalk.gray('Test files cleaned up'));
      
    } else {
      console.log(chalk.red('❌ Agent file was not created'));
    }
    
  } catch (error) {
    console.error(chalk.red('❌ Test failed:'), error.message);
    
    // Clean up on error
    try {
      await fs.remove('./test-output');
    } catch (cleanupError) {
      // Ignore cleanup errors
    }
    
    process.exit(1);
  }
}

// Run the test
testBasicGeneration();