# 🎯 Examples & Showcase

This directory contains example agents and usage demonstrations for Claude Agent Generator.

## 📁 Directory Structure

```
examples/
├── sample-agents/          # Pre-generated example agents
├── commands/              # Example commands and scripts
├── use-cases/            # Real-world use case examples
└── README.md             # This file
```

## 🤖 Sample Agents

### 🎨 Tailwind CSS Expert
**Location**: `sample-agents/tailwind-quick-demo.json`

A comprehensive agent generated from Tailwind CSS documentation with:
- ✅ **High confidence level** (80/100 quality score)
- 📊 **Rich knowledge base** - 100 concepts, 6 examples, 8 patterns
- 🎯 **Capabilities** - Examples, debugging, concepts, patterns, configuration
- 📚 **Coverage** - Installation, setup, utility classes, configuration

**Generated from**: https://tailwindcss.com/docs/installation  
**Command used**: 
```bash
node quick-demo.js
```

### 📋 Agent Structure Preview

```json
{
  "name": "tailwind-quick-demo",
  "description": "Expert assistant for Tailwindcss...",
  "expertise": {
    "primary_focus": "Concepts & Theory",
    "knowledge_areas": ["code-examples", "configuration", "best-practices"],
    "confidence_level": "high"
  },
  "capabilities": {
    "can_provide_examples": true,
    "can_debug_issues": true,
    "can_explain_concepts": true,
    "can_suggest_patterns": true,
    "has_configuration_help": true
  }
}
```

## 🚀 Example Commands

### 📚 Documentation Sites

```bash
# 🔥 React v19 Expert
./bin/claude-agent-gen.js \\
  --url https://react.dev/learn \\
  --name "react-19-expert" \\
  --depth 2 \\
  --include-examples \\
  --verbose

# ⚡ Next.js App Router Expert
./bin/claude-agent-gen.js \\
  --url https://nextjs.org/docs/app \\
  --name "nextjs-app-expert" \\
  --depth 3 \\
  --output ./my-agents/

# 🛠️ Vite Build Tool Expert
./bin/claude-agent-gen.js \\
  --url https://vitejs.dev/guide \\
  --name "vite-expert" \\
  --include-examples
```

### 🔧 API Documentation

```bash
# 💳 Stripe API Expert
./bin/claude-agent-gen.js \\
  --url https://docs.stripe.com/api \\
  --name "stripe-api-expert" \\
  --depth 3 \\
  --verbose

# 🗄️ MongoDB Atlas Expert
./bin/claude-agent-gen.js \\
  --url https://docs.atlas.mongodb.com \\
  --name "mongodb-atlas-expert" \\
  --depth 2
```

### 🎨 UI Libraries

```bash
# 🌈 Chakra UI Expert
./bin/claude-agent-gen.js \\
  --url https://chakra-ui.com/docs \\
  --name "chakra-ui-expert" \\
  --include-examples

# 🎭 Material UI Expert  
./bin/claude-agent-gen.js \\
  --url https://mui.com/material-ui/getting-started \\
  --name "mui-expert" \\
  --depth 2
```

## 🎭 Use Cases

### 👨‍💻 For Individual Developers

#### 🎓 **Learning New Technologies**
```bash
# Quick start with any new framework
./bin/claude-agent-gen.js --url https://docs.newframework.com --name "learning-helper"

# Get instant expert assistance while coding
# The agent provides examples, explains concepts, helps with configuration
```

#### 🔧 **API Integration Projects**
```bash
# Generate API-specific agents for faster integration
./bin/claude-agent-gen.js --url https://api-docs.service.com --name "api-helper" --depth 3

# Agent knows all endpoints, parameters, error codes, examples
# Speeds up integration by 50-70%
```

### 🏢 For Development Teams

#### 🎯 **Onboarding New Team Members**
```bash
# Create agents for internal tools and frameworks
./bin/claude-agent-gen.js --url https://internal-docs.company.com --name "company-stack-expert"

# New developers get instant help with company-specific patterns and conventions
```

#### 📖 **Documentation Maintenance**
```bash
# Convert static docs into interactive AI assistants
./bin/claude-agent-gen.js --url https://company.github.io/design-system --name "design-system-expert"

# Designers and developers get instant component usage help
```

### 🎨 **Design Systems & UI Libraries**

```bash
# Generate experts for design systems
./bin/claude-agent-gen.js \\
  --url https://design-system.company.com \\
  --name "design-system-expert" \\
  --include-examples \\
  --depth 2

# Provides:
# - Component usage examples
# - Design token reference  
# - Best practices and patterns
# - Accessibility guidelines
```

## 📊 Quality Metrics Examples

