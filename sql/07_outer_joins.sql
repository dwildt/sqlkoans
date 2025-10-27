-- ============================================
-- SQL Koans - Lição 07: OUTER JOINs
-- ============================================
--
-- Nesta lição você aprenderá:
-- - LEFT JOIN para preservar linhas da tabela esquerda
-- - Identificar registros sem correspondência (IS NULL)
-- - Diferença entre filtro no ON vs WHERE
-- - Contagem com LEFT JOIN
-- - Casos de uso para OUTER JOINs
--
-- Dica: Para testar suas queries, rode: npm test 07
-- ============================================

-- KOAN 1: LEFT JOIN para incluir todos os funcionários
-- Selecione todos os funcionários e seus project_id (se houver)
-- Funcionários sem alocações devem aparecer com project_id NULL
-- YOUR QUERY HERE


-- KOAN 2: Identificar funcionários sem alocações
-- Encontre funcionários que NÃO estão alocados em nenhum projeto
-- Dica: Use LEFT JOIN e WHERE project_id IS NULL
-- YOUR QUERY HERE


-- KOAN 3: LEFT JOIN com contagem
-- Para cada funcionário, conte em quantos projetos está alocado
-- Use alias 'project_count' (deve ser 0 para funcionários sem alocações)
-- Dica: COUNT(assignments.project_id) com GROUP BY
-- YOUR QUERY HERE


-- KOAN 4: Projetos sem funcionários alocados
-- Encontre projetos que não têm nenhum funcionário alocado
-- YOUR QUERY HERE


-- KOAN 5: Funcionários e seus gerentes (incluindo quem não tem gerente)
-- Mostre cada funcionário e o nome do seu gerente
-- Funcionários sem gerente devem aparecer com manager NULL
-- Dica: Self LEFT JOIN em employees
-- YOUR QUERY HERE


-- KOAN 6: Combinar múltiplas condições em JOIN
-- LEFT JOIN employees com assignments, mas apenas alocações com mais de 20 horas
-- A condição 'hours > 20' deve estar no ON, não no WHERE
-- YOUR QUERY HERE
