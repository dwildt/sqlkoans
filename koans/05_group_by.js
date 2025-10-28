/**
 * Lição 05: GROUP BY e HAVING
 * Aprenda a agrupar dados e filtrar grupos
 */

module.exports = (lang = 'en') => {
  const translations = {
    en: {
      title: "05 - GROUP BY and HAVING",
      description: "Learn to group data and apply filters on groups",
      koans: [
        {
          id: 1,
          name: "Count employees by department",
          queryIndex: 0,
          test: (result) => {
            return result.length === 4 &&
                   result.every(r => r.hasOwnProperty('department') && r.hasOwnProperty('count'));
          },
          hint: "Use SELECT department, COUNT(*) AS count FROM employees GROUP BY department",
          expectedMessage: "Should return 4 departments with their counts"
        },

        {
          id: 2,
          name: "Calculate average salary by department",
          queryIndex: 1,
          test: (result) => {
            return result.length === 4 &&
                   result.every(r => r.hasOwnProperty('department') && r.hasOwnProperty('avg_salary'));
          },
          hint: "Use GROUP BY department with AVG(salary)",
          expectedMessage: "Should return 4 departments with their average salaries"
        },

        {
          id: 3,
          name: "Find departments with more than 3 employees",
          queryIndex: 2,
          test: (result) => {
            // IT tem 4 funcionários
            return result.length === 1 &&
                   result[0].department === 'IT' &&
                   result[0].count === 4;
          },
          hint: "Use GROUP BY with HAVING COUNT(*) > 3",
          expectedMessage: "Should return only IT (the only department with more than 3 employees)"
        },

        {
          id: 4,
          name: "Departments with average salary above 65000",
          queryIndex: 3,
          test: (result) => {
            return result.every(r => r.avg_salary > 65000) &&
                   result.some(r => r.department === 'IT');
          },
          hint: "Use GROUP BY with HAVING AVG(salary) > 65000",
          expectedMessage: "Should return departments with average salary > 65000"
        },

        {
          id: 5,
          name: "Total hours by project",
          queryIndex: 4,
          test: (result) => {
            return result.length === 9 &&
                   result.every(r => r.hasOwnProperty('project_id') && r.hasOwnProperty('total_hours'));
          },
          hint: "Use SELECT project_id, SUM(hours) AS total_hours FROM assignments GROUP BY project_id",
          expectedMessage: "Should return 9 projects with total allocated hours"
        },

        {
          id: 6,
          name: "Sort groups by aggregation",
          queryIndex: 5,
          test: (result) => {
            if (result.length !== 4) return false;

            // Verifica ordem decrescente de count
            for (let i = 1; i < result.length; i++) {
              if (result[i].count > result[i-1].count) {
                return false;
              }
            }

            // IT (4 funcionários) deve ser o primeiro
            return result[0].department === 'IT' && result[0].count === 4;
          },
          hint: "Use GROUP BY department with ORDER BY COUNT(*) DESC",
          expectedMessage: "Should return departments sorted by employee count (descending)"
        },

        {
          id: 7,
          name: "Combine WHERE with GROUP BY",
          queryIndex: 6,
          test: (result) => {
            // Apenas funcionários contratados em 2020 ou depois, agrupados por departamento
            return result.every(r => r.hasOwnProperty('department') && r.hasOwnProperty('count'));
          },
          hint: "Use WHERE hire_date >= '2020-01-01' with GROUP BY department",
          expectedMessage: "Should count employees hired since 2020, grouped by department"
        }
      ]
    },
    pt: {
      title: "05 - GROUP BY e HAVING",
      description: "Aprenda a agrupar dados e aplicar filtros em grupos",
      koans: [
        {
          id: 1,
          name: "Contar funcionários por departamento",
          queryIndex: 0,
          test: (result) => {
            return result.length === 4 &&
                   result.every(r => r.hasOwnProperty('department') && r.hasOwnProperty('count'));
          },
          hint: "Use SELECT department, COUNT(*) AS count FROM employees GROUP BY department",
          expectedMessage: "Deve retornar 4 departamentos com suas contagens"
        },

        {
          id: 2,
          name: "Calcular salário médio por departamento",
          queryIndex: 1,
          test: (result) => {
            return result.length === 4 &&
                   result.every(r => r.hasOwnProperty('department') && r.hasOwnProperty('avg_salary'));
          },
          hint: "Use GROUP BY department com AVG(salary)",
          expectedMessage: "Deve retornar 4 departamentos com seus salários médios"
        },

        {
          id: 3,
          name: "Encontrar departamentos com mais de 3 funcionários",
          queryIndex: 2,
          test: (result) => {
            // IT tem 4 funcionários
            return result.length === 1 &&
                   result[0].department === 'IT' &&
                   result[0].count === 4;
          },
          hint: "Use GROUP BY com HAVING COUNT(*) > 3",
          expectedMessage: "Deve retornar apenas IT (único departamento com mais de 3 funcionários)"
        },

        {
          id: 4,
          name: "Departamentos com salário médio acima de 65000",
          queryIndex: 3,
          test: (result) => {
            return result.every(r => r.avg_salary > 65000) &&
                   result.some(r => r.department === 'IT');
          },
          hint: "Use GROUP BY com HAVING AVG(salary) > 65000",
          expectedMessage: "Deve retornar departamentos com salário médio > 65000"
        },

        {
          id: 5,
          name: "Total de horas por projeto",
          queryIndex: 4,
          test: (result) => {
            return result.length === 9 &&
                   result.every(r => r.hasOwnProperty('project_id') && r.hasOwnProperty('total_hours'));
          },
          hint: "Use SELECT project_id, SUM(hours) AS total_hours FROM assignments GROUP BY project_id",
          expectedMessage: "Deve retornar 9 projetos com total de horas alocadas"
        },

        {
          id: 6,
          name: "Ordenar grupos por agregação",
          queryIndex: 5,
          test: (result) => {
            if (result.length !== 4) return false;

            // Verifica ordem decrescente de count
            for (let i = 1; i < result.length; i++) {
              if (result[i].count > result[i-1].count) {
                return false;
              }
            }

            // IT (4 funcionários) deve ser o primeiro
            return result[0].department === 'IT' && result[0].count === 4;
          },
          hint: "Use GROUP BY department com ORDER BY COUNT(*) DESC",
          expectedMessage: "Deve retornar departamentos ordenados por quantidade de funcionários (decrescente)"
        },

        {
          id: 7,
          name: "Combinar WHERE com GROUP BY",
          queryIndex: 6,
          test: (result) => {
            // Apenas funcionários contratados em 2020 ou depois, agrupados por departamento
            return result.every(r => r.hasOwnProperty('department') && r.hasOwnProperty('count'));
          },
          hint: "Use WHERE hire_date >= '2020-01-01' com GROUP BY department",
          expectedMessage: "Deve contar funcionários contratados desde 2020, agrupados por departamento"
        }
      ]
    }
  };

  return translations[lang] || translations['en'];
};