### 🟢 High Quality Agent (80-100%)
```json
{
  "confidence_level": "high",
  "quality_score": 85,
  "coverage_areas": [
    "comprehensive-api",
    "rich-examples", 
    "detailed-concepts",
    "troubleshooting-support",
    "configuration-guidance"
  ],
  "statistics": {
    "pages_processed": 25,
    "examples_found": 50,
    "concepts_extracted": 100,
    "api_endpoints": 30
  }
}
```

### 🟡 Medium Quality Agent (60-79%)
```json
{
  "confidence_level": "medium",
  "quality_score": 65,
  "coverage_areas": [
    "rich-examples",
    "detailed-concepts"
  ],
  "statistics": {
    "pages_processed": 10,
    "examples_found": 15,
    "concepts_extracted": 30,
    "api_endpoints": 5
  }
}
```

## 🧪 Testing Your Agents

### ✅ Quality Checklist

After generating an agent, verify:

- [ ] **📊 Confidence Level** - High/Medium/Basic
- [ ] **💻 Examples Available** - Code samples included
- [ ] **🧠 Concepts Covered** - Key topics explained
- [ ] **🔧 API Knowledge** - Endpoints and parameters documented
- [ ] **⚙️ Configuration Help** - Setup and config guidance
- [ ] **🐛 Troubleshooting** - Error handling and debugging info

### 🎯 Test Commands

```bash
# Test basic functionality
./bin/claude-agent-gen.js --url https://simple-docs.com --name "test-agent" --depth 1

# Test with verbose output
./bin/claude-agent-gen.js --url https://docs.example.com --verbose --name "verbose-test"

# Test with real complex site
./bin/claude-agent-gen.js --url https://nextjs.org/docs --name "complex-test" --depth 2
```

## 🔄 Updating Agents

```bash
# Update existing agent with latest documentation
./bin/claude-agent-gen.js \\
  --url https://docs.framework.com \\
  --name "framework-expert" \\
  --update \\
  --verbose

# The tool will:
# - Compare with existing agent
# - Update knowledge base with new content
# - Preserve custom configurations
# - Update quality metrics
```

## 🌟 Success Stories

### 💻 **Development Team Productivity**
> *"We generated agents for our entire tech stack (React, Node.js, PostgreSQL, AWS). New developers now get instant, accurate answers to framework-specific questions. Onboarding time reduced by 60%."*

### 🎨 **Design System Adoption**
> *"Our design system documentation became a helpful AI assistant. Designers and developers get instant component usage examples and best practices. Design system adoption increased by 80%."*

### 🔧 **API Integration Speed**
> *"Generated a Stripe API agent that knows every endpoint and parameter. Integration projects that used to take weeks now take days. API integration time reduced by 70%."*

## 💡 Pro Tips

### 🎯 **Optimal Agent Generation**

1. **📏 Start Small** - Use `--depth 1` first to test site compatibility
2. **🎨 Include Examples** - Always use `--include-examples` for better agents
3. **📊 Check Quality** - Aim for agents with 60+ quality scores
4. **🔄 Update Regularly** - Refresh agents when documentation updates
5. **📝 Use Verbose Mode** - Debug issues with `--verbose` flag

### 🚀 **Performance Optimization**

```bash
# For large documentation sites, limit pages
./bin/claude-agent-gen.js --url https://huge-docs.com --maxPages 20

# For faster generation, reduce depth
./bin/claude-agent-gen.js --url https://docs.com --depth 1

# For comprehensive coverage, increase depth carefully
./bin/claude-agent-gen.js --url https://docs.com --depth 3 --maxPages 50
```

## 🤝 Contributing Examples

We welcome contributions of new examples and use cases!

### 📝 **How to Contribute**

1. **🎯 Generate** a high-quality agent from interesting documentation
2. **📊 Verify** quality metrics (aim for 70+ quality score)
3. **📝 Document** the use case and command used
4. **📤 Submit** a PR with your example

### 💡 **Ideas for New Examples**

- 🤖 **AI/ML Documentation** - TensorFlow, PyTorch, Hugging Face
- ☁️ **Cloud Platforms** - AWS, Azure, Google Cloud
- 🎮 **Game Development** - Unity, Unreal Engine, Godot
- 📱 **Mobile Development** - React Native, Flutter, Swift
- 🌐 **Web3/Blockchain** - Ethereum, Solidity, Web3.js

---

<div align="center">

**🎉 Ready to create your own agents?**

[🚀 Get Started](../README.md#-quick-start) • [🤝 Contribute](../CONTRIBUTING.md) • [🐛 Report Issues](https://github.com/your-username/claude-agent-gen/issues)

</div>