/**
 * Lição 10: Window Functions
 * Aprenda a usar funções de janela para análises avançadas
 */

module.exports = {
  title: "10 - Window Functions",
  description: "Aprenda funções de janela para análises avançadas",

  koans: [
    {
      id: 1,
      name: "ROW_NUMBER para numeração",
      queryIndex: 0,
      test: (result) => {
        return result.length === 12 &&
               result.every(r => r.hasOwnProperty('row_num')) &&
               result[0].row_num === 1;
      },
      hint: "SELECT name, ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num FROM employees",
      expectedMessage: "Deve numerar funcionários por salário decrescente"
    },

    {
      id: 2,
      name: "RANK para ranking com empates",
      queryIndex: 1,
      test: (result) => {
        return result.every(r =>
          r.hasOwnProperty('name') &&
          r.hasOwnProperty('salary') &&
          r.hasOwnProperty('rank')
        );
      },
      hint: "SELECT name, salary, RANK() OVER (ORDER BY salary DESC) AS rank",
      expectedMessage: "Deve rankear funcionários por salário (empates têm mesmo rank)"
    },

    {
      id: 3,
      name: "Particionar com PARTITION BY",
      queryIndex: 2,
      test: (result) => {
        return result.length === 12 &&
               result.every(r =>
                 r.hasOwnProperty('name') &&
                 r.hasOwnProperty('department') &&
                 r.hasOwnProperty('dept_rank')
               );
      },
      hint: "RANK() OVER (PARTITION BY department ORDER BY salary DESC)",
      expectedMessage: "Deve rankear funcionários dentro de cada departamento"
    },

    {
      id: 4,
      name: "Agregações com OVER",
      queryIndex: 3,
      test: (result) => {
        return result.every(r =>
          r.hasOwnProperty('name') &&
          r.hasOwnProperty('salary') &&
          r.hasOwnProperty('dept_avg')
        );
      },
      hint: "SELECT name, salary, AVG(salary) OVER (PARTITION BY department) AS dept_avg",
      expectedMessage: "Deve mostrar cada funcionário com a média do seu departamento"
    },

    {
      id: 5,
      name: "LAG para valor anterior",
      queryIndex: 4,
      test: (result) => {
        return result.every(r =>
          r.hasOwnProperty('name') &&
          r.hasOwnProperty('hire_date') &&
          r.hasOwnProperty('prev_hire_date')
        );
      },
      hint: "SELECT name, hire_date, LAG(hire_date) OVER (ORDER BY hire_date) AS prev_hire_date",
      expectedMessage: "Deve mostrar cada funcionário com a data de contratação do anterior"
    },

    {
      id: 6,
      name: "Combinar múltiplas window functions",
      queryIndex: 5,
      test: (result) => {
        return result.every(r =>
          r.hasOwnProperty('name') &&
          r.hasOwnProperty('department') &&
          r.hasOwnProperty('dept_rank') &&
          r.hasOwnProperty('overall_rank')
        );
      },
      hint: "Use RANK() OVER (PARTITION BY department) e RANK() OVER (ORDER BY salary) na mesma query",
      expectedMessage: "Deve mostrar rank por departamento e rank geral de cada funcionário"
    }
  ]
};
