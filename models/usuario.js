const db = require('../config/db');

module.exports = {
  async create(data) {
    const query = 'INSERT INTO usuario (nome, email, sala_id) VALUES ($1, $2, $3)';
    const values = [data.nome, data.email, data.sala_id || null];
    return db.query(query, values);
  },

  async findAllComSala() {
    const query = `
      SELECT usuario.id, usuario.nome, usuario.email, sala.nome AS sala
      FROM usuario
      LEFT JOIN sala ON usuario.sala_id = sala.id
      ORDER BY usuario.id ASC
    `;
    const result = await db.query(query);
    return result.rows;
  },

  async findBySala(sala_id) {
    const query = 'SELECT usuario.id, usuario.nome, usuario.email FROM usuario WHERE sala_id = $1 ORDER BY nome ASC';
    const result = await db.query(query, [sala_id]);
    return result.rows;
  },

  async update(id, data) {
    const query = 'UPDATE usuario SET nome = $1, email = $2 WHERE id = $3';
    const values = [data.nome, data.email, id];
    return db.query(query, values);
  },

  async delete(id) {
    const query = 'DELETE FROM usuario WHERE id = $1';
    return db.query(query, [id]);
  }
};
