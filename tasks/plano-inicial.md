# SQL Koans - Plano Inicial

## 📖 Visão Geral

**SQL Koans** é um projeto de aprendizado progressivo inspirado no conceito de "Koans" (lições zen), onde o estudante aprende SQL através da prática guiada, recebendo feedback imediato sobre suas queries.

### Objetivo
Proporcionar um ambiente de aprendizado interativo para SQL, focado em estudantes de nível iniciante a intermediário, usando SQLite em memória para testes rápidos e isolados.

### Público-Alvo
Desenvolvedores iniciantes a intermediários que desejam:
- Aprender SQL do básico (SELECT) até conceitos intermediários (Window Functions)
- Praticar com feedback imediato
- Ter um ambiente isolado e portável (sem necessidade de servidor de banco)

---

## 🏗️ Arquitetura do Projeto

### Stack Tecnológica
- **Runtime**: Node.js
- **Banco de Dados**: SQLite (em memória via `better-sqlite3`)
- **Testing**: Framework customizado com arquivos de teste em JavaScript
- **CLI**: Simples, baseado em comandos npm
- **Output**: Colorido via `chalk`

### Estrutura de Diretórios

```
sqlkoans/
├── package.json                 # Dependências e scripts npm
├── README.md                    # Documentação principal do usuário
├── .gitignore                   # Arquivos a ignorar no git
├── runner.js                    # Script principal (entry point)
│
├── lib/                         # Bibliotecas core do projeto
│   ├── database.js              # Gerenciamento SQLite em memória
│   ├── test-runner.js           # Engine de execução dos testes
│   └── formatter.js             # Formatação colorida do output
│
├── data/                        # Dados de seed
│   └── seed.js                  # Popular banco com dados de exemplo
│
├── koans/                       # Definições dos testes (1 arquivo por lição)
│   ├── 01_select_basics.js
│   ├── 02_where_clauses.js
│   ├── 03_order_and_limit.js
│   ├── 04_aggregations.js
│   ├── 05_group_by.js
│   ├── 06_inner_joins.js
│   ├── 07_outer_joins.js
│   ├── 08_subqueries.js
│   ├── 09_cte.js
│   └── 10_window_functions.js
│
├── sql/                         # Onde o aluno escreve suas respostas
│   ├── 01_select_basics.sql
│   ├── 02_where_clauses.sql
│   ├── 03_order_and_limit.sql
│   ├── 04_aggregations.sql
│   ├── 05_group_by.sql
│   ├── 06_inner_joins.sql
│   ├── 07_outer_joins.sql
│   ├── 08_subqueries.sql
│   ├── 09_cte.sql
│   └── 10_window_functions.sql
│
└── tasks/                       # Documentação de planejamento
    └── plano-inicial.md         # Este arquivo
```

---

## 🎯 Como Funciona

### Fluxo do Estudante

1. **Lê a descrição da lição** no arquivo SQL (ex: `sql/01_select_basics.sql`)
2. **Escreve suas queries** nos espaços marcados
3. **Executa o teste**: `npm test` ou `npm test 01`
4. **Recebe feedback** colorido:
   - ✓ Verde para koans que passaram
   - ✗ Vermelho para koans que falharam
   - 💡 Dicas específicas para ajudar
5. **Corrige e repete** até dominar o conceito
6. **Avança** para a próxima lição

### Estrutura de um Arquivo SQL (exemplo)

```sql
-- ============================================
-- SQL Koans - Lição 01: SELECT Básico
-- ============================================
--
-- Nesta lição você aprenderá:
-- - Selecionar todas as colunas de uma tabela
-- - Selecionar colunas específicas
-- - Usar DISTINCT para valores únicos

-- KOAN 1: Selecione todos os funcionários
-- Retorne todas as colunas da tabela employees
-- YOUR QUERY HERE


-- KOAN 2: Selecione apenas nome e salário
-- Retorne as colunas 'name' e 'salary' de todos os funcionários
-- YOUR QUERY HERE


-- KOAN 3: Departamentos únicos
-- Retorne uma lista de todos os departamentos únicos (sem duplicatas)
-- YOUR QUERY HERE

```

