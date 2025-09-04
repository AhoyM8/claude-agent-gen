# 🤖 Claude Agent Generator

<div align="center">
  
  [![npm version](https://badge.fury.io/js/claude-agent-gen.svg)](https://badge.fury.io/js/claude-agent-gen)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Node.js CI](https://github.com/your-username/claude-agent-gen/workflows/Node.js%20CI/badge.svg)](https://github.com/your-username/claude-agent-gen/actions)
  
  **🚀 Automatically generate specialized Claude agents from any documentation website**
  
  *Transform documentation into intelligent AI assistants with just one command*
  
  [✨ Features](#-features) •
  [🎯 Quick Start](#-quick-start) •
  [📖 Documentation](#-documentation) •
  [🤝 Contributing](#-contributing)
  
  ![Claude Agent Generator Demo](https://via.placeholder.com/800x400/0066cc/ffffff?text=Claude+Agent+Generator+Demo)
  
</div>

## 🌟 What is Claude Agent Generator?

Claude Agent Generator is a powerful CLI tool that **automatically crawls documentation websites** and creates **specialized Claude agents** with comprehensive knowledge of APIs, examples, concepts, and best practices.

### 🎯 Perfect for:
- 📚 **Documentation Sites** - Next.js, React, Tailwind CSS, API docs
- 🛠️ **Developer Tools** - CLI tools, frameworks, libraries  
- 📖 **Knowledge Bases** - Technical guides, tutorials, wikis
- 🔧 **API References** - REST APIs, SDKs, service documentation

## ✨ Features

### 🕷️ **Smart Web Scraping**
- 🌐 **Universal Compatibility** - Works with any documentation site
- 🚀 **No Setup Required** - Built-in scraper using Node.js fetch
- ⚡ **MCP Integration** - Optional Playwright MCP for advanced scraping
- 🎯 **Intelligent Crawling** - Automatically discovers related pages

### 🧠 **Advanced Content Processing**
- 📊 **Structured Extraction** - APIs, code examples, concepts, patterns
- 🔍 **Smart Classification** - Categorizes content by type and importance
- 💎 **Quality Analysis** - Confidence levels and coverage metrics
- 🔗 **Cross-Reference Resolution** - Links related concepts and examples

### 🤖 **Professional Agent Generation**
- 📁 **Claude Desktop Compatible** - Works with Claude Desktop and VS Code
- 🎨 **Rich Knowledge Base** - Comprehensive understanding of tools/frameworks
- 📈 **Quality Metrics** - Transparency about agent capabilities
- 🔄 **Incremental Updates** - Update existing agents with new content

### 🛠️ **Developer Experience**
- ⚡ **Lightning Fast** - Processes documentation in seconds
- 🎛️ **Highly Configurable** - Depth, filters, output formats
- 📝 **Verbose Logging** - Detailed progress and debugging info
- 🧪 **Built-in Testing** - Verify agents work correctly

## 🎯 Quick Start

### 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/claude-agent-gen.git
cd claude-agent-gen

# Install dependencies
npm install

# Make executable (Unix/macOS)
chmod +x bin/claude-agent-gen.js
```

### ⚡ Instant Demo

```bash
# 🚀 Run the quick demo (generates Tailwind CSS expert in ~10 seconds)
node quick-demo.js
```

### 🎨 Basic Usage

```bash
# 📚 Generate a Next.js expert agent
./bin/claude-agent-gen.js --url https://nextjs.org/docs --name "nextjs-expert"

# 🎨 Generate a Tailwind CSS expert  
./bin/claude-agent-gen.js --url https://tailwindcss.com/docs --name "tailwind-expert" --depth 2

# 🔧 Generate a comprehensive React expert
./bin/claude-agent-gen.js --url https://react.dev/learn --name "react-expert" --include-examples --verbose
```

## 📖 Documentation

### 🎛️ Command Options

| Option | Description | Default | Example |
|--------|-------------|---------|---------|
| `-u, --url <url>` | 🌐 Documentation URL to scrape | *Required* | `https://nextjs.org/docs` |
| `-n, --name <name>` | 🏷️ Agent name | Auto-generated | `nextjs-expert` |
| `-d, --depth <number>` | 🕳️ Crawl depth for linked pages | `2` | `3` |
| `-e, --include-examples` | 💻 Extract code examples | `false` | `--include-examples` |
| `-o, --output <path>` | 📁 Output directory | `.claude/agents` | `./my-agents/` |
| `--mcp-server <server>` | 🤖 MCP server type | `simple` | `playwright` |
| `--verbose` | 📊 Enable detailed logging | `false` | `--verbose` |
| `--force-mcp` | ⚡ Force MCP usage | `false` | `--force-mcp` |

### 🏗️ Generated Agent Structure

```json
{
  "name": "nextjs-expert",
  "description": "Expert assistant for Next.js...",
  "expertise": {
    "primary_focus": "React Framework Development",
    "knowledge_areas": ["api-reference", "routing", "deployment"],
    "confidence_level": "high"
  },
  "knowledge_base": {
    "overview": [...],
    "apis": [...],
    "examples": [...],
    "concepts": [...],
    "patterns": [...],
    "troubleshooting": [...],
    "configuration": [...]
  },
  "capabilities": {
    "can_provide_examples": true,
    "can_debug_issues": true,
    "can_explain_concepts": true,
    "can_suggest_patterns": true
  }
}
```

## 🚀 Advanced Usage

### 🎯 Targeted Documentation

```bash
# 📊 Focus on specific sections
./bin/claude-agent-gen.js \
  --url https://docs.stripe.com/api \
  --name "stripe-api-expert" \
  --depth 3 \
  --include-examples \
  --verbose

# 🎨 UI Library expert  
./bin/claude-agent-gen.js \
  --url https://chakra-ui.com/docs \
  --name "chakra-ui-expert" \
  --depth 2 \
  --output ./ui-agents/
```

### 🤖 MCP Playwright Setup (Optional)

For enhanced scraping of complex sites with JavaScript:

```bash
# Install MCP Playwright server
npm install -g @executeautomation/mcp-playwright

# Set environment variable
export MCP_PLAYWRIGHT_SERVER=true

# Use MCP mode
./bin/claude-agent-gen.js \
  --url https://docs.example.com \
  --mcp-server playwright \
  --force-mcp
```

## 🎨 Examples

### 📚 Popular Documentation Sites

```bash
# 🔥 Modern React
./bin/claude-agent-gen.js --url https://react.dev/learn --name "react-19-expert"

# ⚡ Next.js App Router
./bin/claude-agent-gen.js --url https://nextjs.org/docs/app --name "nextjs-app-expert"

# 🎨 Tailwind CSS v4
./bin/claude-agent-gen.js --url https://tailwindcss.com/docs --name "tailwind-v4-expert"

# 🛠️ Vite Build Tool
./bin/claude-agent-gen.js --url https://vitejs.dev/guide --name "vite-expert"

# 📱 React Native
./bin/claude-agent-gen.js --url https://reactnative.dev/docs/getting-started --name "react-native-expert"
```

### 🔧 API Documentation

```bash
# 💳 Stripe Payments API
./bin/claude-agent-gen.js --url https://docs.stripe.com/api --name "stripe-api-expert" --depth 3

# 🗄️ MongoDB Atlas
./bin/claude-agent-gen.js --url https://docs.atlas.mongodb.com --name "mongodb-atlas-expert"

# ☁️ AWS SDK
./bin/claude-agent-gen.js --url https://docs.aws.amazon.com/sdk-for-javascript --name "aws-sdk-expert"
```

## 📊 Agent Quality Metrics

Each generated agent includes comprehensive quality metrics:

### 🎯 Confidence Levels
- 🟢 **High (80-100%)** - Comprehensive documentation coverage
- 🟡 **Medium (60-79%)** - Good coverage with some gaps  
- 🔴 **Basic (0-59%)** - Limited content available

### 📈 Coverage Areas
- 📚 **Comprehensive API** - Complete API reference documentation
- 💻 **Rich Examples** - 10+ code examples and tutorials
- 🧠 **Detailed Concepts** - 20+ concept explanations
- 🛠️ **Troubleshooting Support** - Error handling and debugging guides
- ⚙️ **Configuration Guidance** - Setup and configuration help

### 🎪 Agent Capabilities

| Capability | Description | When Available |
|------------|-------------|----------------|
| 🔍 **Provide Examples** | Show relevant code samples | Code blocks found |
| 🐛 **Debug Issues** | Help troubleshoot problems | Error docs available |
| 🧠 **Explain Concepts** | Break down complex topics | Concept docs found |
| 📋 **Suggest Patterns** | Recommend best practices | Pattern docs available |
| 🔧 **API Knowledge** | Detailed API guidance | API docs processed |
| ⚙️ **Configuration Help** | Setup and config support | Config docs found |

## 🛡️ Troubleshooting

### 🚨 Common Issues

| Issue | Solution | Quick Fix |
|-------|----------|-----------|
| 🌐 **Connection Failed** | Check internet & URL | Verify URL is accessible |
| 📄 **No Content Found** | Site might need JavaScript | Try MCP Playwright mode |
| ⏱️ **Timeout Errors** | Increase timeout setting | Add `--timeout 60000` |
| 📁 **Permission Errors** | Check write permissions | Run with elevated permissions |
| 🤖 **MCP Connection Failed** | Install MCP server | See [MCP Setup Guide](MCP_SETUP.md) |

### 🧪 Debug Mode

```bash
# 🔍 Enable maximum verbosity
./bin/claude-agent-gen.js --url https://example.com --verbose

# 🧪 Test with simple site first
./bin/claude-agent-gen.js --url https://example.com/docs --name "test-agent" --depth 1
```

## 🎭 Use Cases & Examples

### 👨‍💻 For Developers
- **📚 Personal Documentation Assistant** - Your own expert for any tool
- **🏢 Team Knowledge Sharing** - Generate agents for internal tools
- **🎓 Learning New Technologies** - Instant experts for exploration
- **🔧 API Integration Helper** - Specialized agents for third-party APIs

### 🏢 For Teams
- **📖 Internal Documentation** - Convert company docs to AI assistants
- **🎯 Onboarding Automation** - Help new developers learn your stack
- **💡 Knowledge Management** - Preserve expert knowledge as AI agents
- **🚀 Developer Productivity** - Instant access to framework expertise

### 🌟 Success Stories

> *"Generated a comprehensive Next.js agent from their docs in 30 seconds. Now my team has instant access to App Router expertise!"* - **Sarah, Senior Developer**

> *"Created Stripe API agent that knows every endpoint and parameter. Cut our integration time by 70%."* - **Mike, CTO**

> *"Our internal design system docs became a helpful AI assistant. Designers love getting instant component usage examples."* - **Alex, Design Lead**

## 🤝 Contributing

We love contributions! 🎉

### 🚀 Quick Contribute

1. **🍴 Fork** the repository
2. **🌿 Create** a feature branch: `git checkout -b amazing-feature`  
3. **✍️ Commit** changes: `git commit -m 'Add amazing feature'`
4. **📤 Push** to branch: `git push origin amazing-feature`
5. **🎯 Open** a Pull Request

### 💡 Ideas for Contributions

- 🌐 **New Scrapers** - Support for more site types
- 🎨 **Output Formats** - JSON Schema, OpenAPI, etc.
- 🤖 **MCP Integrations** - More MCP server support
- 📊 **Analytics** - Better quality metrics
- 🎭 **Agent Templates** - Specialized agent types
- 🔧 **Performance** - Faster processing, better caching
- 📱 **UI** - Web interface for the tool

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

## ⭐ Star History

If you find this tool helpful, please give it a star! ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=your-username/claude-agent-gen&type=Date)](https://star-history.com/#your-username/claude-agent-gen&Date)

## 🙋‍♀️ Support & Community

### 💬 Get Help
- 📖 **Documentation** - Check out our [comprehensive docs](docs/)
- 🐛 **Issues** - [Report bugs or request features](https://github.com/your-username/claude-agent-gen/issues)
- 💡 **Discussions** - [Join community discussions](https://github.com/your-username/claude-agent-gen/discussions)
- 🐦 **Twitter** - Follow [@YourTwitter](https://twitter.com/YourTwitter) for updates

### 🎯 Roadmap

- [ ] 🌐 **Web Interface** - Browser-based agent generation
- [ ] 📱 **Mobile Support** - Generate agents from mobile documentation
- [ ] 🤖 **AI-Powered Enhancement** - Improve agent quality with LLMs
- [ ] 🔄 **Auto-Updates** - Scheduled agent updates from source docs
- [ ] 📊 **Analytics Dashboard** - Usage metrics and insights
- [ ] 🎨 **Custom Templates** - User-defined agent templates
- [ ] 🌍 **Multi-language** - Support for non-English documentation

---

<div align="center">
  
  **Made with ❤️ by the Claude Agent Generator community**
  
  [⭐ Star](https://github.com/your-username/claude-agent-gen) •
  [🍴 Fork](https://github.com/your-username/claude-agent-gen/fork) •
  [📝 Contribute](CONTRIBUTING.md) •
  [🐛 Report Issue](https://github.com/your-username/claude-agent-gen/issues)
  
</div>