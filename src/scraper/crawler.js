import chalk from 'chalk';
import ora from 'ora';
import { FlexibleDocumentationCrawler } from './simple-scraper.js';
import { DEFAULT_CONFIG } from '../cli/config.js';

/**
 * Web crawler that uses Playwright MCP to scrape documentation sites
 * Now delegates to FlexibleDocumentationCrawler for better compatibility
 */
export class DocumentationCrawler extends FlexibleDocumentationCrawler {
  constructor(options = {}) {
    const mergedOptions = { ...DEFAULT_CONFIG, ...options };
    super(mergedOptions);
  }
}