### Estrutura de um Arquivo de Teste (exemplo)

```javascript
module.exports = {
  title: "01 - SELECT Básico",
  description: "Aprenda a selecionar dados de uma tabela",

  koans: [
    {
      id: 1,
      name: "Selecionar todos os funcionários",
      queryIndex: 0, // Índice da query no arquivo SQL
      test: (result) => {
        // Valida o resultado
        return result.length === 10 &&
               result[0].hasOwnProperty('id') &&
               result[0].hasOwnProperty('name') &&
               result[0].hasOwnProperty('department') &&
               result[0].hasOwnProperty('salary');
      },
      hint: "Use SELECT * FROM employees",
      expectedMessage: "Deve retornar 10 funcionários com todas as colunas"
    },
    {
      id: 2,
      name: "Selecionar apenas nome e salário",
      queryIndex: 1,
      test: (result) => {
        return result.length === 10 &&
               Object.keys(result[0]).length === 2 &&
               result[0].hasOwnProperty('name') &&
               result[0].hasOwnProperty('salary');
      },
      hint: "Use SELECT name, salary FROM employees",
      expectedMessage: "Deve retornar 10 funcionários com apenas 2 colunas: name e salary"
    },
    {
      id: 3,
      name: "Departamentos únicos",
      queryIndex: 2,
      test: (result) => {
        return result.length === 4 &&
               result[0].hasOwnProperty('department');
      },
      hint: "Use SELECT DISTINCT department FROM employees",
      expectedMessage: "Deve retornar 4 departamentos únicos"
    }
  ]
};
```

---

## 📊 Modelo de Dados

### Tabelas do Banco de Dados

#### **employees** (Funcionários)
| Coluna     | Tipo    | Descrição                    |
|------------|---------|------------------------------|
| id         | INTEGER | Identificador único          |
| name       | TEXT    | Nome completo                |
| department | TEXT    | Departamento (IT, Sales, HR, Finance) |
| salary     | REAL    | Salário anual                |
| hire_date  | TEXT    | Data de contratação (ISO)    |
| manager_id | INTEGER | ID do gerente (pode ser NULL)|

**Exemplo de dados:**
```
1, 'Alice Silva', 'IT', 75000, '2020-01-15', NULL
2, 'Bob Santos', 'IT', 65000, '2021-03-20', 1
3, 'Carol Dias', 'Sales', 60000, '2019-07-10', NULL
...
```

#### **departments** (Departamentos)
| Coluna | Tipo    | Descrição           |
|--------|---------|---------------------|
| id     | INTEGER | Identificador único |
| name   | TEXT    | Nome do departamento|
| budget | REAL    | Orçamento anual     |

**Exemplo de dados:**
```
1, 'IT', 500000
2, 'Sales', 300000
3, 'HR', 150000
4, 'Finance', 200000
```

#### **projects** (Projetos)
| Coluna        | Tipo    | Descrição                |
|---------------|---------|--------------------------|
| id            | INTEGER | Identificador único      |
| name          | TEXT    | Nome do projeto          |
| department_id | INTEGER | FK para departments      |
| budget        | REAL    | Orçamento do projeto     |
| start_date    | TEXT    | Data de início (ISO)     |

**Exemplo de dados:**
```
1, 'Sistema ERP', 1, 150000, '2023-01-01'
2, 'App Mobile', 1, 80000, '2023-06-01'
3, 'Campanha Q1', 2, 50000, '2023-01-01'
...
```

#### **assignments** (Alocações de Funcionários em Projetos)
| Coluna      | Tipo    | Descrição             |
|-------------|---------|------------------------|
| employee_id | INTEGER | FK para employees      |
| project_id  | INTEGER | FK para projects       |
| hours       | REAL    | Horas alocadas/semana  |

