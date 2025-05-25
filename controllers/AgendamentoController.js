// controllers/AgendamentoController.js
exports.criarAgendamento = async (req, res) => {
    console.log('Conteúdo do req.body para Agendamento:', req.body); // Adicione esta linha
    const { usuarios_id, data_hora_inicio, data_hora_fim, descricao, salas_ids } = req.body;

    if (!usuarios_id || !data_hora_inicio || !data_hora_fim) {
        return res.status(400).json({ error: 'ID do usuário, data de início e fim são obrigatórios.' });
    }
    // ... restante do código
};
const pool = require('../config/db');

// Criar um novo agendamento
exports.criarAgendamento = async (req, res) => {
    // ATENÇÃO: 'usuarios_id' (plural) e sem 'descricao', datas são DATE
    const { usuarios_id, data_hora_inicio, data_hora_fim, salas_ids } = req.body;

    // Validações básicas
    if (!usuarios_id || !data_hora_inicio || !data_hora_fim) {
        return res.status(400).json({ error: 'ID do usuário, data de início e fim são obrigatórios.' });
    }

    // A validação de data_hora_inicio < data_hora_fim é mais complexa para tipo DATE puro.
    // Você pode precisar de uma lógica de negócio mais sofisticada ou mudar para TIMESTAMP.
    // Por enquanto, vamos manter uma validação simples de que são datas válidas.
    if (isNaN(new Date(data_hora_inicio).getTime()) || isNaN(new Date(data_hora_fim).getTime())) {
        return res.status(400).json({ error: 'Datas de início ou fim inválidas.' });
    }
    // Note: Com tipo DATE, não há validação de hora. Se você precisa de hora, mude para TIMESTAMP.
    // Ex: Se data_hora_inicio for '2025-05-24' e data_hora_fim for '2025-05-24', isso é válido para DATE.

    const client = await pool.connect(); // Inicia uma transação
    try {
        await client.query('BEGIN'); // Inicia a transação

        // 1. Inserir o agendamento principal
        const agendamentoQuery = `
            INSERT INTO agendamentos (usuarios_id, data_hora_inicio, data_hora_fim)
            VALUES ($1, $2, $3) RETURNING *;
        `;
        const agendamentoValues = [usuarios_id, data_hora_inicio, data_hora_fim];
        const agendamentoResult = await client.query(agendamentoQuery, agendamentoValues);
        const novoAgendamento = agendamentoResult.rows[0];

        // 2. Lidar com as salas associadas (se houver)
        if (Array.isArray(salas_ids) && salas_ids.length > 0) {
            // Opcional: Validar se as salas_ids existem
            const existingRoomsCheck = await client.query('SELECT id FROM salas WHERE id = ANY($1::int[])', [salas_ids]);
            if (existingRoomsCheck.rows.length !== salas_ids.length) {
                 await client.query('ROLLBACK');
                 return res.status(400).json({ error: 'Uma ou mais salas fornecidas não existem.' });
            }

            const salaAgendamentoQueries = salas_ids.map((salaId, index) => {
                return `INSERT INTO salas_agendamentos (salas_id, agendamentos_id) VALUES ($${index * 2 + 1}, $${index * 2 + 2});`;
            }).join('\n');
            const salaAgendamentoValues = [];
            salas_ids.forEach(salaId => {
                salaAgendamentoValues.push(salaId, novoAgendamento.id);
            });

            await client.query(salaAgendamentoQueries, salaAgendamentoValues);
        }

        await client.query('COMMIT'); // Confirma a transação
        res.status(201).json(novoAgendamento);

    } catch (err) {
        await client.query('ROLLBACK'); // Desfaz a transação em caso de erro
        console.error('Erro ao criar agendamento:', err);
        res.status(500).json({ error: err.message });
    } finally {
        client.release(); // Libera o cliente do pool
    }
};

// Listar todos os agendamentos (e suas salas associadas)
exports.listarAgendamentos = async (req, res) => {
    try {
        const query = `
            SELECT
                a.id,
                a.usuarios_id,
                a.data_hora_inicio,
                a.data_hora_fim,
                json_agg(json_build_object('id', s.id, 'nome', s.nome)) AS salas_agendadas
            FROM agendamentos a
            LEFT JOIN salas_agendamentos sa ON a.id = sa.agendamentos_id -- 'agendamentos_id' aqui
            LEFT JOIN salas s ON sa.salas_id = s.id -- 'salas_id' aqui
            GROUP BY a.id
            ORDER BY a.data_hora_inicio;
        `;
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Erro ao listar agendamentos:', err);
        res.status(500).json({ error: err.message });
    }
};

