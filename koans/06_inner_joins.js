/**
 * Lição 06: INNER JOIN
 * Aprenda a relacionar dados de múltiplas tabelas
 */

module.exports = (lang = 'en') => {
  const translations = {
    en: {
      title: "06 - INNER JOIN",
      description: "Learn to combine data from multiple tables",
      koans: [
        {
          id: 1,
          name: "Basic JOIN between employees and assignments",
          queryIndex: 0,
          test: (result) => {
            return result.length === 21 && // Total de assignments
                   result.every(r => r.hasOwnProperty('name') && r.hasOwnProperty('project_id'));
          },
          hint: "Use INNER JOIN assignments ON employees.id = assignments.employee_id",
          expectedMessage: "Should return 21 rows (employee assignments to projects)"
        },

        {
          id: 2,
          name: "JOIN with three tables",
          queryIndex: 1,
          test: (result) => {
            return result.length === 21 &&
                   result.every(r =>
                     r.hasOwnProperty('employee_name') &&
                     r.hasOwnProperty('project_name') &&
                     r.hasOwnProperty('hours')
                   );
          },
          hint: "JOIN employees, assignments and projects using appropriate foreign keys",
          expectedMessage: "Should return employee name, project name and allocated hours"
        },

        {
          id: 3,
          name: "JOIN with WHERE filter",
          queryIndex: 2,
          test: (result) => {
            return result.every(r => r.hours >= 30);
          },
          hint: "JOIN employees and assignments, then filter with WHERE hours >= 30",
          expectedMessage: "Should return only assignments with 30 or more hours"
        },

        {
          id: 4,
          name: "JOIN projects with departments",
          queryIndex: 3,
          test: (result) => {
            return result.length === 9 &&
                   result.every(r =>
                     r.hasOwnProperty('project_name') &&
                     r.hasOwnProperty('department_name')
                   );
          },
          hint: "JOIN projects with departments using department_id",
          expectedMessage: "Should return projects with their respective department names"
        },

        {
          id: 5,
          name: "Use table aliases",
          queryIndex: 4,
          test: (result) => {
            return result.every(r =>
              r.hasOwnProperty('employee') &&
              r.hasOwnProperty('manager')
            );
          },
          hint: "Self-join on employees: SELECT e1.name AS employee, e2.name AS manager FROM employees e1 JOIN employees e2 ON e1.manager_id = e2.id",
          expectedMessage: "Should return employees and their managers (self-join)"
        },

        {
          id: 6,
          name: "Aggregation with JOIN",
          queryIndex: 5,
          test: (result) => {
            return result.every(r =>
              r.hasOwnProperty('project_name') &&
              r.hasOwnProperty('employee_count')
            );
          },
          hint: "JOIN projects with assignments, then GROUP BY project_name and COUNT employees",
          expectedMessage: "Should return each project with number of allocated employees"
        }
      ]
    },
    pt: {
      title: "06 - INNER JOIN",
      description: "Aprenda a combinar dados de múltiplas tabelas",
      koans: [
        {
          id: 1,
          name: "JOIN básico entre employees e assignments",
          queryIndex: 0,
          test: (result) => {
            return result.length === 21 && // Total de assignments
                   result.every(r => r.hasOwnProperty('name') && r.hasOwnProperty('project_id'));
          },
          hint: "Use INNER JOIN assignments ON employees.id = assignments.employee_id",
          expectedMessage: "Deve retornar 21 linhas (alocações de funcionários em projetos)"
        },

        {
          id: 2,
          name: "JOIN com três tabelas",
          queryIndex: 1,
          test: (result) => {
            return result.length === 21 &&
                   result.every(r =>
                     r.hasOwnProperty('employee_name') &&
                     r.hasOwnProperty('project_name') &&
                     r.hasOwnProperty('hours')
                   );
          },
          hint: "JOIN employees, assignments e projects usando as chaves estrangeiras apropriadas",
          expectedMessage: "Deve retornar nome do funcionário, nome do projeto e horas alocadas"
        },

        {
          id: 3,
          name: "JOIN com filtro WHERE",
          queryIndex: 2,
          test: (result) => {
            return result.every(r => r.hours >= 30);
          },
          hint: "JOIN employees e assignments, depois filtre com WHERE hours >= 30",
          expectedMessage: "Deve retornar apenas alocações com 30 ou mais horas"
        },

        {
          id: 4,
          name: "JOIN projects com departments",
          queryIndex: 3,
          test: (result) => {
            return result.length === 9 &&
                   result.every(r =>
                     r.hasOwnProperty('project_name') &&
                     r.hasOwnProperty('department_name')
                   );
          },
          hint: "JOIN projects com departments usando department_id",
          expectedMessage: "Deve retornar projetos com seus respectivos nomes de departamento"
        },

        {
          id: 5,
          name: "Usar alias de tabelas",
          queryIndex: 4,
          test: (result) => {
            return result.every(r =>
              r.hasOwnProperty('employee') &&
              r.hasOwnProperty('manager')
            );
          },
          hint: "Self-join em employees: SELECT e1.name AS employee, e2.name AS manager FROM employees e1 JOIN employees e2 ON e1.manager_id = e2.id",
          expectedMessage: "Deve retornar funcionários e seus gerentes (self-join)"
        },

        {
          id: 6,
          name: "Agregação com JOIN",
          queryIndex: 5,
          test: (result) => {
            return result.every(r =>
              r.hasOwnProperty('project_name') &&
              r.hasOwnProperty('employee_count')
            );
          },
          hint: "JOIN projects com assignments, depois GROUP BY project_name e COUNT funcionários",
          expectedMessage: "Deve retornar cada projeto com número de funcionários alocados"
        }
      ]
    }
  };

  return translations[lang] || translations['en'];
};
