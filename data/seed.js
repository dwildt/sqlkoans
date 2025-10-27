/**
 * Schema e dados de seed para SQL Koans
 */

const schema = `
-- Tabela de departamentos
CREATE TABLE departments (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  budget REAL NOT NULL
);

-- Tabela de funcionários
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  salary REAL NOT NULL,
  hire_date TEXT NOT NULL,
  manager_id INTEGER,
  FOREIGN KEY (manager_id) REFERENCES employees(id)
);

-- Tabela de projetos
CREATE TABLE projects (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department_id INTEGER NOT NULL,
  budget REAL NOT NULL,
  start_date TEXT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Tabela de alocações (relação N:N entre employees e projects)
CREATE TABLE assignments (
  employee_id INTEGER NOT NULL,
  project_id INTEGER NOT NULL,
  hours REAL NOT NULL,
  PRIMARY KEY (employee_id, project_id),
  FOREIGN KEY (employee_id) REFERENCES employees(id),
  FOREIGN KEY (project_id) REFERENCES projects(id)
);
`;

const data = {
  departments: [
    { id: 1, name: 'IT', budget: 500000 },
    { id: 2, name: 'Sales', budget: 300000 },
    { id: 3, name: 'HR', budget: 150000 },
    { id: 4, name: 'Finance', budget: 200000 }
  ],

  employees: [
    // IT Department
    { id: 1, name: 'Alice Silva', department: 'IT', salary: 85000, hire_date: '2020-01-15', manager_id: null },
    { id: 2, name: 'Bob Santos', department: 'IT', salary: 72000, hire_date: '2021-03-20', manager_id: 1 },
    { id: 3, name: 'Charlie Costa', department: 'IT', salary: 68000, hire_date: '2021-06-10', manager_id: 1 },
    { id: 4, name: 'Diana Rocha', department: 'IT', salary: 75000, hire_date: '2020-08-05', manager_id: 1 },

    // Sales Department
    { id: 5, name: 'Eva Martins', department: 'Sales', salary: 65000, hire_date: '2019-07-10', manager_id: null },
    { id: 6, name: 'Frank Oliveira', department: 'Sales', salary: 58000, hire_date: '2020-11-15', manager_id: 5 },
    { id: 7, name: 'Grace Lima', department: 'Sales', salary: 62000, hire_date: '2021-02-01', manager_id: 5 },

    // HR Department
    { id: 8, name: 'Hugo Alves', department: 'HR', salary: 55000, hire_date: '2019-05-20', manager_id: null },
    { id: 9, name: 'Iris Souza', department: 'HR', salary: 52000, hire_date: '2022-01-10', manager_id: 8 },

    // Finance Department
    { id: 10, name: 'Jack Ferreira', department: 'Finance', salary: 70000, hire_date: '2018-03-15', manager_id: null },
    { id: 11, name: 'Kelly Gomes', department: 'Finance', salary: 65000, hire_date: '2020-09-01', manager_id: 10 },
    { id: 12, name: 'Leo Pereira', department: 'Finance', salary: 60000, hire_date: '2021-07-12', manager_id: 10 }
  ],

  projects: [
    // IT Projects
    { id: 1, name: 'Sistema ERP', department_id: 1, budget: 150000, start_date: '2023-01-01' },
    { id: 2, name: 'App Mobile', department_id: 1, budget: 80000, start_date: '2023-06-01' },
    { id: 3, name: 'Website Redesign', department_id: 1, budget: 50000, start_date: '2023-09-01' },

    // Sales Projects
    { id: 4, name: 'Campanha Q1 2024', department_id: 2, budget: 45000, start_date: '2024-01-01' },
    { id: 5, name: 'Expansão Regional', department_id: 2, budget: 75000, start_date: '2023-08-01' },

    // HR Projects
    { id: 6, name: 'Programa de Treinamento', department_id: 3, budget: 30000, start_date: '2023-03-01' },
    { id: 7, name: 'Sistema de Avaliação', department_id: 3, budget: 25000, start_date: '2023-10-01' },

    // Finance Projects
    { id: 8, name: 'Auditoria Anual', department_id: 4, budget: 40000, start_date: '2023-01-15' },
    { id: 9, name: 'Sistema de Budget', department_id: 4, budget: 55000, start_date: '2023-07-01' }
  ],

  assignments: [
    // Sistema ERP (projeto 1)
    { employee_id: 1, project_id: 1, hours: 40 },
    { employee_id: 2, project_id: 1, hours: 30 },
    { employee_id: 3, project_id: 1, hours: 25 },

    // App Mobile (projeto 2)
    { employee_id: 2, project_id: 2, hours: 10 },
    { employee_id: 4, project_id: 2, hours: 35 },

    // Website Redesign (projeto 3)
    { employee_id: 3, project_id: 3, hours: 15 },
    { employee_id: 4, project_id: 3, hours: 5 },

    // Campanha Q1 2024 (projeto 4)
    { employee_id: 5, project_id: 4, hours: 20 },
    { employee_id: 6, project_id: 4, hours: 30 },
    { employee_id: 7, project_id: 4, hours: 25 },

    // Expansão Regional (projeto 5)
    { employee_id: 5, project_id: 5, hours: 20 },
    { employee_id: 6, project_id: 5, hours: 10 },

    // Programa de Treinamento (projeto 6)
    { employee_id: 8, project_id: 6, hours: 30 },
    { employee_id: 9, project_id: 6, hours: 10 },

    // Sistema de Avaliação (projeto 7)
    { employee_id: 8, project_id: 7, hours: 10 },
    { employee_id: 9, project_id: 7, hours: 30 },

    // Auditoria Anual (projeto 8)
    { employee_id: 10, project_id: 8, hours: 35 },
    { employee_id: 11, project_id: 8, hours: 20 },

    // Sistema de Budget (projeto 9)
    { employee_id: 10, project_id: 9, hours: 5 },
    { employee_id: 11, project_id: 9, hours: 20 },
    { employee_id: 12, project_id: 9, hours: 35 }
  ]
};

module.exports = { schema, data };
