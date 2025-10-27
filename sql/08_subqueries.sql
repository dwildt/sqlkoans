-- ============================================
-- SQL Koans - Lição 08: Subqueries
-- ============================================
--
-- Nesta lição você aprenderá:
-- - Subquery no WHERE (filtro baseado em outra query)
-- - Subquery no SELECT (valor calculado)
-- - Subquery no FROM (derived table/tabela derivada)
-- - Usar IN, EXISTS com subqueries
-- - Subqueries correlacionadas
--
-- Dica: Para testar suas queries, rode: npm test 08
-- ============================================

-- KOAN 1: Subquery no WHERE com valor único
-- Encontre o(s) funcionário(s) com o maior salário
-- Dica: WHERE salary = (SELECT MAX(salary) FROM employees)
-- YOUR QUERY HERE


-- KOAN 2: Subquery com IN
-- Encontre funcionários que estão alocados em projetos do departamento IT
-- Dica: Use IN com subquery que busca project_id de projetos do IT
-- YOUR QUERY HERE


-- KOAN 3: Subquery no SELECT
-- Mostre nome, salário de cada funcionário e a média salarial geral
-- Use alias 'avg_salary' para a média
-- YOUR QUERY HERE


-- KOAN 4: Subquery no FROM (derived table)
-- Encontre departamentos com salário médio acima de 65000
-- Dica: Primeiro crie uma subquery no FROM que agrupa por departamento,
-- depois filtre o resultado dessa subquery
-- YOUR QUERY HERE


-- KOAN 5: EXISTS para verificar existência
-- Encontre funcionários que estão alocados em pelo menos um projeto
-- Dica: WHERE EXISTS (SELECT 1 FROM assignments WHERE ...)
-- YOUR QUERY HERE


-- KOAN 6: Subquery correlacionada
-- Encontre funcionários cujo salário está acima da média do seu próprio departamento
-- Dica: Use alias (e1, e2) e compare com subquery que filtra pelo mesmo departamento
-- YOUR QUERY HERE
