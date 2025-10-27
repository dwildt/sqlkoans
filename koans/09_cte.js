/**
 * Lição 09: Common Table Expressions (CTEs)
 * Aprenda a usar WITH para queries mais legíveis
 */

module.exports = {
  title: "09 - Common Table Expressions (CTEs)",
  description: "Aprenda a criar queries intermediárias com WITH",

  koans: [
    {
      id: 1,
      name: "CTE básica",
      queryIndex: 0,
      test: (result) => {
        return result.every(r => r.salary > 70000);
      },
      hint: "WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000) SELECT * FROM high_earners",
      expectedMessage: "Deve retornar funcionários com salário > 70000 usando CTE"
    },

    {
      id: 2,
      name: "Múltiplas CTEs",
      queryIndex: 1,
      test: (result) => {
        return result.every(r =>
          r.hasOwnProperty('name') &&
          r.hasOwnProperty('department')
        );
      },
      hint: "WITH cte1 AS (...), cte2 AS (...) SELECT ...",
      expectedMessage: "Deve usar duas CTEs para combinar dados"
    },

    {
      id: 3,
      name: "CTE com agregação",
      queryIndex: 2,
      test: (result) => {
        return result.every(r =>
          r.hasOwnProperty('department') &&
          r.hasOwnProperty('avg_salary') &&
          r.hasOwnProperty('max_salary')
        );
      },
      hint: "WITH dept_stats AS (SELECT department, AVG(salary), MAX(salary) ... GROUP BY department)",
      expectedMessage: "Deve retornar estatísticas salariais por departamento usando CTE"
    },

    {
      id: 4,
      name: "CTE referenciando outra CTE",
      queryIndex: 3,
      test: (result) => {
        return result.every(r =>
          r.hasOwnProperty('name') &&
          r.hasOwnProperty('department')
        );
      },
      hint: "WITH cte1 AS (...), cte2 AS (SELECT * FROM cte1 WHERE ...) SELECT * FROM cte2",
      expectedMessage: "Deve criar CTE que usa outra CTE"
    },

    {
      id: 5,
      name: "CTE vs Subquery - legibilidade",
      queryIndex: 4,
      test: (result) => {
        // Funcionários acima da média de seu departamento
        return result.every(r =>
          r.hasOwnProperty('name') &&
          r.hasOwnProperty('salary') &&
          r.hasOwnProperty('dept_avg')
        );
      },
      hint: "WITH dept_averages AS (GROUP BY department) SELECT e.*, da.avg_salary FROM employees e JOIN dept_averages da",
      expectedMessage: "Deve mostrar funcionários com a média de seu departamento"
    },

    {
      id: 6,
      name: "CTE com JOIN complexo",
      queryIndex: 5,
      test: (result) => {
        return result.every(r =>
          r.hasOwnProperty('employee_name') &&
          r.hasOwnProperty('total_hours') &&
          r.hasOwnProperty('project_count')
        );
      },
      hint: "WITH employee_workload AS (JOIN e agregações) SELECT ...",
      expectedMessage: "Deve retornar carga de trabalho de cada funcionário (total de horas e número de projetos)"
    }
  ]
};
