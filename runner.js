#!/usr/bin/env node

const DatabaseManager = require('./lib/database');
const TestRunner = require('./lib/test-runner');
const Formatter = require('./lib/formatter');

/**
 * SQL Koans Runner
 * Entry point principal para executar os testes
 */

class KoanRunner {
  constructor() {
    this.db = null;
    this.testRunner = null;
  }

  /**
   * Inicializa o ambiente
   */
  async initialize() {
    try {
      this.db = new DatabaseManager();
      await this.db.initialize();
      this.testRunner = new TestRunner(this.db);
    } catch (error) {
      Formatter.error(`Failed to initialize database: ${error.message}`);
      process.exit(1);
    }
  }

  /**
   * Limpa recursos
   */
  cleanup() {
    if (this.db) {
      this.db.close();
    }
  }

  /**
   * Executa uma lição específica
   */
  runLesson(lessonNumber) {
    const lessonFile = this.getLessonFile(lessonNumber);

    if (!lessonFile) {
      Formatter.error(`Lesson ${lessonNumber} not found`);
      return;
    }

    try {
      const result = this.testRunner.runLesson(lessonFile);
      this.displayLessonResult(result);
    } catch (error) {
      Formatter.error(`Failed to run lesson: ${error.message}`);
    }
  }

  /**
   * Executa todas as lições
   */
  runAll() {
    const results = this.testRunner.runAll();

    Formatter.header();

    let totalPassed = 0;
    let totalKoans = 0;

    results.forEach(result => {
      if (result.success) {
        const allPassed = result.passed === result.total;
        const icon = allPassed ? '✓' : result.passed > 0 ? '○' : '✗';

        console.log(`${icon} ${result.title}`);

        totalPassed += result.passed;
        totalKoans += result.total;
      } else {
        console.log(`✗ ${result.lesson} (Error: ${result.error})`);
      }
    });

    const percentage = totalKoans > 0 ? Math.round((totalPassed / totalKoans) * 100) : 0;
    Formatter.progress(totalPassed, totalKoans, percentage);

    if (totalPassed < totalKoans) {
      const firstIncomplete = results.find(r => r.success && r.passed < r.total);
      if (firstIncomplete) {
        Formatter.nextStep(`Continue with ${firstIncomplete.lesson}.sql`);
      }
    }
  }

  /**
   * Exibe progresso geral
   */
  showProgress() {
    const results = this.testRunner.runAll();

    Formatter.header();
    Formatter.summary(results);

    const totalPassed = results.reduce((sum, r) => sum + r.passed, 0);
    const totalKoans = results.reduce((sum, r) => sum + r.total, 0);
    const percentage = totalKoans > 0 ? Math.round((totalPassed / totalKoans) * 100) : 0;

    Formatter.progress(totalPassed, totalKoans, percentage);
  }

  /**
   * Exibe hint de um koan específico
   */
  showHint(lessonNumber, koanNumber) {
    const lessonFile = this.getLessonFile(lessonNumber);

    if (!lessonFile) {
      Formatter.error(`Lesson ${lessonNumber} not found`);
      return;
    }

    try {
      const koanIndex = parseInt(koanNumber) - 1;
      const info = this.testRunner.getKoanInfo(lessonFile, koanIndex);

      Formatter.koanDetail(
        info.lessonTitle,
        info.koanName,
        info.hint,
        info.expectedMessage
      );
    } catch (error) {
      Formatter.error(error.message);
    }
  }

  /**
   * Exibe resultado de uma lição
   */
  displayLessonResult(result) {
    Formatter.header();
    Formatter.lessonTitle(result.title, result.description);

    result.koans.forEach(koan => {
      if (koan.passed) {
        Formatter.koanPassed(koan.name);
      } else if (koan.notAttempted) {
        Formatter.koanNotAttempted(koan.name, koan.hint);
      } else if (koan.error) {
        Formatter.sqlError(koan.name, koan.error);
      } else {
        Formatter.koanFailed(koan.name, koan.message, koan.hint);
      }
    });

    Formatter.lessonProgress(
      this.extractLessonNumber(result.title),
      result.passed,
      result.total
    );

    // Sugere próxima lição se completou esta
    if (result.passed === result.total) {
      const lessonNum = this.extractLessonNumber(result.title);
      const nextLesson = String(lessonNum + 1).padStart(2, '0');
      const lessons = TestRunner.getAvailableLessons();

      if (lessons.some(l => l.startsWith(nextLesson))) {
        Formatter.nextStep(`Try lesson ${nextLesson}`);
      }
    }
  }

  /**
   * Obtém o nome do arquivo da lição a partir do número
   */
  getLessonFile(lessonNumber) {
    const lessons = TestRunner.getAvailableLessons();
    const paddedNumber = String(lessonNumber).padStart(2, '0');

    return lessons.find(l => l.startsWith(paddedNumber));
  }

  /**
   * Extrai o número da lição do título
   */
  extractLessonNumber(title) {
    const match = title.match(/^(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  /**
   * Exibe mensagem de ajuda
   */
  static showHelp() {
    console.log(`
SQL Koans - Learn SQL through practice

Usage:
  npm test              Run all koans
  npm test <number>     Run specific lesson (e.g., npm test 01)
  npm run progress      Show overall progress
  npm run hint <lesson> <koan>  Show hint for specific koan

Examples:
  npm test              # Run all lessons
  npm test 01           # Run lesson 01
  npm test 5            # Run lesson 05
  npm run progress      # Show progress summary
  npm run hint 01 2     # Show hint for lesson 01, koan 2

To get started:
  1. Open sql/01_select_basics.sql
  2. Write your SQL queries
  3. Run: npm test 01
  4. Fix any failures and repeat!

Learn more: https://github.com/yourusername/sqlkoans
`);
  }
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);

  // Parse argumentos
  const command = args[0];

  if (command === '--help' || command === '-h') {
    KoanRunner.showHelp();
    return;
  }

  const runner = new KoanRunner();
  await runner.initialize();

  try {
    if (command === '--progress') {
      runner.showProgress();
    } else if (command === '--hint') {
      const lesson = args[1];
      const koan = args[2] || '1';

      if (!lesson) {
        Formatter.error('Please specify lesson number: npm run hint <lesson> <koan>');
      } else {
        runner.showHint(parseInt(lesson), koan);
      }
    } else if (command) {
      // Específica lição
      const lessonNumber = parseInt(command);

      if (isNaN(lessonNumber)) {
        Formatter.error(`Invalid lesson number: ${command}`);
        KoanRunner.showHelp();
      } else {
        runner.runLesson(lessonNumber);
      }
    } else {
      // Todas as lições
      runner.runAll();
    }
  } finally {
    runner.cleanup();
  }
}

// Trata erros não capturados
process.on('uncaughtException', (error) => {
  Formatter.error(`Unexpected error: ${error.message}`);
  process.exit(1);
});

// Executa
if (require.main === module) {
  main();
}

module.exports = KoanRunner;
