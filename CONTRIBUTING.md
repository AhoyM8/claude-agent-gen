# 🤝 Contributing to Claude Agent Generator

We're thrilled that you want to contribute to Claude Agent Generator! 🎉

This document provides guidelines and information about contributing to make the process as smooth as possible for everyone.

## 📋 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [📝 Code of Conduct](#-code-of-conduct)  
- [🎯 How to Contribute](#-how-to-contribute)
- [🐛 Reporting Bugs](#-reporting-bugs)
- [💡 Suggesting Features](#-suggesting-features)
- [🔧 Development Setup](#-development-setup)
- [📖 Code Style](#-code-style)
- [🧪 Testing](#-testing)
- [📝 Documentation](#-documentation)
- [🎭 Types of Contributions](#-types-of-contributions)

## 🚀 Quick Start

1. **🍴 Fork** the repository
2. **📥 Clone** your fork: `git clone https://github.com/YOUR-USERNAME/claude-agent-gen.git`
3. **📦 Install** dependencies: `npm install`
4. **🌿 Create** a branch: `git checkout -b feature/amazing-new-feature`
5. **✍️ Make** your changes
6. **🧪 Test** your changes: `npm test`
7. **📝 Commit**: `git commit -m "feat: add amazing new feature"`
8. **📤 Push**: `git push origin feature/amazing-new-feature`
9. **🎯 Create** a Pull Request

## 📝 Code of Conduct

This project adheres to a Code of Conduct. By participating, you agree to uphold this code.

### 🌟 Our Standards

- 💖 **Be Respectful** - Treat everyone with respect and kindness
- 🤝 **Be Inclusive** - Welcome people of all backgrounds and experience levels
- 🎯 **Be Constructive** - Focus on helping and improving the project
- 📚 **Be Patient** - Help others learn and grow
- 🙌 **Be Collaborative** - Work together towards common goals

## 🎯 How to Contribute

### 🐛 Found a Bug?

1. **🔍 Check** if the bug was already reported in [Issues](https://github.com/your-username/claude-agent-gen/issues)
2. **📝 Create** a new issue if it doesn't exist using the Bug Report template
3. **🏷️ Label** the issue appropriately
4. **🔧 Fix** the bug and submit a Pull Request

### 💡 Have a Feature Idea?

1. **🔍 Check** if the feature was already suggested in [Issues](https://github.com/your-username/claude-agent-gen/issues)
2. **💬 Discuss** in [Discussions](https://github.com/your-username/claude-agent-gen/discussions) first for big changes
3. **📝 Create** a Feature Request issue using the template
4. **⚡ Implement** the feature and submit a Pull Request

### 📖 Improving Documentation?

1. **📚 Identify** areas that need better documentation
2. **📝 Make** improvements to existing docs or create new ones
3. **🎨 Add** examples, emojis, and clear explanations
4. **📤 Submit** a Pull Request with your improvements

## 🐛 Reporting Bugs

When reporting bugs, please include:

### 🔍 Bug Report Template

```markdown
## 🐛 Bug Description
A clear and concise description of the bug.

## 🔄 Steps to Reproduce
1. Run command: `./bin/claude-agent-gen.js --url ...`
2. See error message: `...`
3. Expected behavior: `...`

## 💻 Environment
- OS: [e.g., macOS 14.0, Windows 11, Ubuntu 20.04]
- Node.js: [e.g., 18.17.0]
- Tool Version: [e.g., 1.0.0]
- MCP Server: [e.g., simple, playwright]

## 📋 Additional Context
- Error logs or screenshots
- Configuration files
- Any other relevant information
```

## 💡 Suggesting Features

When suggesting features, please include:

### ✨ Feature Request Template

```markdown
## 💡 Feature Description
A clear description of the feature you'd like to see.

## 🎯 Problem Statement
What problem does this feature solve?

## 🎨 Proposed Solution
How should this feature work?

## 🔄 Alternative Solutions
Are there alternative approaches?

## 📊 Additional Context
- Use cases and examples
- Mockups or diagrams
- Similar features in other tools
```

## 🔧 Development Setup

### 📦 Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **Code Editor** - VS Code recommended

### 🚀 Setup Steps

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR-USERNAME/claude-agent-gen.git
cd claude-agent-gen

# 2. Install dependencies
npm install

# 3. Make the CLI executable (Unix/macOS)
chmod +x bin/claude-agent-gen.js

# 4. Run the test suite
npm test

# 5. Try the demo
node quick-demo.js
```

### 🎯 Development Commands

```bash
# 🧪 Run tests
npm test

# 🚀 Quick demo
npm run demo

# 🔍 Lint code
npm run lint

# 🧹 Format code  
npm run format

# 📊 Check types (if using TypeScript)
npm run type-check
```

## 📖 Code Style

### 🎨 General Guidelines

- **✨ Use ES modules** (`import`/`export`)
- **📱 Use modern JavaScript** (ES2020+)
- **🎯 Keep functions focused** and single-purpose
- **📝 Add meaningful comments** for complex logic
- **🚨 Handle errors gracefully** with user-friendly messages
- **📊 Use descriptive variable names**

### 🎭 Code Examples

#### ✅ Good

```javascript
// ✅ Clear, descriptive, and well-structured
async function extractDocumentationContent(url, options = {}) {
  try {
    const response = await fetch(url, {
      timeout: options.timeout || 30000,
      headers: { 'User-Agent': options.userAgent }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.text();
  } catch (error) {
    throw new Error(`Failed to fetch ${url}: ${error.message}`);
  }
}
```

#### ❌ Avoid

```javascript
// ❌ Unclear, no error handling, poor naming
function getData(u) {
  return fetch(u).then(r => r.text());
}
```

### 🎨 Formatting

- **🔤 Use 2 spaces** for indentation
- **📏 Max line length**: 100 characters
- **🔤 Use single quotes** for strings
- **📝 Add trailing commas** in objects/arrays
- **🚫 No semicolons** (we use ASI)

## 🧪 Testing

### 📋 Testing Guidelines

- **🧪 Write tests** for new features
- **🔧 Update tests** when modifying existing code
- **✅ Ensure all tests pass** before submitting PR
- **📊 Aim for good coverage** of critical paths

### 🎯 Test Structure

```bash
test/
├── unit/           # Unit tests
├── integration/    # Integration tests  
├── fixtures/       # Test data
└── helpers/        # Test utilities
```

### 🚀 Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- test/unit/scraper.test.js

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📝 Documentation

### 📚 Documentation Standards

- **🎯 Be Clear and Concise** - Easy to understand
- **💻 Include Examples** - Show real usage
- **🎨 Use Emojis** - Make it engaging and scannable
- **🔗 Link Related Sections** - Help navigation
- **📊 Keep Updated** - Sync with code changes

### 📖 Documentation Types

1. **📋 README** - Project overview and quick start
2. **📖 API Docs** - Function and class documentation
3. **🎯 Tutorials** - Step-by-step guides
4. **🔧 Setup Guides** - Installation and configuration
5. **❓ FAQ** - Common questions and issues

## 🎭 Types of Contributions

### 🌟 We Welcome

#### 🐛 **Bug Fixes**
- Fix existing issues
- Improve error handling
- Performance improvements

#### ✨ **New Features**
- Web scraping enhancements
- Output format options
- Agent template types
- MCP server integrations

#### 📚 **Documentation**
- Improve existing docs
- Add new tutorials
- Create video guides
- Translate documentation

#### 🎨 **User Experience**
- Better error messages  
- Improved CLI interface
- Progress indicators
- Visual feedback

#### 🔧 **Developer Experience**
- Better tooling
- Improved tests
- Code quality tools
- Development automation

#### 🚀 **Performance**
- Faster web scraping
- Optimized processing
- Memory improvements
- Caching strategies

### 💡 Ideas for First-Time Contributors

- 🐛 **Fix typos** in documentation
- 📝 **Add examples** to existing features
- 🎨 **Improve error messages** 
- 🧪 **Write tests** for untested code
- 📚 **Create tutorials** for common use cases
- 🎯 **Add support** for new documentation sites

## 🎉 Recognition

Contributors are recognized in several ways:

### 🌟 Contributors Wall
- **📋 README Credits** - Listed in project README
- **📊 GitHub Contributors** - Automatic GitHub recognition
- **🏆 Special Mentions** - Featured in release notes

### 🎁 Contribution Rewards
- **🎯 Maintainer Badge** - For regular contributors
- **🌟 Expert Badge** - For domain expertise
- **📚 Documentation Hero** - For doc contributions
- **🧪 Testing Champion** - For testing contributions

## 📞 Getting Help

### 💬 Where to Ask Questions

1. **💡 Discussions** - [GitHub Discussions](https://github.com/your-username/claude-agent-gen/discussions) for general questions
2. **🐛 Issues** - [GitHub Issues](https://github.com/your-username/claude-agent-gen/issues) for bugs and features
3. **📧 Email** - Reach out to maintainers directly for private matters

### 🎯 Response Times

- **🐛 Critical Bugs** - Within 24 hours
- **✨ Feature Requests** - Within 3-5 days  
- **📝 Documentation** - Within 1 week
- **💬 General Questions** - Within 2-3 days

## 🚀 Pull Request Process

### 📋 PR Checklist

Before submitting a PR, ensure:

- [ ] 🧪 **Tests pass** - `npm test`
- [ ] 📝 **Code is documented** - JSDoc comments for public APIs
- [ ] 🎨 **Code is formatted** - Consistent with project style
- [ ] 📚 **Documentation updated** - If needed
- [ ] 🏷️ **PR is labeled** - Use appropriate labels
- [ ] 📄 **Description is clear** - Explain what and why

### 🎯 PR Template

```markdown
## 📋 Description
Brief description of the changes.

## 🎯 Type of Change
- [ ] 🐛 Bug fix
- [ ] ✨ New feature
- [ ] 💥 Breaking change
- [ ] 📝 Documentation update

## 🧪 Testing
- [ ] Added tests for new functionality
- [ ] All existing tests pass
- [ ] Manually tested the changes

## 📚 Documentation
- [ ] Updated relevant documentation
- [ ] Added code comments where needed

## 🔗 Related Issues
Closes #123
```

### 🔍 Review Process

1. **🤖 Automated Checks** - CI runs tests and linting
2. **👥 Code Review** - Maintainers review the changes
3. **💬 Feedback** - Address any requested changes
4. **✅ Approval** - PR gets approved and merged
5. **🎉 Recognition** - Contributor gets credited

## 🎊 Thank You!

Thank you for contributing to Claude Agent Generator! Your contributions make this project better for everyone. 

### 🌟 Special Thanks

To all our amazing contributors who have helped make this project what it is today! 🙏

---

<div align="center">

**Questions? Reach out in [Discussions](https://github.com/your-username/claude-agent-gen/discussions)!**

Made with ❤️ by the Claude Agent Generator community

</div>