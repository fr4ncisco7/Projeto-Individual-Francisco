// controllers/TarefaController.js
const pool = require('../config/db'); // Verifique o caminho para o seu pool

// Criar uma nova tarefa
exports.criarTarefa = async (req, res) => {
    const { nome, descricao } = req.body;

    if (!nome) {
        return res.status(400).json({ error: 'O nome da tarefa é obrigatório.' });
    }

    const query = 'INSERT INTO tarefas (nome, descricao) VALUES ($1, $2) RETURNING *';
    const values = [nome, descricao];

    try {
        const result = await pool.query(query, values);
        const tarefa = result.rows[0];
        res.status(201).json(tarefa);
    } catch (err) {
        console.error('Erro ao criar tarefa:', err);
        res.status(500).json({ error: err.message });
    }
};

// Listar todas as tarefas
exports.listarTarefas = async (req, res) => {
    const query = 'SELECT * FROM tarefas';

    try {
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Erro ao listar tarefas:', err);
        res.status(500).json({ error: err.message });
    }
};

// Editar uma tarefa
exports.editarTarefa = async (req, res) => {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    let setClauses = [];
    let values = [];
    let paramIndex = 1;

    if (nome !== undefined) {
        setClauses.push(`nome = $${paramIndex++}`);
        values.push(nome);
    }
    if (descricao !== undefined) {
        setClauses.push(`descricao = $${paramIndex++}`);
        values.push(descricao);
    }

    if (setClauses.length === 0) {
        return res.status(400).json({ error: 'Nenhum campo fornecido para atualização.' });
    }

    values.push(id);

    const query = `
        UPDATE tarefas
        SET ${setClauses.join(', ')}
        WHERE id = $${paramIndex} RETURNING *;
    `;

    try {
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao editar tarefa:', err);
        res.status(500).json({ error: err.message });
    }
};

// Excluir uma tarefa
exports.excluirTarefa = async (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM tarefas WHERE id = $1 RETURNING *';
    const values = [id];

    try {
        // CORRIGIDO AQUI: Passar o array 'values' para a query
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }
        res.status(200).json({ message: 'Tarefa excluída com sucesso' });
    } catch (err) {
        console.error('Erro ao excluir tarefa:', err);
        res.status(500).json({ error: err.message });
    }
};