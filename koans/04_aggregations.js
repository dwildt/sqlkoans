/**
 * Lição 04: Funções de Agregação
 * Aprenda a usar COUNT, SUM, AVG, MIN, MAX
 */

module.exports = {
  title: "04 - Funções de Agregação",
  description: "Aprenda a calcular estatísticas sobre dados",

  koans: [
    {
      id: 1,
      name: "Contar total de funcionários",
      queryIndex: 0,
      test: (result) => {
        return result.length === 1 &&
               result[0].total === 12;
      },
      hint: "Use SELECT COUNT(*) AS total FROM employees",
      expectedMessage: "Deve retornar 12 (total de funcionários)"
    },

    {
      id: 2,
      name: "Calcular soma dos salários",
      queryIndex: 1,
      test: (result) => {
        return result.length === 1 &&
               result[0].total_salaries === 787000;
      },
      hint: "Use SELECT SUM(salary) AS total_salaries FROM employees",
      expectedMessage: "Deve retornar a soma de todos os salários (787000)"
    },

    {
      id: 3,
      name: "Calcular salário médio",
      queryIndex: 2,
      test: (result) => {
        const expected = 787000 / 12;
        return result.length === 1 &&
               Math.abs(result[0].avg_salary - expected) < 1;
      },
      hint: "Use SELECT AVG(salary) AS avg_salary FROM employees",
      expectedMessage: "Deve retornar a média salarial (~65583.33)"
    },

    {
      id: 4,
      name: "Encontrar menor e maior salário",
      queryIndex: 3,
      test: (result) => {
        return result.length === 1 &&
               result[0].min_salary === 52000 &&
               result[0].max_salary === 85000;
      },
      hint: "Use SELECT MIN(salary) AS min_salary, MAX(salary) AS max_salary FROM employees",
      expectedMessage: "Deve retornar o menor (52000) e maior (85000) salário"
    },

    {
      id: 5,
      name: "Contar funcionários de um departamento",
      queryIndex: 4,
      test: (result) => {
        return result.length === 1 &&
               result[0].it_count === 4;
      },
      hint: "Use WHERE department = 'IT' com COUNT(*)",
      expectedMessage: "Deve retornar 4 (funcionários do IT)"
    },

    {
      id: 6,
      name: "Contar valores distintos",
      queryIndex: 5,
      test: (result) => {
        return result.length === 1 &&
               result[0].dept_count === 4;
      },
      hint: "Use SELECT COUNT(DISTINCT department) AS dept_count FROM employees",
      expectedMessage: "Deve retornar 4 (departamentos únicos)"
    }
  ]
};
