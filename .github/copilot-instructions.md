# GitHub Copilot Instructions for SQL Koans

## Project Overview

SQL Koans is an interactive, hands-on learning environment for mastering SQL. It follows the "Koans" teaching methodology where students learn by fixing failing tests through practice.

## Project Structure

- `sql/` - Contains SQL files with koans (exercises) for students to complete
- `koans/` - JavaScript test definitions for each lesson
- `lib/` - Database setup and utilities
- `data/` - Sample data for the database
- `tasks/` - Task definitions for the runner
- `runner.js` - Main test runner that executes koans and provides feedback

## Language and Localization

- **Primary Language**: Portuguese (pt-BR)
- All user-facing text, comments, and documentation should be in Portuguese
- Variables and function names should be in English (standard programming practice)
- Koans instructions and hints are in Portuguese

## Database Schema

The project uses SQLite in-memory database with these tables:

### employees
- `id` (INTEGER): Employee ID
- `name` (TEXT): Employee name
- `department` (TEXT): Department name
- `salary` (INTEGER): Annual salary
- `hire_date` (TEXT): Hire date
- `manager_id` (INTEGER): Manager's employee ID

### departments
- `id` (INTEGER): Department ID
- `name` (TEXT): Department name
- `budget` (INTEGER): Department budget

### projects
- `id` (INTEGER): Project ID
- `name` (TEXT): Project name
- `department_id` (INTEGER): Associated department
- `budget` (INTEGER): Project budget
- `start_date` (TEXT): Project start date

### assignments
- `employee_id` (INTEGER): Employee assigned
- `project_id` (INTEGER): Project assigned to
- `hours` (INTEGER): Hours allocated

## Code Style Guidelines

### SQL Files
- Use uppercase for SQL keywords (SELECT, FROM, WHERE, JOIN, etc.)
- Use lowercase for table and column names
- Each koan should have a comment explaining what it teaches
- Include hints in Portuguese using the comment format shown in existing files
- Place queries after the `-- YOUR QUERY HERE` marker

### JavaScript Files
- Use ES6+ features
- Follow existing patterns in `koans/` directory
- Each koan test should have:
  - A descriptive name in Portuguese
  - Expected results validation
  - Helpful error messages in Portuguese
  - Hints for students

### Test Structure
```javascript
{
  title: 'Nome do Koan',
  query: sql => sql.koans[koanNumber],
  validate: (result) => {
    // Validation logic
  },
  hint: 'Dica em português'
}
```

## Development Workflow

### Testing
- `npm test` - Run all lessons
- `npm test 01` - Run specific lesson (e.g., lesson 01)
- `npm run progress` - View overall progress
- `npm run hint 01 2` - Get hint for lesson 01, koan 2

### Adding New Koans
1. Create SQL file in `sql/` directory with naming pattern `NN_topic_name.sql`
2. Create corresponding test file in `koans/` directory
3. Update lesson sequence in runner.js if needed
4. Add test data in `data/` if new tables are needed

## Key Principles

1. **Progressive Learning**: Lessons build on each other, start simple and increase complexity
2. **Instant Feedback**: Students should immediately see if their queries pass or fail
3. **Helpful Hints**: Provide guidance without giving away the complete answer
4. **Real-world Practice**: Use realistic data and scenarios
5. **Isolated Environment**: Each test runs with a fresh database state

## Dependencies

- **sql.js**: SQLite compiled to JavaScript, runs in-memory
- **chalk**: Terminal string styling for colored output
- Node.js >= 14.0.0

## Common Tasks

### When Suggesting SQL Queries
- Always use uppercase for SQL keywords
- Consider SQLite-specific syntax (not MySQL or PostgreSQL)
- Ensure queries work with the existing schema
- Keep solutions simple and educational

### When Modifying Test Files
- Maintain consistent error messages in Portuguese
- Ensure validation logic is clear and correct
- Add helpful hints that guide without solving
- Test with both correct and incorrect solutions

### When Adding Features
- Keep the CLI output colorful and motivating
- Maintain the "enlightenment" theme from Koans philosophy
- Ensure changes work with in-memory SQLite
- Test thoroughly with the existing test runner

## Avoid

- Don't suggest queries using database-specific features not in SQLite
- Don't mix Portuguese and English in user-facing text
- Don't remove or modify existing koans without good reason
- Don't add external dependencies unless absolutely necessary
- Don't suggest complex solutions when simple ones work

## Testing Best Practices

- Always test SQL queries before suggesting them
- Verify queries work with the sample data
- Consider edge cases (NULL values, empty results, etc.)
- Ensure queries are performant with the dataset size

## Documentation

- Keep README.md up-to-date with new lessons
- Document any new features or changes
- Maintain consistent formatting with existing docs
- Use Portuguese for user documentation, English for code comments when appropriate
