// models/usuarioModel.js

// Log para confirmar que este arquivo está sendo carregado
console.log('--- NOVO usuarioModel.js CARREGADO. Caminho: ' + __filename + ' ---');

const pool = require('../config/db'); // Verifique se o caminho do seu pool está correto

// Funções placeholder para o teste
async function getAllUsuarios() { return []; }
async function getUsuarioById(id) { return null; }
async function createUsuario(usuarioData) { return null; }
async function deleteUsuario(id) { return false; }


// *** FUNÇÃO updateUsuario COM DEPURADOR ***
async function updateUsuario(id, usuarioData) {
    console.log('Debug: Dentro de updateUsuario. ID recebido:', id, 'Tipo:', typeof id);
    console.log('Debug: Dados recebidos para update:', usuarioData);

    const { nome, email, senha } = usuarioData;

    // Se o id não for um número, vamos logar e lançar um erro específico
    if (isNaN(Number(id))) {
        const errorMsg = `Erro Crítico: ID (${id}) não é um número válido para atualização. Tipo: ${typeof id}.`;
        console.error(errorMsg);
        throw new Error(errorMsg);
    }

    const query = `
        UPDATE usuarios
        SET nome = $1, email = $2, senha = $3
        WHERE id = $4
        RETURNING *;
    `;
    const params = [nome, email, senha, id];

    console.log('Debug: Query SQL:', query);
    console.log('Debug: Parâmetros da Query:', params);

    try {
        // LINHA 28 AGORA É AQUI (ou próxima, dependendo de como você colou)
        const result = await pool.query(query, params);
        console.log('Debug: Resultado do update:', result.rows[0]);
        return result.rows[0]; // Retorna o usuário atualizado ou undefined se não encontrar
    } catch (error) {
        console.error('Debug: ERRO NA EXECUÇÃO DO BANCO DE DADOS EM updateUsuario:', error);
        throw error; // Re-lança o erro para ser capturado no controller
    }
}

module.exports = {
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
};