-- ============================================
-- SQL Koans - Lição 09: CTEs (Common Table Expressions)
-- ============================================
--
-- Nesta lição você aprenderá:
-- - Criar CTEs com WITH
-- - Usar múltiplas CTEs em uma query
-- - CTEs referenciando outras CTEs
-- - Quando usar CTE vs Subquery
-- - Melhorar legibilidade de queries complexas
--
-- Dica: Para testar suas queries, rode: npm test 09
-- ============================================

-- KOAN 1: CTE básica
-- Use WITH para criar uma CTE chamada 'high_earners' com funcionários
-- que ganham mais de 70000, depois selecione todos dela
-- YOUR QUERY HERE


-- KOAN 2: Múltiplas CTEs
-- Crie duas CTEs: uma com funcionários do IT e outra com funcionários de Sales
-- Depois, faça UNION de ambas
-- YOUR QUERY HERE


-- KOAN 3: CTE com agregação
-- Crie uma CTE que agrupe funcionários por departamento calculando
-- avg_salary e max_salary, depois selecione tudo dela
-- YOUR QUERY HERE


-- KOAN 4: CTE referenciando outra CTE
-- Primeira CTE: departamentos com mais de 2 funcionários
-- Segunda CTE: seleciona da primeira CTE apenas os com avg_salary > 60000
-- Depois selecione da segunda CTE
-- YOUR QUERY HERE


-- KOAN 5: CTE vs Subquery - legibilidade
-- Crie CTE com média salarial por departamento (dept_avg)
-- Depois JOIN employees com essa CTE para mostrar:
-- name, salary, dept_avg (média do departamento)
-- YOUR QUERY HERE


-- KOAN 6: CTE com JOIN complexo
-- Crie CTE que calcula para cada funcionário:
-- - total_hours (soma de horas em todos os projetos)
-- - project_count (número de projetos)
-- Mostre employee_name, total_hours, project_count
-- YOUR QUERY HERE
