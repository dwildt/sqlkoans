#!/usr/bin/env node

const DatabaseManager = require('./lib/database');
const TestRunner = require('./lib/test-runner');
const Formatter = require('./lib/formatter');
const { t, isSupported } = require('./lib/i18n');

/**
 * SQL Koans Runner
 * Entry point principal para executar os testes
 */

class KoanRunner {
  constructor(language = 'en') {
    this.db = null;
    this.testRunner = null;
    this.language = language;
  }

  /**
   * Inicializa o ambiente
   */
  async initialize() {
    try {
      this.db = new DatabaseManager();
      await this.db.initialize();
      this.testRunner = new TestRunner(this.db, this.language);
    } catch (error) {
      Formatter.error(t('failedToInitialize', this.language, error.message), this.language);
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
      Formatter.error(t('lessonNotFound', this.language, lessonNumber), this.language);
      return;
    }

    try {
      const result = this.testRunner.runLesson(lessonFile);
      this.displayLessonResult(result);
    } catch (error) {
      Formatter.error(t('failedToRun', this.language, error.message), this.language);
    }
  }

  /**
   * Executa todas as lições
   */
  runAll() {
    const results = this.testRunner.runAll();

    Formatter.header(this.language);

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
        console.log(`✗ ${result.lesson} (${t('error', this.language)}: ${result.error})`);
      }
    });

    const percentage = totalKoans > 0 ? Math.round((totalPassed / totalKoans) * 100) : 0;
    Formatter.progress(totalPassed, totalKoans, percentage, this.language);

    if (totalPassed < totalKoans) {
      const firstIncomplete = results.find(r => r.success && r.passed < r.total);
      if (firstIncomplete) {
        Formatter.nextStep(t('continueWith', this.language, `${firstIncomplete.lesson}.sql`), this.language);
      }
    }
  }

  /**
   * Exibe progresso geral
   */
  showProgress() {
    const results = this.testRunner.runAll();

    Formatter.header(this.language);
    Formatter.summary(results, this.language);

    const totalPassed = results.reduce((sum, r) => sum + r.passed, 0);
    const totalKoans = results.reduce((sum, r) => sum + r.total, 0);
    const percentage = totalKoans > 0 ? Math.round((totalPassed / totalKoans) * 100) : 0;

    Formatter.progress(totalPassed, totalKoans, percentage, this.language);
  }

  /**
   * Exibe hint de um koan específico
   */
  showHint(lessonNumber, koanNumber) {
    const lessonFile = this.getLessonFile(lessonNumber);

    if (!lessonFile) {
      Formatter.error(t('lessonNotFound', this.language, lessonNumber), this.language);
      return;
    }

    try {
      const koanIndex = parseInt(koanNumber) - 1;
      const info = this.testRunner.getKoanInfo(lessonFile, koanIndex);

      Formatter.koanDetail(
        info.lessonTitle,
        info.koanName,
        info.hint,
        info.expectedMessage,
        this.language
      );
    } catch (error) {
      Formatter.error(error.message, this.language);
    }
  }

  /**
   * Exibe resultado de uma lição
   */
  displayLessonResult(result) {
    Formatter.header(this.language);
    Formatter.lessonTitle(result.title, result.description, this.language);

    result.koans.forEach(koan => {
      if (koan.passed) {
        Formatter.koanPassed(koan.name, this.language);
      } else if (koan.notAttempted) {
        Formatter.koanNotAttempted(koan.name, koan.hint, this.language);
      } else if (koan.error) {
        Formatter.sqlError(koan.name, koan.error, this.language);
      } else {
        Formatter.koanFailed(koan.name, koan.message, koan.hint, this.language);
      }
    });

    Formatter.lessonProgress(
      this.extractLessonNumber(result.title),
      result.passed,
      result.total,
      this.language
    );

    // Sugere próxima lição se completou esta
    if (result.passed === result.total) {
      const lessonNum = this.extractLessonNumber(result.title);
      const nextLesson = String(lessonNum + 1).padStart(2, '0');
      const lessons = TestRunner.getAvailableLessons();

      if (lessons.some(l => l.startsWith(nextLesson))) {
        Formatter.nextStep(t('tryLesson', this.language, nextLesson), this.language);
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
  static showHelp(lang = 'en') {
    console.log(`
${t('helpDescription', lang)}

${t('helpUsage', lang)}:
  npm test                       ${t('helpRunAll', lang)}
  npm test <number>              ${t('helpRunSpecific', lang)}
  npm run progress               ${t('helpProgress', lang)}
  npm run hint <lesson> <koan>   ${t('helpHint', lang)}

${t('helpExamples', lang)}:
  npm test                       # ${t('helpRunAll', lang)}
  npm test 01                    # ${t('helpRunSpecific', lang).replace('(e.g., npm test 01)', '- lesson 01')}
  npm test 01 --lang=pt          # Run lesson 01 in Portuguese
  npm test 5                     # Run lesson 05
  npm run progress               # ${t('helpProgress', lang)}
  npm run hint 01 2              # ${t('helpHint', lang).replace('Show hint for specific koan', 'lesson 01, koan 2')}

Language options:
  --lang=en                      English (default)
  --lang=pt                      Portuguese

${t('helpToGetStarted', lang)}:
  1. ${t('helpStep1', lang)}
  2. ${t('helpStep2', lang)}
  3. ${t('helpStep3', lang)}
  4. ${t('helpStep4', lang)}

${t('helpLearnMore', lang)}: https://github.com/yourusername/sqlkoans
`);
  }
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);

  // Parse language parameter
  let language = 'en';
  const langArgIndex = args.findIndex(arg => arg.startsWith('--lang='));
  if (langArgIndex !== -1) {
    const langArg = args[langArgIndex];
    language = langArg.split('=')[1] || 'en';
    if (!isSupported(language)) {
      console.error(`Unsupported language: ${language}. Using English as default.`);
      language = 'en';
    }
    // Remove language arg from args
    args.splice(langArgIndex, 1);
  }

  // Parse argumentos
  const command = args[0];

  if (command === '--help' || command === '-h') {
    KoanRunner.showHelp(language);
    return;
  }

  const runner = new KoanRunner(language);
  await runner.initialize();

  try {
    if (command === '--progress') {
      runner.showProgress();
    } else if (command === '--hint') {
      const lesson = args[1];
      const koan = args[2] || '1';

      if (!lesson) {
        Formatter.error(t('pleaseSpecifyLesson', language), language);
      } else {
        runner.showHint(parseInt(lesson), koan);
      }
    } else if (command) {
      // Específica lição
      const lessonNumber = parseInt(command);

      if (isNaN(lessonNumber)) {
        Formatter.error(t('invalidLessonNumber', language, command), language);
        KoanRunner.showHelp(language);
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
  Formatter.error(t('unexpectedError', 'en', error.message), 'en');
  process.exit(1);
});

// Executa
if (require.main === module) {
  main();
}

module.exports = KoanRunner;
