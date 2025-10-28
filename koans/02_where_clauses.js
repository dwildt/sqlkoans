/**
 * Lição 02: WHERE Clauses
 * Aprenda a filtrar dados com diferentes condições
 */

module.exports = (lang = 'en') => {
  const translations = {
    en: {
      title: "02 - WHERE Clauses",
      description: "Learn to filter data with conditions",
      koans: [
        {
          id: 1,
          name: "Filter by specific department",
          queryIndex: 0,
          test: (result) => {
            return result.length === 4 &&
                   result.every(r => r.department === 'IT');
          },
          hint: "Use WHERE department = 'IT'",
          expectedMessage: "Should return 4 employees from IT department"
        },

        {
          id: 2,
          name: "Filter by salary greater than value",
          queryIndex: 1,
          test: (result) => {
            return result.length === 5 &&
                   result.every(r => r.salary > 65000);
          },
          hint: "Use WHERE salary > 65000",
          expectedMessage: "Should return 5 employees with salary greater than 65000"
        },

        {
          id: 3,
          name: "Filter using BETWEEN",
          queryIndex: 2,
          test: (result) => {
            return result.length === 6 &&
                   result.every(r => r.salary >= 60000 && r.salary <= 70000);
          },
          hint: "Use WHERE salary BETWEEN 60000 AND 70000",
          expectedMessage: "Should return 6 employees with salary between 60000 and 70000"
        },

        {
          id: 4,
          name: "Filter using IN with multiple values",
          queryIndex: 3,
          test: (result) => {
            const depts = result.map(r => r.department);
            return result.length === 7 &&
                   result.every(r => r.department === 'Sales' || r.department === 'IT');
          },
          hint: "Use WHERE department IN ('IT', 'Sales')",
          expectedMessage: "Should return 7 employees from IT or Sales"
        },

        {
          id: 5,
          name: "Filter using LIKE for patterns",
          queryIndex: 4,
          test: (result) => {
            return result.length > 0 &&
                   result.every(r => r.name.includes('Silva') || r.name.includes('Santos') || r.name.includes('Souza'));
          },
          hint: "Use WHERE name LIKE '%S%' for names containing 'S'",
          expectedMessage: "Should return employees whose name contains 'S'"
        },

        {
          id: 6,
          name: "Filter using AND for multiple conditions",
          queryIndex: 5,
          test: (result) => {
            return result.length === 2 &&
                   result.every(r => r.department === 'IT' && r.salary > 70000);
          },
          hint: "Use WHERE department = 'IT' AND salary > 70000",
          expectedMessage: "Should return 2 IT employees with salary greater than 70000"
        },

        {
          id: 7,
          name: "Filter using OR",
          queryIndex: 6,
          test: (result) => {
            return result.every(r => r.salary > 80000 || r.department === 'HR');
          },
          hint: "Use WHERE salary > 80000 OR department = 'HR'",
          expectedMessage: "Should return employees with salary > 80000 OR from HR department"
        }
      ]
    },
    pt: {
      title: "02 - WHERE Clauses",
      description: "Aprenda a filtrar dados com condições",
      koans: [
        {
          id: 1,
          name: "Filtrar por departamento específico",
          queryIndex: 0,
          test: (result) => {
            return result.length === 4 &&
                   result.every(r => r.department === 'IT');
          },
          hint: "Use WHERE department = 'IT'",
          expectedMessage: "Deve retornar 4 funcionários do departamento IT"
        },

        {
          id: 2,
          name: "Filtrar por salário maior que valor",
          queryIndex: 1,
          test: (result) => {
            return result.length === 5 &&
                   result.every(r => r.salary > 65000);
          },
          hint: "Use WHERE salary > 65000",
          expectedMessage: "Deve retornar 5 funcionários com salário maior que 65000"
        },

        {
          id: 3,
          name: "Filtrar usando BETWEEN",
          queryIndex: 2,
          test: (result) => {
            return result.length === 6 &&
                   result.every(r => r.salary >= 60000 && r.salary <= 70000);
          },
          hint: "Use WHERE salary BETWEEN 60000 AND 70000",
          expectedMessage: "Deve retornar 6 funcionários com salário entre 60000 e 70000"
        },

        {
          id: 4,
          name: "Filtrar usando IN com múltiplos valores",
          queryIndex: 3,
          test: (result) => {
            const depts = result.map(r => r.department);
            return result.length === 7 &&
                   result.every(r => r.department === 'Sales' || r.department === 'IT');
          },
          hint: "Use WHERE department IN ('IT', 'Sales')",
          expectedMessage: "Deve retornar 7 funcionários de IT ou Sales"
        },

        {
          id: 5,
          name: "Filtrar usando LIKE para padrões",
          queryIndex: 4,
          test: (result) => {
            return result.length > 0 &&
                   result.every(r => r.name.includes('Silva') || r.name.includes('Santos') || r.name.includes('Souza'));
          },
          hint: "Use WHERE name LIKE '%S%' para nomes contendo 'S'",
          expectedMessage: "Deve retornar funcionários cujo nome contém 'S'"
        },

        {
          id: 6,
          name: "Filtrar usando AND para múltiplas condições",
          queryIndex: 5,
          test: (result) => {
            return result.length === 2 &&
                   result.every(r => r.department === 'IT' && r.salary > 70000);
          },
          hint: "Use WHERE department = 'IT' AND salary > 70000",
          expectedMessage: "Deve retornar 2 funcionários do IT com salário maior que 70000"
        },

        {
          id: 7,
          name: "Filtrar usando OR",
          queryIndex: 6,
          test: (result) => {
            return result.every(r => r.salary > 80000 || r.department === 'HR');
          },
          hint: "Use WHERE salary > 80000 OR department = 'HR'",
          expectedMessage: "Deve retornar funcionários com salário > 80000 OU do departamento HR"
        }
      ]
    }
  };

  return translations[lang] || translations['en'];
};
