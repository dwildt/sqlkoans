-- ============================================
-- SQL Koans - Lição 06: INNER JOIN
-- ============================================
--
-- Nesta lição você aprenderá:
-- - Combinar dados de múltiplas tabelas com INNER JOIN
-- - JOIN com duas, três ou mais tabelas
-- - Usar alias de tabelas (AS ou shorthand)
-- - Self-join (tabela com ela mesma)
-- - Combinar JOIN com WHERE, GROUP BY, etc.
--
-- Dica: Para testar suas queries, rode: npm test 06
-- ============================================

-- KOAN 1: JOIN básico entre employees e assignments
-- Selecione o nome do funcionário e o project_id das suas alocações
-- Use aliases 'name' e 'project_id'
-- YOUR QUERY HERE


-- KOAN 2: JOIN com três tabelas
-- Combine employees, assignments e projects para mostrar:
-- - employee_name (nome do funcionário)
-- - project_name (nome do projeto)
-- - hours (horas alocadas)
-- YOUR QUERY HERE


-- KOAN 3: JOIN com filtro WHERE
-- Do JOIN anterior, mostre apenas alocações com 30 ou mais horas
-- YOUR QUERY HERE


-- KOAN 4: JOIN projects com departments
-- Mostre o nome de cada projeto e o nome do seu departamento
-- Use aliases 'project_name' e 'department_name'
-- YOUR QUERY HERE


-- KOAN 5: Usar alias de tabelas (self-join)
-- Mostre cada funcionário e o nome do seu gerente
-- Dica: JOIN employees com ela mesma usando manager_id
-- Use aliases 'employee' e 'manager'
-- YOUR QUERY HERE


-- KOAN 6: Agregação com JOIN
-- Para cada projeto, conte quantos funcionários estão alocados
-- Use aliases 'project_name' e 'employee_count'
-- YOUR QUERY HERE