**Exemplo de dados:**
```
1, 1, 40  -- Alice no Sistema ERP, 40h/semana
2, 1, 20  -- Bob no Sistema ERP, 20h/semana
2, 2, 20  -- Bob no App Mobile, 20h/semana
...
```

---

## 📚 Progressão das Lições

### Módulo 1: Fundamentos (Lições 1-3)

#### **Lição 01: SELECT Básico**
- SELECT * (todas as colunas)
- SELECT específico (colunas individuais)
- SELECT DISTINCT (valores únicos)
- Alias com AS

**Conceitos-chave:** Projeção de dados, eliminação de duplicatas

#### **Lição 02: WHERE Clauses**
- Comparações básicas (=, !=, >, <, >=, <=)
- BETWEEN para intervalos
- IN para múltiplos valores
- LIKE para padrões de texto (%, _)
- IS NULL / IS NOT NULL
- AND, OR, NOT (operadores lógicos)

**Conceitos-chave:** Filtragem de linhas, lógica booleana

#### **Lição 03: ORDER BY e LIMIT**
- ORDER BY ASC (ascendente)
- ORDER BY DESC (descendente)
- Ordenação por múltiplas colunas
- LIMIT para limitar resultados
- OFFSET para paginação

**Conceitos-chave:** Ordenação de resultados, paginação

---

### Módulo 2: Agregações (Lições 4-5)

#### **Lição 04: Funções de Agregação**
- COUNT(*) e COUNT(column)
- SUM(column)
- AVG(column)
- MIN(column) e MAX(column)
- Combinação de múltiplas funções

**Conceitos-chave:** Cálculos sobre conjuntos de dados

#### **Lição 05: GROUP BY e HAVING**
- GROUP BY para agrupar resultados
- Agregações com GROUP BY
- HAVING para filtrar grupos
- Diferença entre WHERE e HAVING
- GROUP BY com múltiplas colunas

**Conceitos-chave:** Agregação por grupos, filtragem pós-agregação

---

### Módulo 3: JOINs (Lições 6-7)

#### **Lição 06: INNER JOIN**
- Conceito de JOIN (relacionar tabelas)
- INNER JOIN básico
- JOIN com múltiplas condições
- JOIN de múltiplas tabelas
- Alias de tabelas

**Conceitos-chave:** Relacionamentos entre tabelas, normalização

#### **Lição 07: OUTER JOINs**
- LEFT JOIN (todas da esquerda + matches)
- RIGHT JOIN (todas da direita + matches)
- FULL OUTER JOIN (todas de ambas)
- Tratamento de NULLs em JOINs
- Self-join básico

**Conceitos-chave:** Preservação de linhas não-matched, auto-relacionamento

---

### Módulo 4: Queries Avançadas (Lições 8-10)

#### **Lição 08: Subqueries**
- Subquery no WHERE (filtrar baseado em outra query)
- Subquery no FROM (tabela derivada)
- Subquery no SELECT (valor calculado)
- IN com subquery
- EXISTS e NOT EXISTS

**Conceitos-chave:** Queries aninhadas, modularização de lógica

#### **Lição 09: Common Table Expressions (CTEs)**
- WITH clause básica
- CTEs nomeadas
- Múltiplas CTEs
- CTE recursiva simples
- Vantagens vs subqueries

**Conceitos-chave:** Legibilidade, reutilização de queries intermediárias

#### **Lição 10: Window Functions**
- ROW_NUMBER() para numeração
- RANK() e DENSE_RANK()
- Particionamento com PARTITION BY
- Ordenação com ORDER BY dentro da window
- LAG() e LEAD() para valores anteriores/próximos
- Agregações com OVER()

**Conceitos-chave:** Análise de dados, cálculos por janela

