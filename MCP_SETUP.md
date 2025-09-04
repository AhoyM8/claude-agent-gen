# MCP Playwright Server Setup Guide

This guide shows how to set up the MCP Playwright server for enhanced web scraping capabilities with claude-agent-gen.

## What is MCP?

Model Context Protocol (MCP) is an open standard that enables AI models to connect to external tools and data sources. The MCP Playwright server provides browser automation capabilities for more robust web scraping.

## Benefits of MCP vs Simple Scraper

| Feature | Simple Scraper | MCP Playwright |
|---------|---------------|----------------|
| **Setup** | ✅ No setup required | ⚙️ Requires MCP server |
| **JavaScript** | ❌ Static HTML only | ✅ Full JavaScript execution |
| **Screenshots** | ❌ Not supported | ✅ Visual documentation |
| **Complex Sites** | ⚠️ May miss content | ✅ Handles SPAs, dynamic content |
| **Rate Limiting** | ⚠️ Basic | ✅ Advanced browser controls |
| **Reliability** | ⚠️ May fail on modern sites | ✅ High reliability |

## Quick Start (Simple Scraper)

The tool works out-of-the-box without MCP:

```bash
# This works immediately - no setup needed
./bin/claude-agent-gen.js --url https://nextjs.org/docs --name "nextjs-expert"
```

## Setting Up MCP Playwright (Optional)

### Prerequisites

1. **Node.js 20+** installed
2. **Claude Desktop** or **VS Code with Claude extension**
3. Internet connection

### Step 1: Install MCP Playwright Server

```bash
# Install globally
npm install -g @executeautomation/mcp-playwright

# Or install locally in your project
npm install @executeautomation/mcp-playwright
```

### Step 2: Configure MCP Server

#### Option A: Claude Desktop

Add to your Claude Desktop MCP settings (`~/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "playwright": {
      "command": "node",
      "args": ["path/to/mcp-playwright/server.js"],
      "env": {
        "PLAYWRIGHT_HEADLESS": "true"
      }
    }
  }
}
```

#### Option B: Environment Variable

Set the environment variable:

```bash
# Windows
set MCP_PLAYWRIGHT_SERVER=true

# macOS/Linux
export MCP_PLAYWRIGHT_SERVER=true

# Add to your shell profile for persistence
echo 'export MCP_PLAYWRIGHT_SERVER=true' >> ~/.bashrc
```

### Step 3: Verify Installation

Test the MCP connection:

```bash
# This should work without errors if MCP is set up
./bin/claude-agent-gen.js --url https://example.com --force-mcp --verbose
```

### Step 4: Use MCP Mode

```bash
# Use MCP Playwright server
./bin/claude-agent-gen.js \\
  --url https://nextjs.org/docs \\
  --name "nextjs-expert" \\
  --mcp-server playwright \\
  --force-mcp \\
  --verbose
```

## Alternative MCP Servers

### Puppeteer MCP

```bash
npm install -g @modelcontextprotocol/server-puppeteer
```

Use with:
```bash
./bin/claude-agent-gen.js --url https://docs.example.com --mcp-server puppeteer
```

### Browser MCP (UI-TARS)

```bash
npm install -g @ui-tars/browser-mcp
```

## Troubleshooting

### MCP Server Not Found

```bash
❌ Error: MCP Playwright server not found
```

**Solutions:**
1. Install MCP server: `npm install -g @executeautomation/mcp-playwright`
2. Set environment variable: `export MCP_PLAYWRIGHT_SERVER=true`
3. Use simple mode: `--mcp-server simple` (default)

### Permission Errors

```bash
❌ Error: EACCES: permission denied
```

**Solutions:**
1. Run with elevated permissions
2. Install in user directory: `npm install --global --prefix ~/.npm-global`
3. Use npx: `npx @executeautomation/mcp-playwright`

### Browser Installation Issues

```bash
❌ Error: Browser executable not found
```

**Solutions:**
1. Install browsers: `npx playwright install`
2. Set browser path in environment variables
3. Use system browser: `PLAYWRIGHT_BROWSER_PATH=/path/to/browser`

### Timeout Errors

```bash
❌ Error: Navigation timeout
```

**Solutions:**
1. Increase timeout: `--timeout 60000`
2. Check internet connection
3. Try with simpler sites first

## Performance Comparison

### Simple Scraper Performance
- ⚡ **Speed**: Very fast (direct HTTP)
- 📊 **Success Rate**: ~70% (static sites)
- 💾 **Memory**: Low (~50MB)
- 🔧 **Setup**: None required

### MCP Playwright Performance
- ⚡ **Speed**: Moderate (browser overhead)
- 📊 **Success Rate**: ~95% (all sites)
- 💾 **Memory**: High (~200MB)
- 🔧 **Setup**: Requires MCP server

## When to Use Each Mode

### Use Simple Scraper When:
- ✅ Documentation is static HTML
- ✅ Quick setup needed
- ✅ Low resource usage required
- ✅ Site doesn't require JavaScript

### Use MCP Playwright When:
- ✅ Site uses React/Vue/Angular
- ✅ Content loads dynamically
- ✅ JavaScript is required for navigation
- ✅ Maximum compatibility needed
- ✅ Visual screenshots wanted

## Configuration Examples

### Basic Usage (Simple Scraper)
```bash
claude-agent-gen --url https://docs.tailwindcss.com
```

### Advanced Usage (MCP Playwright)
```bash
claude-agent-gen \\
  --url https://nextjs.org/docs \\
  --name "nextjs-expert" \\
  --depth 3 \\
  --include-examples \\
  --mcp-server playwright \\
  --force-mcp \\
  --verbose
```

### Batch Processing
```bash
# Generate multiple agents
for url in "https://react.dev/learn" "https://tailwindcss.com/docs" "https://nextjs.org/docs"; do
  claude-agent-gen --url "$url" --mcp-server simple --verbose
done
```

## Getting Help

### Check Tool Status
```bash
claude-agent-gen --help
node --version
npm list -g @executeautomation/mcp-playwright
```

### Debug Mode
```bash
# Enable maximum verbosity
claude-agent-gen --url https://example.com --verbose --force-mcp
```

### Common Issues & Solutions

1. **"No content found"**: Site might require JavaScript → Use MCP mode
2. **"MCP connection failed"**: Install MCP server or use simple mode
3. **"Too many requests"**: Reduce depth or add delays
4. **"Invalid JSON"**: Generated files may be corrupted → Check disk space

## Next Steps

Once set up, you can:
1. Generate agents from complex documentation sites
2. Extract dynamic content that requires JavaScript
3. Take screenshots for visual documentation
4. Handle authentication if needed
5. Process single-page applications (SPAs)

## Support

- **GitHub Issues**: [claude-agent-gen/issues](https://github.com/your-repo/claude-agent-gen/issues)
- **MCP Documentation**: [modelcontextprotocol.io](https://modelcontextprotocol.io)
- **Playwright Docs**: [playwright.dev](https://playwright.dev)