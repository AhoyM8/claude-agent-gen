export const DEFAULT_CONFIG = {
  maxPages: 50,
  timeout: 30000,
  retries: 3,
  concurrency: 3,
  userAgent: 'ClaudeAgentGen/1.0 (+https://github.com/anthropics/claude-agent-gen)',
  
  // Content extraction settings
  selectors: {
    navigation: 'nav, .nav, .navigation, .sidebar, .menu',
    content: 'main, .content, article, .documentation',
    codeBlocks: 'pre code, .code-block, .highlight',
    headings: 'h1, h2, h3, h4, h5, h6',
    links: 'a[href]',
    examples: '.example, .demo, .code-example'
  },
  
  // Content filtering
  excludePatterns: [
    '/changelog',
    '/blog',
    '/news',
    '404',
    'search',
    'login',
    'signup'
  ],
  
  includePatterns: [
    '/docs',
    '/documentation',
    '/api',
    '/guide',
    '/tutorial',
    '/reference'
  ]
};

export function validateConfig(options) {
  const errors = [];
  
  if (!options.url) {
    errors.push('URL is required');
  }
  
  try {
    new URL(options.url);
  } catch {
    errors.push('Invalid URL format');
  }
  
  if (options.depth && (isNaN(options.depth) || options.depth < 1)) {
    errors.push('Depth must be a positive number');
  }
  
  return errors;
}