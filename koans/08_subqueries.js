/**
 * Lição 08: Subqueries
 * Aprenda a usar queries dentro de queries
 */

module.exports = (lang = 'en') => {
  const translations = {
    en: {
      title: "08 - Subqueries",
      description: "Learn to use nested queries",
      koans: [
        {
          id: 1,
          name: "Subquery in WHERE with single value",
          queryIndex: 0,
          test: (result) => {
            return result.every(r => r.salary === 85000);
          },
          hint: "WHERE salary = (SELECT MAX(salary) FROM employees)",
          expectedMessage: "Should return employee(s) with the highest salary"
        },

        {
          id: 2,
          name: "Subquery with IN",
          queryIndex: 1,
          test: (result) => {
            // Funcionários alocados em projetos do IT (department_id = 1)
            return result.every(r => r.hasOwnProperty('name'));
          },
          hint: "WHERE id IN (SELECT employee_id FROM assignments WHERE project_id IN (...))",
          expectedMessage: "Should return employees assigned to IT department projects"
        },

        {
          id: 3,
          name: "Subquery in SELECT",
          queryIndex: 2,
          test: (result) => {
            return result.length === 12 &&
                   result.every(r =>
                     r.hasOwnProperty('name') &&
                     r.hasOwnProperty('salary') &&
                     r.hasOwnProperty('avg_salary')
                   );
          },
          hint: "SELECT name, salary, (SELECT AVG(salary) FROM employees) AS avg_salary",
          expectedMessage: "Should return each employee with their salary and the overall average"
        },

        {
          id: 4,
          name: "Subquery in FROM (derived table)",
          queryIndex: 3,
          test: (result) => {
            return result.every(r =>
              r.hasOwnProperty('department') &&
              r.avg_salary > 65000
            );
          },
          hint: "SELECT * FROM (SELECT department, AVG(salary) AS avg_salary ... GROUP BY department) WHERE avg_salary > 65000",
          expectedMessage: "Should use subquery in FROM to filter departments by average salary"
        },

        {
          id: 5,
          name: "EXISTS to check existence",
          queryIndex: 4,
          test: (result) => {
            // Funcionários que estão alocados em pelo menos um projeto
            return result.every(r => r.hasOwnProperty('name'));
          },
          hint: "WHERE EXISTS (SELECT 1 FROM assignments WHERE assignments.employee_id = employees.id)",
          expectedMessage: "Should return employees who are assigned to at least one project"
        },

        {
          id: 6,
          name: "Correlated subquery",
          queryIndex: 5,
          test: (result) => {
            // Funcionários com salário acima da média do seu departamento
            return result.every(r =>
              r.hasOwnProperty('name') &&
              r.hasOwnProperty('department') &&
              r.hasOwnProperty('salary')
            );
          },
          hint: "WHERE salary > (SELECT AVG(salary) FROM employees e2 WHERE e2.department = e1.department)",
          expectedMessage: "Should return employees with salary above their department's average"
        }
      ]
    },
    pt: {
      title: "08 - Subqueries",
      description: "Aprenda a usar queries aninhadas",
      koans: [
        {
          id: 1,
          name: "Subquery no WHERE com valor único",
          queryIndex: 0,
          test: (result) => {
            return result.every(r => r.salary === 85000);
          },
          hint: "WHERE salary = (SELECT MAX(salary) FROM employees)",
          expectedMessage: "Deve retornar funcionário(s) com o maior salário"
        },

        {
          id: 2,
          name: "Subquery com IN",
          queryIndex: 1,
          test: (result) => {
            // Funcionários alocados em projetos do IT (department_id = 1)
            return result.every(r => r.hasOwnProperty('name'));
          },
          hint: "WHERE id IN (SELECT employee_id FROM assignments WHERE project_id IN (...))",
          expectedMessage: "Deve retornar funcionários alocados em projetos do departamento IT"
        },

        {
          id: 3,
          name: "Subquery no SELECT",
          queryIndex: 2,
          test: (result) => {
            return result.length === 12 &&
                   result.every(r =>
                     r.hasOwnProperty('name') &&
                     r.hasOwnProperty('salary') &&
                     r.hasOwnProperty('avg_salary')
                   );
          },
          hint: "SELECT name, salary, (SELECT AVG(salary) FROM employees) AS avg_salary",
          expectedMessage: "Deve retornar cada funcionário com seu salário e a média geral"
        },

        {
          id: 4,
          name: "Subquery no FROM (derived table)",
          queryIndex: 3,
          test: (result) => {
            return result.every(r =>
              r.hasOwnProperty('department') &&
              r.avg_salary > 65000
            );
          },
          hint: "SELECT * FROM (SELECT department, AVG(salary) AS avg_salary ... GROUP BY department) WHERE avg_salary > 65000",
          expectedMessage: "Deve usar subquery no FROM para filtrar departamentos por média salarial"
        },

        {
          id: 5,
          name: "EXISTS para verificar existência",
          queryIndex: 4,
          test: (result) => {
            // Funcionários que estão alocados em pelo menos um projeto
            return result.every(r => r.hasOwnProperty('name'));
          },
          hint: "WHERE EXISTS (SELECT 1 FROM assignments WHERE assignments.employee_id = employees.id)",
          expectedMessage: "Deve retornar funcionários que estão alocados em algum projeto"
        },

        {
          id: 6,
          name: "Subquery correlacionada",
          queryIndex: 5,
          test: (result) => {
            // Funcionários com salário acima da média do seu departamento
            return result.every(r =>
              r.hasOwnProperty('name') &&
              r.hasOwnProperty('department') &&
              r.hasOwnProperty('salary')
            );
          },
          hint: "WHERE salary > (SELECT AVG(salary) FROM employees e2 WHERE e2.department = e1.department)",
          expectedMessage: "Deve retornar funcionários com salário acima da média de seu departamento"
        }
      ]
    }
  };

  return translations[lang] || translations['en'];
};
