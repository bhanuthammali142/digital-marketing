# GitHub Copilot Instructions for Digital Marketing Project

## Project Overview
This is a digital marketing project. Code and content should be optimized for marketing campaigns, analytics, and customer engagement.

## Coding Standards

### General Guidelines
- Write clean, maintainable, and well-documented code
- Follow language-specific best practices and conventions
- Use meaningful variable and function names that clearly describe their purpose
- Keep functions small and focused on a single responsibility

### Code Style
- Use consistent indentation (2 spaces for web technologies, 4 spaces for Python)
- Follow existing code formatting in the repository
- Add comments only when necessary to explain complex logic
- Prefer self-documenting code over excessive comments

## Security Requirements

### Data Protection
- Never commit API keys, tokens, passwords, or other secrets to the repository
- Use environment variables for sensitive configuration
- Always validate and sanitize user input to prevent XSS and injection attacks
- Implement proper authentication and authorization checks

### Web Security
- Set secure headers (CSP, X-Frame-Options, etc.)
- Use HTTPS for all external communications
- Implement proper CORS policies
- For cookies: always set `httpOnly`, `secure`, appropriate `sameSite` (use `lax` for marketing cookies, `strict` for sensitive data), and appropriate `maxAge`

## Testing Standards

### Test Coverage
- Write unit tests for new functionality
- Maintain a minimum of 80% code coverage
- Include both positive and negative test cases
- Test edge cases and error handling

### Testing Frameworks
- Use Jest for JavaScript/TypeScript projects
- Use pytest for Python projects
- Follow the existing test structure in the repository

## Documentation

### Code Documentation
- Add JSDoc comments for JavaScript/TypeScript functions
- Use docstrings for Python functions and classes
- Document function parameters, return values, and exceptions
- Keep documentation up-to-date with code changes

### Project Documentation
- Update README.md when adding new features or changing setup instructions
- Document any new dependencies and why they were added
- Include usage examples for new functionality

## Marketing-Specific Guidelines

### Analytics and Tracking
- Ensure all tracking codes are properly implemented
- Follow GDPR and privacy regulations when collecting data
- Use meaningful event names and properties for analytics
- Test tracking implementation before deployment

### Performance Optimization
- Optimize images and assets for web delivery
- Implement lazy loading for below-the-fold content
- Minimize JavaScript bundle sizes
- Use CDN for static assets when possible

### SEO Best Practices
- Use semantic HTML markup
- Include proper meta tags (title, description, og:tags)
- Implement schema.org structured data where appropriate
- Ensure proper heading hierarchy (h1-h6)
- Use descriptive alt text for images

### Accessibility
- Follow WCAG 2.1 AA standards
- Use ARIA labels where appropriate
- Ensure keyboard navigation works properly
- Maintain proper color contrast ratios
- Test with screen readers

## Dependencies

### Package Management
- Use npm for JavaScript/Node.js dependencies
- Use pip for Python dependencies
- Keep dependencies up-to-date and review security advisories
- Minimize dependency count - only add when truly necessary
- Document the reason for adding new dependencies

### Approved Patterns
- Use established libraries and frameworks from the ecosystem
- Prefer well-maintained packages with active communities
- Check license compatibility before adding dependencies

## Git Practices

### Commit Messages
- Write clear, concise commit messages
- Use present tense ("Add feature" not "Added feature")
- Reference issue numbers when applicable

### Branch Management
- Create feature branches for new work
- Keep branches focused on a single feature or fix
- Delete branches after merging

## Marketing Content Guidelines

### Copy and Content
- Maintain consistent brand voice and tone
- Use proper grammar and spelling
- Ensure all content is clear and concise
- Follow any brand guidelines for terminology and style

### Assets
- Organize marketing assets in appropriate directories
- Use descriptive file names for images and media
- Optimize file sizes without sacrificing quality
- Include source files when appropriate

## CI/CD and Deployment

### Quality Checks
- Ensure all tests pass before committing
- Run linters and fix issues before pushing
- Verify builds complete successfully
- Test locally before creating pull requests

### Deployment
- Follow the established deployment process
- Test in staging before production
- Include rollback plans for significant changes
- Monitor error rates and performance after deployment
