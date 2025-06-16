// controllers/SalaController.js
const pool = require('../config/db');

// Criar uma nova sala
exports.criarSala = async (req, res) => {
    exports.criarSala = async (req, res) => {
    console.log('Conteúdo do req.body para Sala:', req.body); // Adicione esta linha
    const { nome, capacidade, disponibilidade } = req.body;

    if (!nome || typeof capacidade === 'undefined') {
        return res.status(400).json({ error: 'Nome e capacidade da sala são obrigatórios.' });
    }
    // ... restante do código
};
    // Apenas nome, capacidade, disponibilidade (sem localizacao)
    const { nome, capacidade, disponibilidade } = req.body;

    if (!nome || typeof capacidade === 'undefined') {
        return res.status(400).json({ error: 'Nome e capacidade da sala são obrigatórios.' });
    }
    if (typeof capacidade !== 'number' || capacidade <= 0) {
        return res.status(400).json({ error: 'Capacidade deve ser um número inteiro positivo.' });
    }
    // 'disponibilidade' pode ser undefined, mas se vier, deve ser booleano
    if (typeof disponibilidade !== 'undefined' && typeof disponibilidade !== 'boolean') {
        return res.status(400).json({ error: 'Disponibilidade deve ser um valor booleano.' });
    }

    const query = 'INSERT INTO salas (nome, capacidade, disponibilidade) VALUES ($1, $2, $3) RETURNING *';
    // Use 'disponibilidade' ou seu valor padrão se não fornecido
    const values = [nome, capacidade, disponibilidade === undefined ? true : disponibilidade];

    try {
        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.code === '23505' && err.constraint && err.constraint.includes('nome')) { // Checar erro de UNIQUE para 'nome'
            return res.status(409).json({ error: 'Já existe uma sala com este nome.' });
        }
        console.error('Erro ao criar sala:', err);
        res.status(500).json({ error: err.message });
    }
};

// Listar todas as salas
exports.listarSalas = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM salas');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Erro ao listar salas:', err);
        res.status(500).json({ error: err.message });
    }
};

// Obter sala por ID
exports.getSalaById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM salas WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Sala não encontrada.' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao obter sala por ID:', err);
        res.status(500).json({ error: err.message });
    }
};

// Atualizar uma sala
exports.atualizarSala = async (req, res) => {
    const { id } = req.params;
    // Apenas nome, capacidade, disponibilidade 
    const { nome, capacidade, disponibilidade } = req.body;

    let setClauses = [];
    let values = [];
    let paramIndex = 1;

    if (nome !== undefined) {
        setClauses.push(`nome = $${paramIndex++}`);
        values.push(nome);
    }
    if (capacidade !== undefined) {
        if (typeof capacidade !== 'number' || capacidade <= 0) {
            return res.status(400).json({ error: 'Capacidade deve ser um número inteiro positivo.' });
        }
        setClauses.push(`capacidade = $${paramIndex++}`);
        values.push(capacidade);
    }
    if (disponibilidade !== undefined) {
        if (typeof disponibilidade !== 'boolean') {
            return res.status(400).json({ error: 'Disponibilidade deve ser um valor booleano.' });
        }
        setClauses.push(`disponibilidade = $${paramIndex++}`);
        values.push(disponibilidade);
    }

    if (setClauses.length === 0) {
        return res.status(400).json({ error: 'Nenhum campo fornecido para atualização.' });
    }

    values.push(id); // ID é o último parâmetro

    const query = `
        UPDATE salas
        SET ${setClauses.join(', ')}
        WHERE id = $${paramIndex} RETURNING *;
    `;

    try {
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Sala não encontrada para atualização.' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        if (err.code === '23505' && err.constraint && err.constraint.includes('nome')) {
            return res.status(409).json({ error: 'Já existe uma sala com este nome.' });
        }
        console.error('Erro ao atualizar sala:', err);
        res.status(500).json({ error: err.message });
    }
};

// Excluir uma sala
exports.excluirSala = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM salas WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Sala não encontrada para exclusão.' });
        }
        res.status(200).json({ message: 'Sala excluída com sucesso.' });
    } catch (err) {
        console.error('Erro ao excluir sala:', err);
        res.status(500).json({ error: err.message });
    }
};