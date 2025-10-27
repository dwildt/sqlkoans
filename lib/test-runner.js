const fs = require('fs');
const path = require('path');

class TestRunner {
  constructor(db) {
    this.db = db;
  }

  /**
   * Executa os testes de uma lição
   * @param {string} lessonFile - Nome do arquivo da lição (ex: '01_select_basics')
   * @returns {Object} Resultado dos testes
   */
  runLesson(lessonFile) {
    // Carrega o arquivo de teste (koans)
    const koanPath = path.join(__dirname, '..', 'koans', `${lessonFile}.js`);
    const sqlPath = path.join(__dirname, '..', 'sql', `${lessonFile}.sql`);

    // Verifica se os arquivos existem
    if (!fs.existsSync(koanPath)) {
      throw new Error(`Koan file not found: ${koanPath}`);
    }

    if (!fs.existsSync(sqlPath)) {
      throw new Error(`SQL file not found: ${sqlPath}`);
    }

    // Carrega a definição dos koans
    const koanDefinition = require(koanPath);

    // Lê e parseia o arquivo SQL do aluno
    const queries = this.parseSqlFile(sqlPath);

    // Executa cada koan
    const results = {
      title: koanDefinition.title,
      description: koanDefinition.description || '',
      koans: [],
      passed: 0,
      total: koanDefinition.koans.length
    };

    koanDefinition.koans.forEach((koan) => {
      const result = this.runKoan(koan, queries);
      results.koans.push(result);
      if (result.passed) {
        results.passed++;
      }
    });

    return results;
  }

  /**
   * Executa um koan individual
   */
  runKoan(koan, queries) {
    const result = {
      name: koan.name,
      passed: false,
      error: null,
      message: null,
      hint: koan.hint || '',
      expectedMessage: koan.expectedMessage || ''
    };

    // Pega a query correspondente
    const query = queries[koan.queryIndex];

    // Se não há query, koan não foi tentado
    if (!query || query.trim() === '') {
      result.message = 'No query found';
      result.notAttempted = true;
      return result;
    }

    // Executa a query
    try {
      const queryResult = this.db.query(query);

      // Executa a função de teste
      const testPassed = koan.test(queryResult);

      if (testPassed) {
        result.passed = true;
      } else {
        result.message = this.generateFailureMessage(koan, queryResult);
      }
    } catch (error) {
      result.error = error.message;
      result.message = `SQL Error: ${error.message}`;
    }

    return result;
  }

  /**
   * Parseia o arquivo SQL e extrai as queries individuais
   */
  parseSqlFile(sqlPath) {
    const content = fs.readFileSync(sqlPath, 'utf-8');

    // Divide o arquivo em seções baseado em comentários "-- KOAN"
    // Captura toda a linha incluindo o título do koan
    const sections = content.split(/-- KOAN \d+:.*\n/);

    // Remove a primeira seção (header do arquivo)
    sections.shift();

    // Para cada seção, extrai a query SQL
    const queries = sections.map(section => {
      // Remove comentários de linha
      const lines = section.split('\n');
      const sqlLines = [];

      for (const line of lines) {
        const trimmed = line.trim();

        // Ignora linhas vazias, comentários e placeholders
        if (trimmed === '' ||
            trimmed.startsWith('--') ||
            trimmed.includes('YOUR QUERY HERE')) {
          continue;
        }

        sqlLines.push(line);
      }

      return sqlLines.join('\n').trim();
    });

    return queries;
  }

  /**
   * Gera mensagem de falha baseada no resultado
   */
  generateFailureMessage(koan, result) {
    // Se há uma mensagem esperada customizada, usa ela
    if (koan.expectedMessage) {
      return koan.expectedMessage;
    }

    // Caso contrário, gera mensagem genérica
    if (Array.isArray(result)) {
      return `Query returned ${result.length} row(s). Check if this matches the expected result.`;
    }

    return 'Query result does not match expected output.';
  }

  /**
   * Carrega todos os koans disponíveis
   */
  static getAvailableLessons() {
    const koansDir = path.join(__dirname, '..', 'koans');

    if (!fs.existsSync(koansDir)) {
      return [];
    }

    const files = fs.readdirSync(koansDir);

    return files
      .filter(f => f.endsWith('.js'))
      .map(f => f.replace('.js', ''))
      .sort();
  }

  /**
   * Executa todas as lições e retorna resumo
   */
  runAll() {
    const lessons = TestRunner.getAvailableLessons();
    const results = [];

    lessons.forEach(lesson => {
      try {
        const result = this.runLesson(lesson);
        results.push({
          lesson,
          title: result.title,
          passed: result.passed,
          total: result.total,
          success: true
        });
      } catch (error) {
        results.push({
          lesson,
          title: lesson,
          passed: 0,
          total: 0,
          success: false,
          error: error.message
        });
      }
    });

    return results;
  }

  /**
   * Obtém informações sobre um koan específico (para comando hint)
   */
  getKoanInfo(lessonFile, koanIndex) {
    const koanPath = path.join(__dirname, '..', 'koans', `${lessonFile}.js`);

    if (!fs.existsSync(koanPath)) {
      throw new Error(`Lesson not found: ${lessonFile}`);
    }

    const koanDefinition = require(koanPath);

    if (koanIndex < 0 || koanIndex >= koanDefinition.koans.length) {
      throw new Error(`Koan index out of range. Lesson has ${koanDefinition.koans.length} koans.`);
    }

    const koan = koanDefinition.koans[koanIndex];

    return {
      lessonTitle: koanDefinition.title,
      koanName: koan.name,
      hint: koan.hint || 'No hint available',
      expectedMessage: koan.expectedMessage || ''
    };
  }
}

module.exports = TestRunner;