// Obter agendamento por ID (com salas associadas)
exports.getAgendamentoById = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT
                a.id,
                a.usuarios_id,
                a.data_hora_inicio,
                a.data_hora_fim,
                json_agg(json_build_object('id', s.id, 'nome', s.nome)) AS salas_agendadas
            FROM agendamentos a
            LEFT JOIN salas_agendamentos sa ON a.id = sa.agendamentos_id
            LEFT JOIN salas s ON sa.salas_id = s.id
            WHERE a.id = $1
            GROUP BY a.id;
        `;
        const result = await pool.query(query, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Agendamento não encontrado.' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao obter agendamento por ID:', err);
        res.status(500).json({ error: err.message });
    }
};

// Atualizar um agendamento (incluindo salas)
exports.atualizarAgendamento = async (req, res) => {
    const { id } = req.params;
    // ATENÇÃO: 'usuarios_id' (plural) e sem 'descricao', datas são DATE
    const { usuarios_id, data_hora_inicio, data_hora_fim, salas_ids } = req.body;

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        let setClauses = [];
        let values = [];
        let paramIndex = 1;

        if (usuarios_id !== undefined) {
            setClauses.push(`usuarios_id = $${paramIndex++}`);
            values.push(usuarios_id);
        }
        if (data_hora_inicio !== undefined) {
             if (isNaN(new Date(data_hora_inicio).getTime())) {
                await client.query('ROLLBACK');
                return res.status(400).json({ error: 'Data de início inválida.' });
            }
            setClauses.push(`data_hora_inicio = $${paramIndex++}`);
            values.push(data_hora_inicio);
        }
        if (data_hora_fim !== undefined) {
            if (isNaN(new Date(data_hora_fim).getTime())) {
                await client.query('ROLLBACK');
                return res.status(400).json({ error: 'Data de fim inválida.' });
            }
            setClauses.push(`data_hora_fim = $${paramIndex++}`);
            values.push(data_hora_fim);
        }

        if (setClauses.length === 0 && salas_ids === undefined) {
             await client.query('ROLLBACK');
            return res.status(400).json({ error: 'Nenhum campo fornecido para atualização.' });
        }

        values.push(id); // ID do agendamento é o último parâmetro para a query principal

        if (setClauses.length > 0) {
            const updateAgendamentoQuery = `
                UPDATE agendamentos
                SET ${setClauses.join(', ')}
                WHERE id = $${paramIndex} RETURNING *;
            `;
            await client.query(updateAgendamentoQuery, values);
        }

        // Lidar com as salas associadas (se salas_ids for fornecido)
        if (salas_ids !== undefined) {
            if (!Array.isArray(salas_ids)) {
                await client.query('ROLLBACK');
                return res.status(400).json({ error: 'salas_ids deve ser um array.' });
            }

            if (salas_ids.length > 0) {
                const existingRoomsCheck = await client.query('SELECT id FROM salas WHERE id = ANY($1::int[])', [salas_ids]);
                if (existingRoomsCheck.rows.length !== salas_ids.length) {
                     await client.query('ROLLBACK');
                     return res.status(400).json({ error: 'Uma ou mais salas fornecidas não existem.' });
                }
            }

            // Remover associações antigas
            await client.query('DELETE FROM salas_agendamentos WHERE agendamentos_id = $1', [id]);

            // Adicionar novas associações
            if (salas_ids.length > 0) {
                const salaAgendamentoQueries = salas_ids.map((salaId, index) => {
                    return `INSERT INTO salas_agendamentos (salas_id, agendamentos_id) VALUES ($${index * 2 + 1}, $${index * 2 + 2});`;
                }).join('\n');
                const salaAgendamentoValues = [];
                salas_ids.forEach(salaId => {
                    salaAgendamentoValues.push(salaId, id);
                });
                await client.query(salaAgendamentoQueries, salaAgendamentoValues);
            }
        }

        await client.query('COMMIT');

        const updatedAgendamento = await client.query(`
            SELECT
                a.id,
                a.usuarios_id,
                a.data_hora_inicio,
                a.data_hora_fim,
                json_agg(json_build_object('id', s.id, 'nome', s.nome)) AS salas_agendadas
            FROM agendamentos a
            LEFT JOIN salas_agendamentos sa ON a.id = sa.agendamentos_id
            LEFT JOIN salas s ON sa.salas_id = s.id
            WHERE a.id = $1
            GROUP BY a.id;
        `, [id]);


        if (updatedAgendamento.rows.length === 0) {
            return res.status(404).json({ message: 'Agendamento não encontrado após atualização (problema interno).' });
        }
        res.status(200).json(updatedAgendamento.rows[0]);

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Erro ao atualizar agendamento:', err);
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
};

// Excluir um agendamento
exports.excluirAgendamento = async (req, res) => {
    const { id } = req.params;

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const result = await client.query('DELETE FROM agendamentos WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ message: 'Agendamento não encontrado para exclusão.' });
        }

        await client.query('COMMIT');
        res.status(200).json({ message: 'Agendamento excluído com sucesso.' });

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Erro ao excluir agendamento:', err);
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
};