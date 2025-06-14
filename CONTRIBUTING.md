# Contributing to Quiz Wiz Worksheet Genie

Thank you for your interest in contributing to Quiz Wiz! We welcome contributions from the community and are grateful for your support.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:
- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive criticism
- Respect differing viewpoints and experiences

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

**When reporting bugs, include:**
- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior vs actual behavior
- Screenshots (if applicable)
- Your environment (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues.

**When suggesting enhancements, include:**
- A clear and descriptive title
- Detailed description of the proposed functionality
- Why this enhancement would be useful
- Possible implementation approach

### Pull Requests

1. **Fork the Repository**
   ```bash
   git clone https://github.com/flexpertsdev/quiz-wiz-worksheet-genie.git
   cd quiz-wiz-worksheet-genie
   git remote add upstream https://github.com/flexpertsdev/quiz-wiz-worksheet-genie.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow the coding standards
   - Write meaningful commit messages
   - Add tests for new functionality
   - Update documentation as needed

4. **Test Your Changes**
   ```bash
   npm run lint
   npm run typecheck
   npm run build
   ```

5. **Submit a Pull Request**
   - Push your branch to your fork
   - Open a PR against the `main` branch
   - Fill out the PR template completely
   - Link any related issues

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

## Coding Standards

### TypeScript
- Use TypeScript for all new code
- Define interfaces for props and data structures
- Avoid `any` type - use proper typing
- Export types from component files

### React
- Use functional components with hooks
- Follow atomic design principles
- Keep components focused and reusable
- Extract complex logic into custom hooks

### Styling
- Use Tailwind CSS classes
- Follow mobile-first approach
- Maintain consistent spacing and sizing
- Use semantic color names

### File Organization
```
src/
├── components/
│   ├── ui/           # Atoms
│   ├── compound/     # Molecules
│   ├── blocks/       # Organisms
│   ├── layout/       # Templates
│   └── pages/        # Pages
├── services/         # Service layer
├── stores/           # State management
├── hooks/            # Custom hooks
├── types/            # Type definitions
└── utils/            # Utilities
```

### Commit Messages
Follow Conventional Commits format:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Maintenance tasks

Examples:
```
feat: add worksheet duplication feature
fix: resolve mobile navigation z-index issue
docs: update API documentation for export service
```

## Testing Guidelines

### Unit Tests
- Test individual components and functions
- Aim for high coverage of business logic
- Use React Testing Library for components

### Integration Tests
- Test feature flows end-to-end
- Mock external services
- Test error scenarios

### Example Test
```typescript
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
```

## Documentation

### Code Documentation
- Add JSDoc comments for complex functions
- Document component props with TypeScript
- Include usage examples for utilities

### README Updates
- Update README for significant features
- Keep installation instructions current
- Document new environment variables

## Review Process

### What We Look For
- Code quality and consistency
- Test coverage
- Documentation updates
- Performance implications
- Security considerations

### Review Timeline
- Initial review within 2-3 business days
- Address feedback promptly
- Re-review after changes

## Release Process

1. **Version Bumping**
   - Follow semantic versioning
   - Update CHANGELOG.md
   - Tag releases properly

2. **Release Notes**
   - List all changes
   - Credit contributors
   - Include migration guides if needed

## Getting Help

### Resources
- [Development Guide](./docs/DEVELOPMENT_GUIDE.md)
- [Architecture Documentation](./docs/ARCHITECTURE.md)
- [API Documentation](./docs/API_DOCUMENTATION.md)

### Communication
- GitHub Issues for bugs/features
- Discussions for questions
- Pull Request comments for code review

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Credited in release notes
- Acknowledged in the README

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Quiz Wiz Worksheet Genie! 🎉