# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SQL Koans is an interactive SQL learning environment inspired by the Koans teaching method. Students write SQL queries in `.sql` files, and a custom Node.js test runner validates them against test definitions (koans) using SQLite in-memory databases.

## Essential Commands

### Running Tests
```bash
# Run all lessons
npm test

# Run specific lesson by number
npm test 01        # Lesson 01
npm test 5         # Lesson 05

# View overall progress
npm run progress

# Get hint for specific koan
npm run hint 01 2  # Lesson 01, Koan 2
```

### Development
```bash
# Install dependencies (sql.js and chalk)
npm install

# Entry point: runner.js
node runner.js [options]
```

## Architecture

### Test Runner Flow

1. **Entry Point** (`runner.js`): Main CLI that orchestrates the test execution
   - `KoanRunner` class manages initialization, lesson execution, and display
   - Handles command-line arguments (lesson numbers, --progress, --hint)

2. **Database Layer** (`lib/database.js`):
   - Uses `sql.js` for in-memory SQLite database (no external DB required)
   - `DatabaseManager` initializes schema and seeds data on startup
   - Database is recreated fresh for each test run (isolated environment)

3. **Test Execution** (`lib/test-runner.js`):
   - `TestRunner.runLesson()` loads paired files:
     - `koans/XX_lesson.js`: Test definitions with validation functions
     - `sql/XX_lesson.sql`: Student's SQL queries
   - `parseSqlFile()` extracts queries by splitting on `-- KOAN N:` comments
   - Each koan's `test()` function receives query results and validates them
   - Koans reference queries by index (`queryIndex: 0` maps to first query in SQL file)

4. **Output Formatting** (`lib/formatter.js`):
   - Uses `chalk` for colorized CLI output
   - Status indicators: ✓ (passed), ✗ (failed), ○ (not attempted)
   - Progress bars and motivational messages

### Database Schema

Four interconnected tables seeded with realistic data in `data/seed.js`:

- **employees**: 12 employees with departments, salaries, hire dates, manager relationships
- **departments**: 4 departments (IT, Sales, HR, Finance) with budgets
- **projects**: 9 projects assigned to departments with budgets and dates
- **assignments**: N:N relationship between employees and projects with hours

Schema uses foreign keys and includes self-referential relationship (employees.manager_id).

### Koan Structure

Each koan definition in `koans/*.js` contains:

```javascript
{
  id: 1,
  name: "Human-readable description",
  queryIndex: 0,  // Maps to query position in SQL file
  test: (result) => {
    // Validation logic
    // result is array of objects [{col1: val1, col2: val2}, ...]
    return true/false;
  },
  hint: "Suggestion for student",
  expectedMessage: "What the query should return"
}
```

### Student SQL File Structure

SQL files in `sql/*.sql` follow this pattern:

```sql
-- Lesson header with learning objectives

-- KOAN 1: Description
-- Additional context
-- YOUR QUERY HERE

-- KOAN 2: Description
-- YOUR QUERY HERE
```

The parser splits on `-- KOAN N:` markers to extract individual queries.

## Adding New Lessons

1. Create `koans/XX_lesson_name.js` with test definitions
2. Create `sql/XX_lesson_name.sql` with koan placeholders
3. Ensure `queryIndex` in koan definitions matches SQL file order
4. Test functions receive query results as array of objects
5. Runner automatically discovers new lesson files (no registration needed)

## Technical Details

- **Runtime**: Node.js >= 14.0.0
- **Dependencies**: sql.js (SQLite in WASM), chalk (terminal colors)
- **No external database**: Everything runs in-memory via sql.js
- **Modular design**: Database, test runner, and formatter are separate concerns
- **Student files**: Only `.sql` files are edited by learners; `.js` files define tests
