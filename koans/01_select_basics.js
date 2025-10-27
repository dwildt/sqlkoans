/**
 * Lição 01: SELECT Básico
 * Aprenda a selecionar dados de uma tabela
 */

module.exports = {
  title: "01 - SELECT Básico",
  description: "Aprenda a selecionar dados de uma tabela",

  koans: [
    {
      id: 1,
      name: "Selecionar todos os funcionários",
      queryIndex: 0,
      test: (result) => {
        return result.length === 12 &&
               result[0].hasOwnProperty('id') &&
               result[0].hasOwnProperty('name') &&
               result[0].hasOwnProperty('department') &&
               result[0].hasOwnProperty('salary');
      },
      hint: "Use SELECT * FROM employees",
      expectedMessage: "Deve retornar 12 funcionários com todas as colunas"
    },

    {
      id: 2,
      name: "Selecionar apenas nome e salário",
      queryIndex: 1,
      test: (result) => {
        return result.length === 12 &&
               Object.keys(result[0]).length === 2 &&
               result[0].hasOwnProperty('name') &&
               result[0].hasOwnProperty('salary');
      },
      hint: "Use SELECT name, salary FROM employees",
      expectedMessage: "Deve retornar 12 funcionários com apenas 2 colunas: name e salary"
    },

    {
      id: 3,
      name: "Departamentos únicos",
      queryIndex: 2,
      test: (result) => {
        const uniqueDepts = new Set(result.map(r => r.department));
        return result.length === 4 &&
               uniqueDepts.size === 4 &&
               result[0].hasOwnProperty('department');
      },
      hint: "Use SELECT DISTINCT department FROM employees",
      expectedMessage: "Deve retornar 4 departamentos únicos"
    },

    {
      id: 4,
      name: "Usar alias para renomear coluna",
      queryIndex: 3,
      test: (result) => {
        return result.length === 12 &&
               result[0].hasOwnProperty('employee_name') &&
               result[0].hasOwnProperty('annual_salary') &&
               Object.keys(result[0]).length === 2;
      },
      hint: "Use SELECT name AS employee_name, salary AS annual_salary FROM employees",
      expectedMessage: "Deve retornar 12 funcionários com colunas renomeadas para 'employee_name' e 'annual_salary'"
    },

    {
      id: 5,
      name: "Selecionar um valor específico de todos",
      queryIndex: 4,
      test: (result) => {
        return result.length === 12 &&
               Object.keys(result[0]).length === 1 &&
               result[0].hasOwnProperty('department');
      },
      hint: "Use SELECT department FROM employees",
      expectedMessage: "Deve retornar apenas a coluna 'department' de todos os funcionários"
    }
  ]
};