---

## 🛠️ Componentes Técnicos

### 1. `runner.js` (Entry Point)

**Responsabilidades:**
- Parse de argumentos CLI (`npm test`, `npm test 01`)
- Inicialização do banco de dados
- Carregamento dos koans
- Execução do test runner
- Exibição de resultados formatados

**Interface CLI:**
```bash
npm test              # Roda todos os koans
npm test 01           # Roda apenas lição 01
npm run progress      # Mostra progresso geral
npm run hint 01 3     # Mostra dica do koan 3 da lição 01
```

---

### 2. `lib/database.js`

**Responsabilidades:**
- Criar conexão SQLite em memória
- Executar scripts de schema (CREATE TABLE)
- Popular dados via seed
- Fornecer API para executar queries
- Garantir isolamento (cada teste = banco novo)

**API:**
```javascript
const db = require('./lib/database');

// Inicializa banco com schema e dados
db.initialize();

// Executa query e retorna resultados
const results = db.query('SELECT * FROM employees');

// Fecha conexão
db.close();
```

---

### 3. `lib/test-runner.js`

**Responsabilidades:**
- Ler arquivos SQL do aluno
- Parsear queries individuais (separar por comentários)
- Executar cada query contra o banco
- Comparar resultados com expectativas
- Capturar erros e formatar mensagens

**Lógica de parsing:**
```
Input: sql/01_select_basics.sql

-- KOAN 1: ...
SELECT * FROM employees;

-- KOAN 2: ...
SELECT name, salary FROM employees;

Output: [
  "SELECT * FROM employees;",
  "SELECT name, salary FROM employees;"
]
```

---

### 4. `lib/formatter.js`

**Responsabilidades:**
- Colorir output com `chalk`
- Formatar resultados de testes (✓/✗)
- Exibir dicas e mensagens de erro
- Calcular e mostrar progresso

**Exemplo de output:**
```
🧘 SQL Koans - Path to Enlightenment

✓ 01 - SELECT Básico
  ✓ Koan 1: Selecionar todos os funcionários
  ✓ Koan 2: Selecionar apenas nome e salário
  ✗ Koan 3: Departamentos únicos
    Expected 4 rows, got 0
    💡 Hint: Use SELECT DISTINCT department FROM employees

Progress: 2/3 koans completed (67%)
Next challenge: Fix Koan 3 in 01_select_basics.sql
```

---

### 5. `data/seed.js`

**Responsabilidades:**
- Definir schema das tabelas (CREATE TABLE)
- Popular com dados realistas e consistentes
- Garantir integridade referencial
- Fornecer dataset interessante para prática

**Exemplo de estrutura:**
```javascript
module.exports = {
  schema: `
    CREATE TABLE employees (...);
    CREATE TABLE departments (...);
    CREATE TABLE projects (...);
    CREATE TABLE assignments (...);
  `,

  data: {
    employees: [ /* array de objetos */ ],
    departments: [ /* array de objetos */ ],
    projects: [ /* array de objetos */ ],
    assignments: [ /* array de objetos */ ]
  }
};
```

---

## 🎨 Experiência do Usuário

### Primeira Execução

```bash
$ npm install
$ npm test

🧘 SQL Koans - Path to Enlightenment

Welcome! You have not yet started your journey.

✗ 01 - SELECT Básico
  ✗ Koan 1: Selecionar todos os funcionários
    No query found. Write your SQL in sql/01_select_basics.sql
    💡 Hint: Use SELECT * FROM employees
  ✗ Koan 2: Selecionar apenas nome e salário
    No query found
  ✗ Koan 3: Departamentos únicos
    No query found

Progress: 0/30 koans completed (0%)
Next challenge: Write your first query in sql/01_select_basics.sql
```

### Após Escrever Primeira Query

