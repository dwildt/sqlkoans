const initSqlJs = require('sql.js');
const seed = require('../data/seed');

class DatabaseManager {
  constructor() {
    this.db = null;
  }

  /**
   * Inicializa o banco de dados em memória com schema e dados
   */
  async initialize() {
    // Inicializa sql.js
    const SQL = await initSqlJs();

    // Cria banco em memória
    this.db = new SQL.Database();

    // Executa schema (CREATE TABLEs)
    this.executeScript(seed.schema);

    // Popula com dados
    this.populateData(seed.data);

    return this;
  }

  /**
   * Executa um script SQL (múltiplos statements)
   */
  executeScript(script) {
    this.db.run(script);
  }

  /**
   * Executa uma query e retorna os resultados
   * @param {string} sql - Query SQL
   * @returns {Array} Array de objetos com os resultados
   */
  query(sql) {
    try {
      const stmt = this.db.prepare(sql);
      const results = [];

      while (stmt.step()) {
        const row = stmt.getAsObject();
        results.push(row);
      }

      stmt.free();
      return results;
    } catch (error) {
      throw new Error(`SQL Error: ${error.message}`);
    }
  }

  /**
   * Popula as tabelas com dados de seed
   */
  populateData(data) {
    // Employees
    if (data.employees) {
      const stmt = this.db.prepare(`
        INSERT INTO employees (id, name, department, salary, hire_date, manager_id)
        VALUES (?, ?, ?, ?, ?, ?)
      `);

      for (const emp of data.employees) {
        stmt.run([emp.id, emp.name, emp.department, emp.salary, emp.hire_date, emp.manager_id]);
      }

      stmt.free();
    }

    // Departments
    if (data.departments) {
      const stmt = this.db.prepare(`
        INSERT INTO departments (id, name, budget)
        VALUES (?, ?, ?)
      `);

      for (const dept of data.departments) {
        stmt.run([dept.id, dept.name, dept.budget]);
      }

      stmt.free();
    }

    // Projects
    if (data.projects) {
      const stmt = this.db.prepare(`
        INSERT INTO projects (id, name, department_id, budget, start_date)
        VALUES (?, ?, ?, ?, ?)
      `);

      for (const proj of data.projects) {
        stmt.run([proj.id, proj.name, proj.department_id, proj.budget, proj.start_date]);
      }

      stmt.free();
    }

    // Assignments
    if (data.assignments) {
      const stmt = this.db.prepare(`
        INSERT INTO assignments (employee_id, project_id, hours)
        VALUES (?, ?, ?)
      `);

      for (const assign of data.assignments) {
        stmt.run([assign.employee_id, assign.project_id, assign.hours]);
      }

      stmt.free();
    }
  }

  /**
   * Fecha a conexão com o banco
   */
  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  /**
   * Retorna informações sobre as tabelas (útil para debugging)
   */
  getTables() {
    const tables = this.query(`
      SELECT name FROM sqlite_master
      WHERE type='table'
      ORDER BY name
    `);
    return tables.map(t => t.name);
  }

  /**
   * Retorna informações sobre colunas de uma tabela
   */
  getTableInfo(tableName) {
    return this.query(`PRAGMA table_info(${tableName})`);
  }
}

module.exports = DatabaseManager;
