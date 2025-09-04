import * as cheerio from 'cheerio';
import chalk from 'chalk';
import ora from 'ora';

/**
 * Simple web scraper using Node.js fetch API (no MCP dependency)
 * This is a fallback scraper for when MCP Playwright is not available
 */
export class SimpleScraper {
  constructor(options = {}) {
    this.verbose = options.verbose || false;
    this.timeout = options.timeout || 30000;
    this.userAgent = options.userAgent || 'ClaudeAgentGen/1.0 (+https://github.com/anthropics/claude-agent-gen)';
    this.visited = new Set();
  }

  /**
   * Initialize scraper (no-op for simple scraper)
   */
  async initialize() {
    if (this.verbose) {
      console.log(chalk.gray('Using built-in web scraper (no MCP required)'));
    }
    return Promise.resolve();
  }

  /**
   * Fetch and parse page content
   */
  async getPageContent(url) {
    const spinner = ora(`Fetching content from ${url}`).start();
    
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1'
        },
        signal: AbortSignal.timeout(this.timeout)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();
      const $ = cheerio.load(html);
      
      // Extract content using cheerio
      const content = this.extractContent($);
      
      spinner.succeed(`Content fetched from ${url}`);
      return content;
      
    } catch (error) {
      spinner.fail(`Failed to fetch ${url}`);
      if (this.verbose) {
        console.error(chalk.red(`  └─ Error: ${error.message}`));
      }
      throw error;
    }
  }

  /**
   * Extract structured content from HTML using cheerio
   */
  extractContent($) {
    // Get page title
    const title = $('title').text().trim() || 
                  $('h1').first().text().trim() || 
                  'Documentation Page';

    // Extract main content
    const contentSelectors = [
      'main',
      '.content',
      '.documentation',
      'article',
      '.docs-content',
      '#content',
      '.main-content'
    ];
    
    let mainContent = '';
    for (const selector of contentSelectors) {
      const content = $(selector);
      if (content.length && content.text().trim().length > 100) {
        mainContent = content.text().trim();
        break;
      }
    }
    
    // Fallback to body if no main content found
    if (!mainContent) {
      mainContent = $('body').text().trim();
    }

    // Extract headings
    const headings = [];
    $('h1, h2, h3, h4, h5, h6').each((i, el) => {
      const $el = $(el);
      const level = parseInt(el.tagName.charAt(1));
      const text = $el.text().trim();
      const id = $el.attr('id') || this.generateId(text);
      
      if (text) {
        headings.push({ level, text, id });
      }
    });

    // Extract code blocks
    const codeBlocks = [];
    $('pre code, .code-block, .highlight pre, .language-*').each((i, el) => {
      const $el = $(el);
      const code = $el.text().trim();
      
      if (code && code.length > 10) {
        // Try to detect language from class names
        const className = $el.attr('class') || $el.parent().attr('class') || '';
        const languageMatch = className.match(/language-([\\w-]+)|lang-([\\w-]+)/);
        const language = languageMatch ? (languageMatch[1] || languageMatch[2]) : 'text';
        
        codeBlocks.push({ code, language });
      }
    });

    // Extract links
    const links = [];
    $('a[href]').each((i, el) => {
      const $el = $(el);
      const href = $el.attr('href');
      const text = $el.text().trim();
      
      if (href && text && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
        links.push({ href, text });
      }
    });

    // Extract navigation
    const navigation = { items: [] };
    $('nav a, .nav a, .navigation a, .sidebar a, .menu a').each((i, el) => {
      const $el = $(el);
      const href = $el.attr('href');
      const text = $el.text().trim();
      
      if (href && text) {
        navigation.items.push({ href, text });
      }
    });

    return {
      url: '',
      title,
      html: $.html(),
      text: this.cleanText(mainContent),
      headings,
      codeBlocks,
      links: links.slice(0, 50), // Limit to prevent bloat
      navigation
    };
  }

  /**
   * Get links from a page for crawling
   */
  async getPageLinks(url, baseUrl) {
    try {
      const content = await this.getPageContent(url);
      const validLinks = [];
      
      content.links.forEach(link => {
        try {
          const fullUrl = new URL(link.href, baseUrl).href;
          const parsedUrl = new URL(fullUrl);
          
          // Only include links from the same domain
          if (parsedUrl.origin === new URL(baseUrl).origin) {
            validLinks.push(fullUrl);
          }
        } catch (error) {
          // Skip invalid URLs
        }
      });
      
      return validLinks;
    } catch (error) {
      if (this.verbose) {
        console.error(chalk.yellow(`⚠️  Could not extract links from ${url}:`, error.message));
      }
      return [];
    }
  }

  /**
   * Check if we can access a URL (basic connectivity test)
   */
  async canAccess(url) {
    try {
      const response = await fetch(url, { 
        method: 'HEAD',
        signal: AbortSignal.timeout(10000)
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Clean up resources (no-op for simple scraper)
   */
  async close() {
    if (this.verbose) {
      console.log(chalk.gray('Simple scraper cleanup complete'));
    }
  }

  // Helper methods

  generateId(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\\s]/g, '')
      .replace(/\\s+/g, '-')
      .substring(0, 50);
  }

  cleanText(text) {
    return text
      .replace(/\\s+/g, ' ')
      .replace(/\\n+/g, '\\n')
      .trim()
      .substring(0, 10000); // Limit content length
  }
}

/**
 * Enhanced crawler that can work with or without MCP
 */
export class FlexibleDocumentationCrawler {
  constructor(options = {}) {
    this.options = options;
    this.visited = new Set();
    this.queue = [];
    this.pages = [];
    this.baseUrl = '';
    this.scraper = null;
  }

  /**
   * Initialize the appropriate scraper based on availability
   */
  async initialize(startUrl) {
    this.baseUrl = new URL(startUrl).origin;
    
    // Try to use MCP first, fall back to simple scraper
    if (process.env.MCP_PLAYWRIGHT_SERVER && this.options.mcpServer === 'playwright') {
      try {
        const { PlaywrightMCP } = await import('./playwright-mcp.js');
        this.scraper = new PlaywrightMCP(this.options);
        await this.scraper.initialize();
        
        if (this.options.verbose) {
          console.log(chalk.green('✓ Using MCP Playwright server'));
        }
      } catch (error) {
        if (this.options.verbose) {
          console.log(chalk.yellow('⚠️  MCP Playwright not available, using simple scraper'));
        }
        this.scraper = new SimpleScraper(this.options);
        await this.scraper.initialize();
      }
    } else {
      this.scraper = new SimpleScraper(this.options);
      await this.scraper.initialize();
    }
  }

  /**
   * Crawl documentation starting from URL
   */
  async crawl(startUrl) {
    const spinner = ora('Initializing crawler...').start();
    
    try {
      await this.initialize(startUrl);
      
      spinner.text = 'Starting documentation crawl...';
      
      // Add initial URL to queue
      this.queue.push({ url: startUrl, depth: 0 });
      
      const maxPages = this.options.maxPages || 50;
      while (this.queue.length > 0 && this.pages.length < maxPages) {
        const current = this.queue.shift();
        
        if (this.visited.has(current.url) || current.depth > (this.options.depth || 2)) {
          continue;
        }
        
        await this.crawlPage(current.url, current.depth);
        
        // Update spinner with progress
        spinner.text = `Crawled ${this.pages.length} pages, ${this.queue.length} in queue`;
      }
      
      spinner.succeed(`Crawl completed: ${this.pages.length} pages processed`);
      return this.pages;
      
    } catch (error) {
      spinner.fail('Crawl failed');
      throw error;
    } finally {
      if (this.scraper) {
        await this.scraper.close();
      }
    }
  }

  /**
   * Crawl a single page
   */
  async crawlPage(url, depth) {
    if (this.visited.has(url)) {
      return;
    }
    
    this.visited.add(url);
    
    try {
      // Get page content
      const content = await this.scraper.getPageContent(url);
      content.url = url; // Set the actual URL
      
      // Process and store page data
      const pageData = {
        url,
        depth,
        title: content.title,
        content: content.text,
        html: content.html,
        headings: content.headings,
        codeBlocks: content.codeBlocks,
        links: content.links,
        navigation: content.navigation,
        timestamp: new Date().toISOString()
      };
      
      this.pages.push(pageData);
      
      // Extract and queue new links if we haven't reached max depth
      if (depth < (this.options.depth || 2)) {
        try {
          const links = await this.scraper.getPageLinks(url, this.baseUrl);
          
          links.forEach(link => {
            if (!this.visited.has(link) && this.isValidDocumentationUrl(link)) {
              this.queue.push({ url: link, depth: depth + 1 });
            }
          });
        } catch (error) {
          // Continue even if link extraction fails
          if (this.options.verbose) {
            console.error(chalk.yellow(`⚠️  Could not extract links from ${url}`));
          }
        }
      }
      
      if (this.options.verbose) {
        console.log(chalk.green(`✓ Crawled: ${url}`));
      }
      
    } catch (error) {
      if (this.options.verbose) {
        console.error(chalk.red(`✗ Failed to crawl ${url}:`, error.message));
      }
    }
  }

  /**
   * Check if URL is valid for documentation crawling
   */
  isValidDocumentationUrl(url) {
    try {
      const parsedUrl = new URL(url);
      const path = parsedUrl.pathname.toLowerCase();
      
      // Must be same origin
      if (parsedUrl.origin !== this.baseUrl) {
        return false;
      }
      
      // Check exclude patterns
      const excludePatterns = this.options.excludePatterns || [
        '/changelog', '/blog', '/news', '404', 'search', 'login', 'signup'
      ];
      
      for (const pattern of excludePatterns) {
        if (path.includes(pattern)) {
          return false;
        }
      }
      
      // Check include patterns (if any)
      const includePatterns = this.options.includePatterns || [];
      if (includePatterns.length > 0) {
        const matches = includePatterns.some(pattern => 
          path.includes(pattern)
        );
        if (!matches) {
          return false;
        }
      }
      
      return true;
      
    } catch (error) {
      return false;
    }
  }

  /**
   * Get crawling statistics
   */
  getStats() {
    const totalPages = this.pages.length;
    const totalLinks = this.pages.reduce((sum, page) => sum + (page.links?.length || 0), 0);
    const totalCodeBlocks = this.pages.reduce((sum, page) => sum + (page.codeBlocks?.length || 0), 0);
    
    return {
      totalPages,
      totalLinks,
      totalCodeBlocks,
      avgLinksPerPage: totalPages > 0 ? Math.round(totalLinks / totalPages) : 0,
      avgCodeBlocksPerPage: totalPages > 0 ? Math.round(totalCodeBlocks / totalPages) : 0
    };
  }
}