const chalk = require('chalk');
const { t } = require('./i18n');

class Formatter {
  /**
   * Exibe o header do programa
   */
  static header(lang = 'en') {
    console.log();
    console.log(chalk.cyan.bold(t('header', lang)));
    console.log();
  }

  /**
   * Exibe o título de uma lição
   */
  static lessonTitle(title, description = '', lang = 'en') {
    console.log(chalk.yellow.bold(`\n${title}`));
    if (description) {
      console.log(chalk.gray(`  ${description}`));
    }
  }

  /**
   * Exibe um koan que passou
   */
  static koanPassed(name, lang = 'en') {
    console.log(chalk.green(`  ✓ ${name}`));
  }

  /**
   * Exibe um koan que falhou
   */
  static koanFailed(name, message, hint = '', lang = 'en') {
    console.log(chalk.red(`  ✗ ${name}`));
    if (message) {
      console.log(chalk.red(`    ${message}`));
    }
    if (hint) {
      console.log(chalk.blue(`    💡 ${t('hint', lang)}: ${hint}`));
    }
  }

  /**
   * Exibe um koan sem query (não tentado ainda)
   */
  static koanNotAttempted(name, hint = '', lang = 'en') {
    console.log(chalk.gray(`  ○ ${name}`));
    console.log(chalk.gray(`    ${t('noQueryFound', lang)}`));
    if (hint) {
      console.log(chalk.blue(`    💡 ${t('hint', lang)}: ${hint}`));
    }
  }

  /**
   * Exibe erro de SQL
   */
  static sqlError(name, error, lang = 'en') {
    console.log(chalk.red(`  ✗ ${name}`));
    console.log(chalk.red(`    ${t('sqlError', lang)}: ${error}`));
  }

  /**
   * Exibe progresso geral
   */
  static progress(passed, total, percentage, lang = 'en') {
    console.log();
    console.log(chalk.cyan('─'.repeat(50)));
    console.log(chalk.cyan.bold(`${t('progress', lang)}: ${passed}/${total} ${t('koansCompleted', lang)} (${percentage}%)`));

    if (passed === total) {
      console.log(chalk.green.bold(t('enlightenmentAchieved', lang)));
    } else if (passed === 0) {
      console.log(chalk.yellow(t('notStarted', lang)));
    } else if (percentage < 30) {
      console.log(chalk.yellow(t('keepGoing', lang)));
    } else if (percentage < 70) {
      console.log(chalk.yellow(t('goodProgress', lang)));
    } else {
      console.log(chalk.green(t('excellentWork', lang)));
    }
    console.log(chalk.cyan('─'.repeat(50)));
    console.log();
  }

  /**
   * Exibe progresso de uma lição específica
   */
  static lessonProgress(lessonNumber, passed, total, lang = 'en') {
    const percentage = total > 0 ? Math.round((passed / total) * 100) : 0;

    if (passed === total) {
      console.log(chalk.green.bold(`\n✨ ${t('lessonCompleted', lang, lessonNumber)}`));
      console.log(chalk.green(t('allKoansPassed', lang, total) + '\n'));
    } else {
      console.log(chalk.yellow(`\n${t('progress', lang)}: ${passed}/${total} ${t('koansCompleted', lang)} (${percentage}%)`));
      if (passed > 0) {
        console.log(chalk.yellow(t('keepGoingLesson', lang) + '\n'));
      }
    }
  }

  /**
   * Exibe mensagem de erro geral
   */
  static error(message, lang = 'en') {
    console.log();
    console.log(chalk.red.bold(`❌ ${t('error', lang)}: ${message}`));
    console.log();
  }

  /**
   * Exibe mensagem de sucesso geral
   */
  static success(message, lang = 'en') {
    console.log();
    console.log(chalk.green.bold(`✅ ${message}`));
    console.log();
  }

  /**
   * Exibe informação geral
   */
  static info(message, lang = 'en') {
    console.log(chalk.blue(`ℹ️  ${message}`));
  }

  /**
   * Exibe próximo passo sugerido
   */
  static nextStep(message, lang = 'en') {
    console.log(chalk.cyan.bold(`\n→ ${t('next', lang)}: ${message}\n`));
  }

  /**
   * Exibe resumo de todas as lições
   */
  static summary(lessons, lang = 'en') {
    console.log(chalk.cyan.bold(`\n${t('summary', lang)}\n`));

    lessons.forEach((lesson, index) => {
      const lessonNum = String(index + 1).padStart(2, '0');
      const passed = lesson.passed || 0;
      const total = lesson.total || 0;
      const percentage = total > 0 ? Math.round((passed / total) * 100) : 0;

      const status = passed === total
        ? chalk.green('✓')
        : passed > 0
        ? chalk.yellow('○')
        : chalk.gray('○');

      const progressBar = this.progressBar(percentage, 20);

      console.log(`  ${status} ${t('lesson', lang)} ${lessonNum}: ${lesson.title}`);
      console.log(`     ${progressBar} ${passed}/${total} (${percentage}%)`);
    });

    console.log();
  }

  /**
   * Cria uma barra de progresso visual
   */
  static progressBar(percentage, width = 20) {
    const filled = Math.round((percentage / 100) * width);
    const empty = width - filled;

    const bar = chalk.green('█'.repeat(filled)) + chalk.gray('░'.repeat(empty));
    return `[${bar}]`;
  }

  /**
   * Exibe detalhes de um koan específico (para comando hint)
   */
  static koanDetail(lessonTitle, koanName, hint, expectedMessage, lang = 'en') {
    console.log();
    console.log(chalk.cyan.bold(t('koanDetails', lang)));
    console.log(chalk.yellow(`\n${t('lesson', lang)}: ${lessonTitle}`));
    console.log(chalk.yellow(`${t('koan', lang)}: ${koanName}\n`));

    if (expectedMessage) {
      console.log(chalk.white(`${t('expected', lang)}: ${expectedMessage}`));
    }

    if (hint) {
      console.log(chalk.blue.bold(`\n💡 ${t('hint', lang)}: ${hint}`));
    }
    console.log();
  }
}

module.exports = Formatter;
