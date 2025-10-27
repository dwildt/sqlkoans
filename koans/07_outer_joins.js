/**
 * Lição 07: OUTER JOINs
 * Aprenda LEFT JOIN, RIGHT JOIN e como preservar linhas não-matched
 */

module.exports = {
  title: "07 - OUTER JOINs",
  description: "Aprenda a preservar linhas não correspondidas",

  koans: [
    {
      id: 1,
      name: "LEFT JOIN para incluir todos os funcionários",
      queryIndex: 0,
      test: (result) => {
        return result.length === 12 && // Todos os funcionários
               result.every(r => r.hasOwnProperty('name'));
      },
      hint: "Use LEFT JOIN employees com assignments",
      expectedMessage: "Deve retornar todos os 12 funcionários, mesmo os sem alocações"
    },

    {
      id: 2,
      name: "Identificar funcionários sem alocações",
      queryIndex: 1,
      test: (result) => {
        return result.every(r => r.project_id === null);
      },
      hint: "LEFT JOIN e filtre WHERE assignments.project_id IS NULL",
      expectedMessage: "Deve retornar funcionários que não estão alocados em nenhum projeto"
    },

    {
      id: 3,
      name: "LEFT JOIN com contagem",
      queryIndex: 2,
      test: (result) => {
        return result.length === 12 &&
               result.every(r =>
                 r.hasOwnProperty('name') &&
                 r.hasOwnProperty('project_count')
               );
      },
      hint: "LEFT JOIN e COUNT(assignments.project_id) para contar projetos por funcionário",
      expectedMessage: "Deve retornar cada funcionário com número de projetos (0 se nenhum)"
    },

    {
      id: 4,
      name: "Projetos sem funcionários alocados",
      queryIndex: 3,
      test: (result) => {
        // Verifica se retorna projetos sem alocações
        return result.every(r =>
          r.hasOwnProperty('project_name') &&
          r.employee_id === null
        );
      },
      hint: "LEFT JOIN projects com assignments e filtre WHERE employee_id IS NULL",
      expectedMessage: "Deve retornar projetos sem funcionários alocados"
    },

    {
      id: 5,
      name: "Funcionários e seus gerentes (incluindo quem não tem gerente)",
      queryIndex: 4,
      test: (result) => {
        return result.length === 12 &&
               result.some(r => r.manager === null); // Alguns não têm gerente
      },
      hint: "LEFT JOIN employees com ela mesma usando manager_id",
      expectedMessage: "Deve incluir todos os funcionários, mesmo os que não têm gerente (NULL)"
    },

    {
      id: 6,
      name: "Combinar múltiplas condições em JOIN",
      queryIndex: 5,
      test: (result) => {
        // LEFT JOIN com filtro na condição ON (não WHERE)
        return result.every(r =>
          r.hasOwnProperty('name') &&
          r.hasOwnProperty('project_id')
        );
      },
      hint: "LEFT JOIN com ON employees.id = assignments.employee_id AND assignments.hours > 20",
      expectedMessage: "Deve retornar funcionários com suas alocações >20h (NULL se não houver)"
    }
  ]
};
