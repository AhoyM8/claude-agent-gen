import { marked } from 'marked';
import TurndownService from 'turndown';
import * as cheerio from 'cheerio';

/**
 * Content extraction and processing pipeline
 */
export class ContentExtractor {
  constructor(options = {}) {
    this.options = options;
    this.turndown = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced'
    });
  }

  /**
   * Process crawled pages and extract structured knowledge
   */
  async processPages(pages) {
    const knowledge = {
      overview: this.extractOverview(pages),
      apis: this.extractAPIs(pages),
      examples: this.extractExamples(pages),
      concepts: this.extractConcepts(pages),
      patterns: this.extractPatterns(pages),
      troubleshooting: this.extractTroubleshooting(pages),
      configuration: this.extractConfiguration(pages)
    };

    return knowledge;
  }

  /**
   * Extract overview and getting started information
   */
  extractOverview(pages) {
    const overviewPages = pages.filter(page => 
      this.isOverviewPage(page.url) || 
      page.title.toLowerCase().includes('getting started') ||
      page.title.toLowerCase().includes('introduction')
    );

    return overviewPages.map(page => ({
      title: page.title,
      url: page.url,
      content: this.cleanContent(page.content),
      headings: page.headings,
      keyPoints: this.extractKeyPoints(page.content)
    }));
  }

  /**
   * Extract API documentation
   */
  extractAPIs(pages) {
    const apiPages = pages.filter(page => 
      page.url.includes('/api') || 
      page.title.toLowerCase().includes('api') ||
      page.title.toLowerCase().includes('reference')
    );

    return apiPages.map(page => ({
      title: page.title,
      url: page.url,
      methods: this.extractMethods(page.html),
      parameters: this.extractParameters(page.html),
      examples: this.extractCodeExamples(page.codeBlocks),
      endpoints: this.extractEndpoints(page.content)
    }));
  }

  /**
   * Extract code examples
   */
  extractExamples(pages) {
    const examples = [];
    
    pages.forEach(page => {
      if (page.codeBlocks && page.codeBlocks.length > 0) {
        page.codeBlocks.forEach(block => {
          examples.push({
            title: this.generateExampleTitle(page.title, block),
            language: block.language,
            code: block.code,
            description: this.findExampleDescription(page.html, block),
            source: page.url,
            category: this.categorizeExample(page.url, block)
          });
        });
      }
    });

    return examples;
  }

  /**
   * Extract key concepts and explanations
   */
  extractConcepts(pages) {
    const concepts = [];
    
    pages.forEach(page => {
      page.headings?.forEach(heading => {
        if (heading.level <= 3) { // Focus on main concepts
          concepts.push({
            title: heading.text,
            level: heading.level,
            content: this.extractSectionContent(page.html, heading.id),
            url: `${page.url}#${heading.id}`,
            tags: this.extractTags(heading.text, page.content)
          });
        }
      });
    });

    return concepts;
  }

  /**
   * Extract common patterns and best practices
   */
  extractPatterns(pages) {
    const patterns = [];
    
    pages.forEach(page => {
      const patternIndicators = [
        'best practice',
        'pattern',
        'convention',
        'recommended',
        'should',
        'avoid',
        'prefer'
      ];

      const content = page.content.toLowerCase();
      patternIndicators.forEach(indicator => {
        if (content.includes(indicator)) {
          patterns.push({
            type: indicator,
            description: this.extractPatternDescription(page.content, indicator),
            source: page.url,
            examples: this.extractCodeExamples(page.codeBlocks)
          });
        }
      });
    });

    return patterns;
  }

  /**
   * Extract troubleshooting information
   */
  extractTroubleshooting(pages) {
    const troubleshooting = pages.filter(page =>
      page.title.toLowerCase().includes('troubleshooting') ||
      page.title.toLowerCase().includes('common issues') ||
      page.title.toLowerCase().includes('faq') ||
      page.content.toLowerCase().includes('error') ||
      page.content.toLowerCase().includes('problem')
    );

    return troubleshooting.map(page => ({
      title: page.title,
      url: page.url,
      issues: this.extractIssues(page.content),
      solutions: this.extractSolutions(page.content),
      errorCodes: this.extractErrorCodes(page.content)
    }));
  }

  /**
   * Extract configuration information
   */
  extractConfiguration(pages) {
    const configPages = pages.filter(page =>
      page.title.toLowerCase().includes('config') ||
      page.title.toLowerCase().includes('setup') ||
      page.title.toLowerCase().includes('installation')
    );

    return configPages.map(page => ({
      title: page.title,
      url: page.url,
      options: this.extractConfigOptions(page.content),
      examples: this.extractCodeExamples(page.codeBlocks),
      prerequisites: this.extractPrerequisites(page.content)
    }));
  }

  // Helper methods for content extraction

  isOverviewPage(url) {
    const overviewPatterns = [
      '/introduction',
      '/getting-started',
      '/overview',
      '/guide',
      '/docs/',
      '/docs/index'
    ];
    return overviewPatterns.some(pattern => url.includes(pattern));
  }

  cleanContent(content) {
    return content
      .replace(/\n+/g, '\n')
      .replace(/\s+/g, ' ')
      .trim();
  }

  extractKeyPoints(content) {
    const sentences = content.split(/[.!?]+/);
    return sentences
      .filter(sentence => 
        sentence.length > 20 && 
        (sentence.includes('important') || 
         sentence.includes('note') || 
         sentence.includes('remember'))
      )
      .map(sentence => sentence.trim())
      .slice(0, 5);
  }

  extractMethods(html) {
    const $ = cheerio.load(html);
    const methods = [];
    
    $('code, .method, .function').each((i, el) => {
      const text = $(el).text();
      if (text.includes('(') && text.includes(')')) {
        methods.push({
          name: text.split('(')[0].trim(),
          signature: text,
          description: $(el).parent().text()
        });
      }
    });
    
    return methods;
  }

  extractParameters(html) {
    const $ = cheerio.load(html);
    const parameters = [];
    
    $('table tr, .param, .parameter').each((i, el) => {
      const text = $(el).text();
      if (text.includes(':') || text.includes('=')) {
        parameters.push({
          name: text.split(/[:=]/)[0].trim(),
          description: text.split(/[:=]/)[1]?.trim(),
          required: text.includes('required') || text.includes('*')
        });
      }
    });
    
    return parameters;
  }

  extractCodeExamples(codeBlocks) {
    if (!codeBlocks) return [];
    
    return codeBlocks.map(block => ({
      language: block.language || 'text',
      code: block.code,
      runnable: this.isRunnableCode(block.code, block.language)
    }));
  }

  extractEndpoints(content) {
    const endpointRegex = /(GET|POST|PUT|DELETE|PATCH)\s+(\/[\w\/-]+)/gi;
    const matches = content.match(endpointRegex) || [];
    
    return matches.map(match => {
      const [method, path] = match.split(/\s+/);
      return { method: method.toUpperCase(), path };
    });
  }

  generateExampleTitle(pageTitle, codeBlock) {
    if (codeBlock.language) {
      return `${pageTitle} - ${codeBlock.language} Example`;
    }
    return `${pageTitle} - Code Example`;
  }

  findExampleDescription(html, codeBlock) {
    // Try to find text immediately before or after the code block
    const $ = cheerio.load(html);
    let description = '';
    
    $('pre code').each((i, el) => {
      if ($(el).text().includes(codeBlock.code.substring(0, 50))) {
        const prev = $(el).parent().prev();
        const next = $(el).parent().next();
        description = prev.text() || next.text() || '';
      }
    });
    
    return description.substring(0, 200);
  }

  categorizeExample(url, codeBlock) {
    if (url.includes('api')) return 'api';
    if (url.includes('tutorial')) return 'tutorial';
    if (url.includes('guide')) return 'guide';
    if (codeBlock.language === 'javascript' || codeBlock.language === 'js') return 'javascript';
    if (codeBlock.language === 'python') return 'python';
    return 'general';
  }

  extractSectionContent(html, headingId) {
    const $ = cheerio.load(html);
    let content = '';
    
    if (headingId) {
      const heading = $(`#${headingId}`);
      if (heading.length) {
        let current = heading.next();
        while (current.length && !current.is('h1, h2, h3, h4, h5, h6')) {
          content += current.text() + ' ';
          current = current.next();
        }
      }
    }
    
    return content.trim().substring(0, 500);
  }

  extractTags(title, content) {
    const commonTags = ['api', 'config', 'setup', 'tutorial', 'guide', 'reference'];
    const foundTags = [];
    
    commonTags.forEach(tag => {
      if (title.toLowerCase().includes(tag) || content.toLowerCase().includes(tag)) {
        foundTags.push(tag);
      }
    });
    
    return foundTags;
  }

  extractPatternDescription(content, indicator) {
    const sentences = content.split(/[.!?]+/);
    const relevantSentences = sentences.filter(sentence => 
      sentence.toLowerCase().includes(indicator)
    );
    
    return relevantSentences.slice(0, 2).join('. ').trim();
  }

  extractIssues(content) {
    const issuePatterns = [
      /error[:\s]+([^\n]+)/gi,
      /problem[:\s]+([^\n]+)/gi,
      /issue[:\s]+([^\n]+)/gi
    ];
    
    const issues = [];
    issuePatterns.forEach(pattern => {
      const matches = content.match(pattern) || [];
      issues.push(...matches.slice(0, 3));
    });
    
    return issues;
  }

  extractSolutions(content) {
    const solutionPatterns = [
      /solution[:\s]+([^\n]+)/gi,
      /fix[:\s]+([^\n]+)/gi,
      /resolve[:\s]+([^\n]+)/gi
    ];
    
    const solutions = [];
    solutionPatterns.forEach(pattern => {
      const matches = content.match(pattern) || [];
      solutions.push(...matches.slice(0, 3));
    });
    
    return solutions;
  }

  extractErrorCodes(content) {
    const errorCodePattern = /error\s+(\d{3,4}|[A-Z_]+\d+)/gi;
    return content.match(errorCodePattern) || [];
  }

  extractConfigOptions(content) {
    const configPatterns = [
      /([\w_]+)\s*[=:]\s*([^\n]+)/g,
      /--([\w-]+)\s+([^\n]+)/g
    ];
    
    const options = [];
    configPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null && options.length < 10) {
        options.push({
          name: match[1],
          value: match[2].trim(),
          description: ''
        });
      }
    });
    
    return options;
  }

  extractPrerequisites(content) {
    const prereqPatterns = [
      /prerequisite[s]?[:\s]+([^\n]+)/gi,
      /requirement[s]?[:\s]+([^\n]+)/gi,
      /before\s+you\s+begin[:\s]+([^\n]+)/gi
    ];
    
    const prerequisites = [];
    prereqPatterns.forEach(pattern => {
      const matches = content.match(pattern) || [];
      prerequisites.push(...matches.slice(0, 3));
    });
    
    return prerequisites;
  }

  isRunnableCode(code, language) {
    if (!language) return false;
    
    const runnableLanguages = ['javascript', 'js', 'python', 'bash', 'sh'];
    return runnableLanguages.includes(language.toLowerCase()) && 
           code.length > 10 && 
           !code.includes('...');
  }
}