```bash
$ npm test 01

🧘 SQL Koans - Lição 01

✓ 01 - SELECT Básico
  ✓ Koan 1: Selecionar todos os funcionários
  ✗ Koan 2: Selecionar apenas nome e salário
    Expected 2 columns, got 4
    💡 Hint: Use SELECT name, salary FROM employees
  ✗ Koan 3: Departamentos únicos
    Expected 4 unique departments, got 10 rows with duplicates
    💡 Hint: Use SELECT DISTINCT department FROM employees

Progress: 1/3 koans completed (33%)
Keep going! You're making progress! 🚀
```

### Lição Completa

```bash
$ npm test 01

🧘 SQL Koans - Lição 01

✓ 01 - SELECT Básico
  ✓ Koan 1: Selecionar todos os funcionários
  ✓ Koan 2: Selecionar apenas nome e salário
  ✓ Koan 3: Departamentos únicos

✨ Enlightenment achieved! Lição 01 completed!

Progress: 3/3 koans completed (100%)
Next lesson: sql/02_where_clauses.sql
```

---

## 📈 Métricas de Progresso

### Tracking Individual
- Por lição: X/Y koans completados
- Por módulo: X/Y lições completadas
- Geral: X/30 koans totais

### Persistência (opcional - fase 2)
Salvar progresso em arquivo JSON:
```json
{
  "progress": {
    "01_select_basics": [true, true, true],
    "02_where_clauses": [true, false, false],
    ...
  },
  "lastAttempt": "2025-10-26T10:30:00Z"
}
```

---

## 🔮 Possíveis Extensões Futuras

### Fase 2 (após MVP)
1. **Mode de hints progressivos**: 3 níveis de dica por koan
2. **Modo desafio**: Remover todas as dicas
3. **Leaderboard local**: Tempo para completar cada lição
4. **Exportar progresso**: Gerar relatório MD ou HTML

### Fase 3 (avançado)
1. **Interface Web**: Editor SQL online com split-screen
2. **Suporte a PostgreSQL**: Usar pg-mem para features específicas do Postgres
3. **Koans customizados**: Usuário pode criar seus próprios
4. **Sistema de badges**: Gamificação do aprendizado
5. **Modo multiplayer**: Competir com outros estudantes

---

## ✅ Critérios de Sucesso

Um koan está implementado corretamente quando:
- ✓ Descrição clara do que precisa ser feito
- ✓ Template SQL com espaço para resposta
- ✓ Teste automatizado que valida corretamente
- ✓ Dica útil mas não revela resposta completa
- ✓ Mensagem de erro informativa
- ✓ Conceito progressivo (builds on previous)

O projeto está completo quando:
- ✓ 10 lições implementadas e testadas
- ✓ Runner funciona sem bugs
- ✓ Output é claro e motivador
- ✓ README com instruções completas
- ✓ Dados de seed realistas
- ✓ Experiência smooth do início ao fim

---

## 📝 Notas de Implementação

### Ordem de Desenvolvimento
1. ✅ Documentar plano (este arquivo)
2. Setup inicial (package.json, estrutura)
3. Core (database.js, seed.js)
4. Engine (test-runner.js, formatter.js)
5. Runner principal
6. Lições 1-3 (validar conceito)
7. Lições 4-7 (expandir)
8. Lições 8-10 (completar)
9. Polish (README, error handling)
10. Testing end-to-end

### Decisões de Design
- **SQLite em memória**: Portabilidade e velocidade
- **Node.js**: Ubiquidade e facilidade
- **Arquivos .sql separados**: Clareza e simplicidade
- **CLI simples**: Menor barreira de entrada
- **Feedback colorido**: Motivação e clareza visual

### Dependências Principais
```json
{
  "better-sqlite3": "^9.0.0",  // SQLite driver
  "chalk": "^4.1.2"             // Colorir terminal
}
```

---

**Status**: 📋 Planejamento completo
**Próximo passo**: Implementação da estrutura base
**Data**: 2025-10-26
