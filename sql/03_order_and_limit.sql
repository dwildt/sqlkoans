-- ============================================
-- SQL Koans - Lição 03: ORDER BY e LIMIT
-- ============================================
--
-- Nesta lição você aprenderá:
-- - Ordenar resultados com ORDER BY
-- - Ordem crescente (ASC) e decrescente (DESC)
-- - Limitar quantidade de resultados com LIMIT
-- - Paginação com OFFSET
-- - Ordenar por múltiplas colunas
--
-- Dica: Para testar suas queries, rode: npm test 03
-- ============================================

-- KOAN 1: Ordenar por salário crescente
-- Selecione todos os funcionários ordenados por salário do menor para o maior
-- Esperado: 12 funcionários em ordem crescente de salário
-- YOUR QUERY HERE


-- KOAN 2: Ordenar por salário decrescente
-- Selecione todos os funcionários ordenados por salário do maior para o menor
-- Esperado: 12 funcionários em ordem decrescente de salário
-- YOUR QUERY HERE


-- KOAN 3: Limitar a 5 resultados
-- Selecione apenas os primeiros 5 funcionários
-- Esperado: 5 funcionários
-- YOUR QUERY HERE


-- KOAN 4: Top 3 maiores salários
-- Selecione os 3 funcionários com os maiores salários
-- Dica: Combine ORDER BY com LIMIT
-- YOUR QUERY HERE


-- KOAN 5: Ordenar por múltiplas colunas
-- Selecione todos os funcionários ordenados por departamento (A-Z)
-- e dentro de cada departamento, por salário (maior para menor)
-- YOUR QUERY HERE


-- KOAN 6: Paginação com LIMIT e OFFSET
-- Selecione funcionários de 6 a 10 (segunda "página" de 5 itens)
-- Dica: Use ORDER BY id, LIMIT 5 OFFSET 5
-- YOUR QUERY HERE
