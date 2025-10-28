# 🧘 SQL Koans

**Learn SQL through practice** - A Koans-inspired interactive tutorial for mastering SQL from basics to advanced concepts.

## 📖 What are SQL Koans?

SQL Koans is a hands-on learning environment where you practice SQL by writing queries that pass tests. Inspired by the "Koans" teaching method, you'll progress through lessons that gradually increase in complexity, receiving immediate feedback on your solutions.

Perfect for developers who want to:
- 🎯 Learn SQL from scratch or reinforce fundamentals
- ⚡ Practice with instant feedback
- 🚀 Progress from SELECT basics to Window Functions
- 💻 Work in an isolated, portable environment (no database server needed!)

## ✨ Features

- **10 Progressive Lessons**: From SELECT basics to Window Functions
- **Instant Feedback**: See immediately if your queries are correct
- **Bilingual Support**: Learn in English or Portuguese (configurable with `--lang` parameter)
- **SQLite In-Memory**: Fast, isolated tests with no setup required
- **Realistic Data**: Practice with employees, departments, projects, and assignments
- **Colorful CLI**: Clear, motivating visual feedback
- **Hint System**: Get help when you're stuck
- **Track Progress**: See how far you've come

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/dwildt/sqlkoans.git
cd sqlkoans

# Install dependencies
npm install
```

### Your First Koan

1. Open `sql/01_select_basics.sql` in your editor
2. Write your first query where it says `YOUR QUERY HERE`
3. Run the tests:
   ```bash
   npm test 01
   ```
4. Fix any failures and repeat until all koans pass!

## 📚 Lesson Structure

### Module 1: Fundamentals
- **Lesson 01**: SELECT Basics - Learn to retrieve data
- **Lesson 02**: WHERE Clauses - Filter your results
- **Lesson 03**: ORDER BY and LIMIT - Sort and paginate data

### Module 2: Aggregations
- **Lesson 04**: Aggregate Functions - COUNT, SUM, AVG, MIN, MAX
- **Lesson 05**: GROUP BY and HAVING - Group and filter aggregated data

### Module 3: JOINs
- **Lesson 06**: INNER JOIN - Combine data from multiple tables
- **Lesson 07**: OUTER JOINs - Preserve unmatched rows with LEFT JOIN

### Module 4: Advanced Queries
- **Lesson 08**: Subqueries - Nest queries for complex logic
- **Lesson 09**: CTEs - Use WITH for readable queries
- **Lesson 10**: Window Functions - Advanced analytics with OVER

## 🎮 Usage

### Run all lessons
```bash
npm test
```

### Run specific lesson
```bash
npm test 01    # Run lesson 01
npm test 5     # Run lesson 05
```

### Language options
```bash
npm test 01 --lang=en    # Run in English (default)
npm test 01 --lang=pt    # Run in Portuguese / Executar em Português
npm test --lang=pt       # Run all lessons in Portuguese
```

### View progress
```bash
npm run progress
npm run progress --lang=pt    # View progress in Portuguese
```

### Get hints
```bash
npm run hint 01 2              # Get hint for lesson 01, koan 2
npm run hint 01 2 --lang=pt    # Get hint in Portuguese
```

## 📊 Database Schema

The koans use four related tables:

### `employees`
- `id`, `name`, `department`, `salary`, `hire_date`, `manager_id`
- 12 employees across 4 departments

### `departments`
- `id`, `name`, `budget`
- IT, Sales, HR, Finance

### `projects`
- `id`, `name`, `department_id`, `budget`, `start_date`
- 9 projects across departments

### `assignments`
- `employee_id`, `project_id`, `hours`
- Employee allocations to projects

## 💡 Example Output

```
🧘 SQL Koans - Path to Enlightenment

✓ 01 - SELECT Basics
  ✓ Koan 1: Select all employees
  ✓ Koan 2: Select only name and salary
  ✗ Koan 3: Unique departments
    Expected 4 unique departments, got 10 rows with duplicates
    💡 Hint: Use SELECT DISTINCT department FROM employees

Progress: 2/3 koans completed (67%)
Keep going! Fix the remaining koans to complete this lesson.
```

## 🌍 Language Support

SQL Koans supports both **English** and **Portuguese** to make learning accessible to more developers!

### How it works
- Use the `--lang` parameter to choose your language
- **English** is the default: `npm test` or `npm test --lang=en`
- **Portuguese**: `npm test --lang=pt`
- All output is translated: lesson titles, koan names, hints, progress messages, and error messages
- SQL syntax remains the same in both languages (it's SQL after all!)

### Examples
```bash
# English
npm test 01 --lang=en
✓ 01 - SELECT Basics
  ✓ Koan 1: Select all employees

# Portuguese / Português
npm test 01 --lang=pt
✓ 01 - SELECT Básico
  ✓ Koan 1: Selecionar todos os funcionários
```

## 🎯 Learning Tips

1. **Read the lesson intro** in each SQL file before starting
2. **Start simple** - Don't skip lessons, they build on each other
3. **Use hints wisely** - Try to solve it first, then check the hint
4. **Experiment** - The database resets for each test, so try different approaches
5. **Check the data** - Understanding the schema helps write better queries

## 🛠️ Technical Details

- **Runtime**: Node.js (>= 14.0.0)
- **Database**: SQLite in-memory (via sql.js)
- **Testing**: Custom test runner with instant feedback
- **No external database required** - Everything runs locally

## 📖 Additional Resources

- [SQL Tutorial on W3Schools](https://www.w3schools.com/sql/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [Window Functions Explained](https://www.sqlite.org/windowfunctions.html)
- [JS Koans](https://github.com/dwildt/jskoans) - Learn JavaScript and TypeScript through practice

## 💖 Support This Project

If you find SQL Koans helpful and want to support its development, consider becoming a sponsor!

[![Sponsor on GitHub](https://img.shields.io/badge/Sponsor-GitHub-pink?logo=github)](https://github.com/sponsors/dwildt)
[![Support on Patreon](https://img.shields.io/badge/Support-Patreon-orange?logo=patreon)](https://patreon.com/dwildt)

Your support helps me:
- 🚀 Create more lessons and koans
- 🐛 Maintain and improve the project
- 📚 Develop additional learning resources
- ☕ Stay caffeinated while coding!

Every contribution, no matter how small, is greatly appreciated! 🙏

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs or issues
- Suggest new koans or lessons
- Improve documentation
- Share your learning experience

Open an issue or pull request at: https://github.com/dwildt/sqlkoans

## 📝 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

Inspired by:
- [Ruby Koans](http://rubykoans.com/) - The original Koans concept
- [JavaScript Koans](https://github.com/mrdavidlaing/javascript-koans)
- [JS Koans](https://github.com/dwildt/jskoans) - A similar project for learning JavaScript and TypeScript
- The philosophy of learning through practice

---

**Ready to start your SQL journey?** 🚀

```bash
npm install
npm test 01
```

May you achieve enlightenment through practice! 🧘
