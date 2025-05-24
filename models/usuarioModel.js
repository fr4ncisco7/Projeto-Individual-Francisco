// models/usuarioModel.js
const pool = require('../config/db'); // Verifique se o caminho está correto

async function getAllUsuarios() {
  const result = await pool.query('SELECT * FROM usuarios');
  return result.rows;
}

async function getUsuarioById(id) {
  const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
  return result.rows[0];
}

async function createUsuario(usuarioData) {
  const { nome, email, senha } = usuarioData;
  const data_cadastro = new Date().toISOString().slice(0, 10);
  const result = await pool.query(
    'INSERT INTO usuarios (nome, email, senha, data_cadastro) VALUES ($1, $2, $3, $4) RETURNING *',
    [nome, email, senha, data_cadastro]
  );
  return result.rows[0];
}

// *** ADICIONE ESTAS FUNÇÕES ABAIXO ***

async function updateUsuario(id, usuarioData) {
  const { nome, email, senha } = usuarioData;
  const result = await pool.query(
    'UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *',
    [nome, email, senha, id]
  );
  return result.rows[0]; // Retorna o usuário atualizado ou undefined se não encontrar
}

async function deleteUsuario(id) {
  const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING id', [id]);
  return result.rowCount > 0; // Retorna true se deletou algo, false caso contrário
}

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario, // Não esqueça de exportar!
  deleteUsuario, // Não esqueça de exportar!
};