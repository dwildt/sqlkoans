-- ============================================
-- SQL Koans - Lição 05: GROUP BY e HAVING
-- ============================================
--
-- Nesta lição você aprenderá:
-- - Agrupar resultados com GROUP BY
-- - Usar funções de agregação com grupos
-- - Filtrar grupos com HAVING
-- - Diferença entre WHERE e HAVING
-- - Ordenar resultados agrupados
--
-- Dica: Para testar suas queries, rode: npm test 05
-- ============================================

-- KOAN 1: Contar funcionários por departamento
-- Agrupe funcionários por departamento e conte quantos há em cada
-- Use alias 'count' para a contagem
-- YOUR QUERY HERE


-- KOAN 2: Calcular salário médio por departamento
-- Calcule o salário médio de cada departamento
-- Use alias 'avg_salary' para a média
-- YOUR QUERY HERE


-- KOAN 3: Encontrar departamentos com mais de 3 funcionários
-- Agrupe por departamento e filtre apenas aqueles com mais de 3 funcionários
-- Dica: Use HAVING COUNT(*) > 3
-- YOUR QUERY HERE


-- KOAN 4: Departamentos com salário médio acima de 65000
-- Encontre departamentos cuja média salarial é maior que 65000
-- Use GROUP BY e HAVING
-- YOUR QUERY HERE


-- KOAN 5: Total de horas por projeto
-- Na tabela assignments, some as horas alocadas por projeto
-- Use alias 'total_hours' para a soma
-- YOUR QUERY HERE


-- KOAN 6: Ordenar grupos por agregação
-- Conte funcionários por departamento e ordene do maior para o menor
-- YOUR QUERY HERE


-- KOAN 7: Combinar WHERE com GROUP BY
-- Conte funcionários por departamento, mas apenas aqueles contratados
-- a partir de 2020-01-01 (WHERE hire_date >= '2020-01-01')
-- YOUR QUERY HERE
