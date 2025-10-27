const chalk = require('chalk');

class Formatter {
  /**
   * Exibe o header do programa
   */
  static header() {
    console.log();
    console.log(chalk.cyan.bold('🧘 SQL Koans - Path to Enlightenment'));
    console.log();
  }

  /**
   * Exibe o título de uma lição
   */
  static lessonTitle(title, description = '') {
    console.log(chalk.yellow.bold(`\n${title}`));
    if (description) {
      console.log(chalk.gray(`  ${description}`));
    }
  }

  /**
   * Exibe um koan que passou
   */
  static koanPassed(name) {
    console.log(chalk.green(`  ✓ ${name}`));
  }

  /**
   * Exibe um koan que falhou
   */
  static koanFailed(name, message, hint = '') {
    console.log(chalk.red(`  ✗ ${name}`));
    if (message) {
      console.log(chalk.red(`    ${message}`));
    }
    if (hint) {
      console.log(chalk.blue(`    💡 Hint: ${hint}`));
    }
  }

  /**
   * Exibe um koan sem query (não tentado ainda)
   */
  static koanNotAttempted(name, hint = '') {
    console.log(chalk.gray(`  ○ ${name}`));
    console.log(chalk.gray(`    No query found. Write your SQL in the corresponding file.`));
    if (hint) {
      console.log(chalk.blue(`    💡 Hint: ${hint}`));
    }
  }

  /**
   * Exibe erro de SQL
   */
  static sqlError(name, error) {
    console.log(chalk.red(`  ✗ ${name}`));
    console.log(chalk.red(`    SQL Error: ${error}`));
  }

  /**
   * Exibe progresso geral
   */
  static progress(passed, total, percentage) {
    console.log();
    console.log(chalk.cyan('─'.repeat(50)));
    console.log(chalk.cyan.bold(`Progress: ${passed}/${total} koans completed (${percentage}%)`));

    if (passed === total) {
      console.log(chalk.green.bold('✨ Enlightenment achieved! All koans completed! ✨'));
    } else if (passed === 0) {
      console.log(chalk.yellow('You have not yet started your journey. Begin by writing your first query!'));
    } else if (percentage < 30) {
      console.log(chalk.yellow('Keep going! Every journey begins with a single step. 🚀'));
    } else if (percentage < 70) {
      console.log(chalk.yellow('Good progress! You\'re on the path to mastery. 💪'));
    } else {
      console.log(chalk.green('Excellent work! You\'re almost there! 🎯'));
    }
    console.log(chalk.cyan('─'.repeat(50)));
    console.log();
  }

  /**
   * Exibe progresso de uma lição específica
   */
  static lessonProgress(lessonNumber, passed, total) {
    const percentage = total > 0 ? Math.round((passed / total) * 100) : 0;

    if (passed === total) {
      console.log(chalk.green.bold(`\n✨ Enlightenment achieved! Lesson ${lessonNumber} completed!`));
      console.log(chalk.green(`All ${total} koans passed! 🎉\n`));
    } else {
      console.log(chalk.yellow(`\nProgress: ${passed}/${total} koans completed (${percentage}%)`));
      if (passed > 0) {
        console.log(chalk.yellow('Keep going! Fix the remaining koans to complete this lesson.\n'));
      }
    }
  }

  /**
   * Exibe mensagem de erro geral
   */
  static error(message) {
    console.log();
    console.log(chalk.red.bold(`❌ Error: ${message}`));
    console.log();
  }

  /**
   * Exibe mensagem de sucesso geral
   */
  static success(message) {
    console.log();
    console.log(chalk.green.bold(`✅ ${message}`));
    console.log();
  }

  /**
   * Exibe informação geral
   */
  static info(message) {
    console.log(chalk.blue(`ℹ️  ${message}`));
  }

  /**
   * Exibe próximo passo sugerido
   */
  static nextStep(message) {
    console.log(chalk.cyan.bold(`\n→ Next: ${message}\n`));
  }

  /**
   * Exibe resumo de todas as lições
   */
  static summary(lessons) {
    console.log(chalk.cyan.bold('\n📊 Summary of All Lessons:\n'));

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

      console.log(`  ${status} Lesson ${lessonNum}: ${lesson.title}`);
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
  static koanDetail(lessonTitle, koanName, hint, expectedMessage) {
    console.log();
    console.log(chalk.cyan.bold('📖 Koan Details'));
    console.log(chalk.yellow(`\nLesson: ${lessonTitle}`));
    console.log(chalk.yellow(`Koan: ${koanName}\n`));

    if (expectedMessage) {
      console.log(chalk.white(`Expected: ${expectedMessage}`));
    }

    if (hint) {
      console.log(chalk.blue.bold(`\n💡 Hint: ${hint}`));
    }
    console.log();
  }
}

module.exports = Formatter;
