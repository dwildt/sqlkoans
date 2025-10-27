-- ============================================
-- SQL Koans - Lição 10: Window Functions
-- ============================================
--
-- Nesta lição você aprenderá:
-- - ROW_NUMBER() para numeração sequencial
-- - RANK() e DENSE_RANK() para rankings
-- - PARTITION BY para dividir em janelas
-- - Agregações com OVER()
-- - LAG() e LEAD() para acessar linhas adjacentes
-- - Combinar múltiplas window functions
--
-- Dica: Para testar suas queries, rode: npm test 10
-- ============================================

-- KOAN 1: ROW_NUMBER para numeração
-- Numere todos os funcionários ordenados por salário (maior para menor)
-- Use alias 'row_num'
-- YOUR QUERY HERE


-- KOAN 2: RANK para ranking com empates
-- Crie um ranking de funcionários por salário (maior para menor)
-- Use RANK() que permite empates com o mesmo número
-- Use alias 'rank'
-- YOUR QUERY HERE


-- KOAN 3: Particionar com PARTITION BY
-- Rankeie funcionários dentro de cada departamento por salário
-- Use alias 'dept_rank'
-- Dica: RANK() OVER (PARTITION BY department ORDER BY salary DESC)
-- YOUR QUERY HERE


-- KOAN 4: Agregações com OVER
-- Mostre cada funcionário com seu salário e a média salarial do seu departamento
-- Use alias 'dept_avg'
-- Dica: AVG(salary) OVER (PARTITION BY department)
-- YOUR QUERY HERE


-- KOAN 5: LAG para valor anterior
-- Mostre cada funcionário com sua data de contratação e a data do contratado anterior
-- Use alias 'prev_hire_date'
-- Ordene por hire_date
-- YOUR QUERY HERE


-- KOAN 6: Combinar múltiplas window functions
-- Mostre cada funcionário com:
-- - dept_rank: rank dentro do departamento
-- - overall_rank: rank geral por salário
-- YOUR QUERY HERE
