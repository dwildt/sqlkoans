/**
 * Lição 03: ORDER BY e LIMIT
 * Aprenda a ordenar e limitar resultados
 */

module.exports = (lang = 'en') => {
  const translations = {
    en: {
      title: "03 - ORDER BY and LIMIT",
      description: "Learn to sort and limit results",
      koans: [
        {
          id: 1,
          name: "Sort by salary ascending",
          queryIndex: 0,
          test: (result) => {
            if (result.length !== 12) return false;

            // Verifica se está em ordem crescente
            for (let i = 1; i < result.length; i++) {
              if (result[i].salary < result[i-1].salary) {
                return false;
              }
            }
            return true;
          },
          hint: "Use ORDER BY salary ASC (or just ORDER BY salary)",
          expectedMessage: "Should return 12 employees sorted by salary ascending"
        },

        {
          id: 2,
          name: "Sort by salary descending",
          queryIndex: 1,
          test: (result) => {
            if (result.length !== 12) return false;

            // Verifica se está em ordem decrescente
            for (let i = 1; i < result.length; i++) {
              if (result[i].salary > result[i-1].salary) {
                return false;
              }
            }
            return true;
          },
          hint: "Use ORDER BY salary DESC",
          expectedMessage: "Should return 12 employees sorted by salary descending"
        },

        {
          id: 3,
          name: "Limit to 5 results",
          queryIndex: 2,
          test: (result) => {
            return result.length === 5;
          },
          hint: "Use LIMIT 5",
          expectedMessage: "Should return only the first 5 employees"
        },

        {
          id: 4,
          name: "Top 3 highest salaries",
          queryIndex: 3,
          test: (result) => {
            if (result.length !== 3) return false;

            // Verifica ordem decrescente
            for (let i = 1; i < result.length; i++) {
              if (result[i].salary > result[i-1].salary) {
                return false;
              }
            }

            // Primeiro deve ser o maior salário (Alice com 85000)
            return result[0].salary === 85000;
          },
          hint: "Combine ORDER BY salary DESC with LIMIT 3",
          expectedMessage: "Should return the 3 employees with highest salaries"
        },

        {
          id: 5,
          name: "Sort by multiple columns",
          queryIndex: 4,
          test: (result) => {
            if (result.length !== 12) return false;

            // Verifica se está ordenado por department, depois por salary
            for (let i = 1; i < result.length; i++) {
              if (result[i].department < result[i-1].department) {
                return false;
              }
              // Dentro do mesmo departamento, deve estar ordenado por salary
              if (result[i].department === result[i-1].department) {
                if (result[i].salary > result[i-1].salary) {
                  return false;
                }
              }
            }
            return true;
          },
          hint: "Use ORDER BY department ASC, salary DESC",
          expectedMessage: "Should sort by department and, within each department, by salary descending"
        },

        {
          id: 6,
          name: "Pagination with LIMIT and OFFSET",
          queryIndex: 5,
          test: (result) => {
            // Pega os 5 próximos depois de pular os primeiros 5
            // Assumindo ordem por id, deve pegar ids 6-10
            return result.length === 5 &&
                   result[0].id === 6;
          },
          hint: "Use ORDER BY id LIMIT 5 OFFSET 5",
          expectedMessage: "Should return 5 employees skipping the first 5"
        }
      ]
    },
    pt: {
      title: "03 - ORDER BY e LIMIT",
      description: "Aprenda a ordenar e limitar resultados",
      koans: [
        {
          id: 1,
          name: "Ordenar por salário crescente",
          queryIndex: 0,
          test: (result) => {
            if (result.length !== 12) return false;

            // Verifica se está em ordem crescente
            for (let i = 1; i < result.length; i++) {
              if (result[i].salary < result[i-1].salary) {
                return false;
              }
            }
            return true;
          },
          hint: "Use ORDER BY salary ASC (ou apenas ORDER BY salary)",
          expectedMessage: "Deve retornar 12 funcionários ordenados por salário crescente"
        },

        {
          id: 2,
          name: "Ordenar por salário decrescente",
          queryIndex: 1,
          test: (result) => {
            if (result.length !== 12) return false;

            // Verifica se está em ordem decrescente
            for (let i = 1; i < result.length; i++) {
              if (result[i].salary > result[i-1].salary) {
                return false;
              }
            }
            return true;
          },
          hint: "Use ORDER BY salary DESC",
          expectedMessage: "Deve retornar 12 funcionários ordenados por salário decrescente"
        },

        {
          id: 3,
          name: "Limitar a 5 resultados",
          queryIndex: 2,
          test: (result) => {
            return result.length === 5;
          },
          hint: "Use LIMIT 5",
          expectedMessage: "Deve retornar apenas os primeiros 5 funcionários"
        },

        {
          id: 4,
          name: "Top 3 maiores salários",
          queryIndex: 3,
          test: (result) => {
            if (result.length !== 3) return false;

            // Verifica ordem decrescente
            for (let i = 1; i < result.length; i++) {
              if (result[i].salary > result[i-1].salary) {
                return false;
              }
            }

            // Primeiro deve ser o maior salário (Alice com 85000)
            return result[0].salary === 85000;
          },
          hint: "Combine ORDER BY salary DESC com LIMIT 3",
          expectedMessage: "Deve retornar os 3 funcionários com maiores salários"
        },

        {
          id: 5,
          name: "Ordenar por múltiplas colunas",
          queryIndex: 4,
          test: (result) => {
            if (result.length !== 12) return false;

            // Verifica se está ordenado por department, depois por salary
            for (let i = 1; i < result.length; i++) {
              if (result[i].department < result[i-1].department) {
                return false;
              }
              // Dentro do mesmo departamento, deve estar ordenado por salary
              if (result[i].department === result[i-1].department) {
                if (result[i].salary > result[i-1].salary) {
                  return false;
                }
              }
            }
            return true;
          },
          hint: "Use ORDER BY department ASC, salary DESC",
          expectedMessage: "Deve ordenar por departamento e, dentro de cada departamento, por salário decrescente"
        },

        {
          id: 6,
          name: "Paginação com LIMIT e OFFSET",
          queryIndex: 5,
          test: (result) => {
            // Pega os 5 próximos depois de pular os primeiros 5
            // Assumindo ordem por id, deve pegar ids 6-10
            return result.length === 5 &&
                   result[0].id === 6;
          },
          hint: "Use ORDER BY id LIMIT 5 OFFSET 5",
          expectedMessage: "Deve retornar 5 funcionários pulando os primeiros 5"
        }
      ]
    }
  };

  return translations[lang] || translations['en'];
};
