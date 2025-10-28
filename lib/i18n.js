/**
 * Internationalization (i18n) module
 * Supports English (en) and Portuguese (pt)
 */

const translations = {
  en: {
    // UI Messages
    header: '🧘 SQL Koans - Path to Enlightenment',
    progress: 'Progress',
    koansCompleted: 'koans completed',
    enlightenmentAchieved: '✨ Enlightenment achieved! All koans completed! ✨',
    notStarted: 'You have not yet started your journey. Begin by writing your first query!',
    keepGoing: 'Keep going! Every journey begins with a single step. 🚀',
    goodProgress: 'Good progress! You\'re on the path to mastery. 💪',
    excellentWork: 'Excellent work! You\'re almost there! 🎯',
    lessonCompleted: 'Enlightenment achieved! Lesson {0} completed!',
    allKoansPassed: 'All {0} koans passed! 🎉',
    keepGoingLesson: 'Keep going! Fix the remaining koans to complete this lesson.',
    error: 'Error',
    next: 'Next',
    hint: 'Hint',
    noQueryFound: 'No query found. Write your SQL in the corresponding file.',
    sqlError: 'SQL Error',
    lessonNotFound: 'Lesson {0} not found',
    failedToRun: 'Failed to run lesson: {0}',
    summary: '📊 Summary of All Lessons:',
    koanDetails: '📖 Koan Details',
    lesson: 'Lesson',
    koan: 'Koan',
    expected: 'Expected',
    continueWith: 'Continue with {0}',
    tryLesson: 'Try lesson {0}',

    // Help text
    helpUsage: 'Usage',
    helpExamples: 'Examples',
    helpRunAll: 'Run all koans',
    helpRunSpecific: 'Run specific lesson (e.g., npm test 01)',
    helpProgress: 'Show overall progress',
    helpHint: 'Show hint for specific koan',
    helpLanguage: 'Set language (en or pt)',
    helpToGetStarted: 'To get started',
    helpStep1: 'Open sql/01_select_basics.sql',
    helpStep2: 'Write your SQL queries',
    helpStep3: 'Run: npm test 01',
    helpStep4: 'Fix any failures and repeat!',
    helpLearnMore: 'Learn more',
    helpDescription: 'SQL Koans - Learn SQL through practice',

    // Error messages
    invalidLessonNumber: 'Invalid lesson number: {0}',
    pleaseSpecifyLesson: 'Please specify lesson number: npm run hint <lesson> <koan>',
    unexpectedError: 'Unexpected error: {0}',
    failedToInitialize: 'Failed to initialize database: {0}',
    koanFileNotFound: 'Koan file not found: {0}',
    sqlFileNotFound: 'SQL file not found: {0}',
    lessonNotFoundError: 'Lesson not found: {0}',
    koanIndexOutOfRange: 'Koan index out of range. Lesson has {0} koans.',
    noHintAvailable: 'No hint available'
  },

  pt: {
    // UI Messages
    header: '🧘 SQL Koans - Caminho para a Iluminação',
    progress: 'Progresso',
    koansCompleted: 'koans completados',
    enlightenmentAchieved: '✨ Iluminação alcançada! Todos os koans completados! ✨',
    notStarted: 'Você ainda não começou sua jornada. Comece escrevendo sua primeira query!',
    keepGoing: 'Continue! Toda jornada começa com um único passo. 🚀',
    goodProgress: 'Bom progresso! Você está no caminho da maestria. 💪',
    excellentWork: 'Excelente trabalho! Você está quase lá! 🎯',
    lessonCompleted: 'Iluminação alcançada! Lição {0} completada!',
    allKoansPassed: 'Todos os {0} koans passaram! 🎉',
    keepGoingLesson: 'Continue! Corrija os koans restantes para completar esta lição.',
    error: 'Erro',
    next: 'Próximo',
    hint: 'Dica',
    noQueryFound: 'Nenhuma query encontrada. Escreva seu SQL no arquivo correspondente.',
    sqlError: 'Erro de SQL',
    lessonNotFound: 'Lição {0} não encontrada',
    failedToRun: 'Falha ao executar lição: {0}',
    summary: '📊 Resumo de Todas as Lições:',
    koanDetails: '📖 Detalhes do Koan',
    lesson: 'Lição',
    koan: 'Koan',
    expected: 'Esperado',
    continueWith: 'Continue com {0}',
    tryLesson: 'Tente a lição {0}',

    // Help text
    helpUsage: 'Uso',
    helpExamples: 'Exemplos',
    helpRunAll: 'Executar todos os koans',
    helpRunSpecific: 'Executar lição específica (ex: npm test 01)',
    helpProgress: 'Mostrar progresso geral',
    helpHint: 'Mostrar dica para koan específico',
    helpLanguage: 'Definir idioma (en ou pt)',
    helpToGetStarted: 'Para começar',
    helpStep1: 'Abra sql/01_select_basics.sql',
    helpStep2: 'Escreva suas queries SQL',
    helpStep3: 'Execute: npm test 01',
    helpStep4: 'Corrija as falhas e repita!',
    helpLearnMore: 'Saiba mais',
    helpDescription: 'SQL Koans - Aprenda SQL através da prática',

    // Error messages
    invalidLessonNumber: 'Número de lição inválido: {0}',
    pleaseSpecifyLesson: 'Por favor especifique o número da lição: npm run hint <lição> <koan>',
    unexpectedError: 'Erro inesperado: {0}',
    failedToInitialize: 'Falha ao inicializar o banco de dados: {0}',
    koanFileNotFound: 'Arquivo de koan não encontrado: {0}',
    sqlFileNotFound: 'Arquivo SQL não encontrado: {0}',
    lessonNotFoundError: 'Lição não encontrada: {0}',
    koanIndexOutOfRange: 'Índice de koan fora do intervalo. Lição tem {0} koans.',
    noHintAvailable: 'Nenhuma dica disponível'
  }
};

/**
 * Get translation for a key in the specified language
 * @param {string} key - Translation key
 * @param {string} lang - Language code (en or pt)
 * @param {Array} params - Optional parameters to substitute {0}, {1}, etc.
 * @returns {string} Translated string
 */
function t(key, lang = 'en', ...params) {
  const langDict = translations[lang] || translations['en'];
  let text = langDict[key] || translations['en'][key] || key;

  // Replace {0}, {1}, etc. with parameters
  params.forEach((param, index) => {
    text = text.replace(`{${index}}`, param);
  });

  return text;
}

/**
 * Get all translations for a language
 * @param {string} lang - Language code (en or pt)
 * @returns {Object} Translation dictionary
 */
function getTranslations(lang = 'en') {
  return translations[lang] || translations['en'];
}

/**
 * Check if a language is supported
 * @param {string} lang - Language code
 * @returns {boolean}
 */
function isSupported(lang) {
  return translations.hasOwnProperty(lang);
}

/**
 * Get list of supported languages
 * @returns {Array<string>}
 */
function getSupportedLanguages() {
  return Object.keys(translations);
}

module.exports = {
  t,
  getTranslations,
  isSupported,
  getSupportedLanguages,
  translations
};
