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

// Função auxiliar para validar o formato de data/hora para blocos de 4 horas
function validarBlocoQuatroHoras(dataHora) {
  const data = new Date(dataHora);
  
  // Verifica se a hora é divisível por 4 (00:00, 04:00, 08:00, 12:00, 16:00, 20:00)
  if (data.getHours() % 4 !== 0) {
    return false;
  }
  
  // Verifica se os minutos e segundos são zero
  if (data.getMinutes() !== 0 || data.getSeconds() !== 0) {
    return false;
  }
  
  return true;
}

// Função auxiliar para calcular a data de fim (4 horas após o início)
function calcularDataFim(dataInicio) {
  const dataFim = new Date(dataInicio);
  dataFim.setHours(dataFim.getHours() + 4);
  return dataFim;
}

// Verificar disponibilidade de uma sala em uma data/hora específica
exports.verificarDisponibilidade = async (req, res) => {
  try {
    const { sala_id, data, hora } = req.query;
    
    if (!sala_id || !data || hora === undefined) {
      return res.status(400).json({ error: 'Sala, data e hora são obrigatórios para verificar disponibilidade.' });
    }
    
    // Converter para objetos Date
    const dataHoraInicio = new Date(`${data}T${hora.toString().padStart(2, '0')}:00:00`);
    const dataHoraFim = new Date(dataHoraInicio);
    dataHoraFim.setHours(dataHoraFim.getHours() + 4); // Bloco de 4 horas
    
    // Verificar se a data/hora já passou
    const agora = new Date();
    
    // Verificar se a data é hoje e se o horário já passou
    if (
      dataHoraInicio.getDate() === agora.getDate() && 
      dataHoraInicio.getMonth() === agora.getMonth() && 
      dataHoraInicio.getFullYear() === agora.getFullYear() && 
      parseInt(hora) <= agora.getHours()
    ) {
      return res.json({ disponivel: false, motivo: 'horario_passado' });
    }
    
    // Verificar se a data é anterior a hoje
    const hoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
    const dataVerificar = new Date(dataHoraInicio.getFullYear(), dataHoraInicio.getMonth(), dataHoraInicio.getDate());
    
    if (dataVerificar < hoje) {
      return res.json({ disponivel: false, motivo: 'data_passada' });
    }
    
    // Verificar se já existe agendamento para esta sala neste horário
    const query = `
      SELECT * FROM agendamentos 
      WHERE sala_id = $1 
      AND (
        (data_inicio <= $2 AND data_fim > $2) OR
        (data_inicio < $3 AND data_fim >= $3) OR
        (data_inicio >= $2 AND data_fim <= $3)
      )
    `;
    
    const result = await pool.query(query, [sala_id, dataHoraInicio, dataHoraFim]);
    
    // Se encontrou algum agendamento, a sala não está disponível
    const disponivel = result.rows.length === 0;
    
    return res.json({ 
      disponivel, 
      motivo: disponivel ? null : 'sala_ocupada' 
    });
  } catch (error) {
    console.error('Erro ao verificar disponibilidade:', error);
    return res.status(500).json({ error: 'Erro ao verificar disponibilidade.' });
  }
};

// Criar um novo agendamento
exports.criarAgendamento = async (req, res) => {
  try {
    const { sala_id, data_inicio, titulo, descricao } = req.body;
    const usuario_id = req.session?.usuario?.id || 1; // Usar ID do usuário da sessão ou um padrão para testes
    
    // Validações básicas
    if (!usuario_id || !sala_id || !data_inicio || !titulo) {
      return res.status(400).json({ 
        error: 'Dados incompletos. Usuário, sala, data de início e título são obrigatórios.' 
      });
    }
    
    // Extrair a hora da data_inicio
    const dataInicioObj = new Date(data_inicio);
    const hora = dataInicioObj.getHours();
    
    // Validar se a hora está em blocos de 4 horas (00, 04, 08, 12, 16, 20)
    if (![0, 4, 8, 12, 16, 20].includes(hora)) {
      return res.status(400).json({ 
        error: 'A hora de início deve ser em blocos de 4 horas (00:00, 04:00, 08:00, 12:00, 16:00, 20:00).' 
      });
    }
    
    // Verificar se a data/hora já passou
    const agora = new Date();
    const hoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
    const dataAgendamento = new Date(dataInicioObj.getFullYear(), dataInicioObj.getMonth(), dataInicioObj.getDate());
    
    // Se a data for anterior a hoje, não permite
    if (dataAgendamento < hoje) {
      return res.status(400).json({ error: 'Não é possível agendar para uma data que já passou.' });
    }
    
    // Se a data for hoje, verificar se o horário já passou
    if (
      dataAgendamento.getTime() === hoje.getTime() && 
      hora <= agora.getHours()
    ) {
      return res.status(400).json({ error: 'Não é possível agendar para um horário que já passou.' });
    }
    
    // Calcular data de fim (4 horas após o início)
    const dataFim = new Date(dataInicioObj);
    dataFim.setHours(dataFim.getHours() + 4);
    
    // Verificar disponibilidade
    const query = `
      SELECT * FROM agendamentos 
      WHERE sala_id = $1 
      AND (
        (data_inicio <= $2 AND data_fim > $2) OR
        (data_inicio < $3 AND data_fim >= $3) OR
        (data_inicio >= $2 AND data_fim <= $3)
      )
    `;
    
    const result = await pool.query(query, [sala_id, dataInicioObj, dataFim]);
    
    // Se encontrou algum agendamento, a sala não está disponível
    if (result.rows.length > 0) {
      return res.status(400).json({ error: 'Esta sala já está agendada para o horário selecionado.' });
    }
    
    // Verificar limite de 4 agendamentos por semana
    const inicioSemana = new Date(dataInicioObj);
    inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay()); // Domingo
    inicioSemana.setHours(0, 0, 0, 0);
    
    const fimSemana = new Date(inicioSemana);
    fimSemana.setDate(fimSemana.getDate() + 6); // Sábado
    fimSemana.setHours(23, 59, 59, 999);
    
    const agendamentosSemanais = await pool.query(
      'SELECT COUNT(*) FROM agendamentos WHERE usuario_id = $1 AND data_inicio >= $2 AND data_inicio <= $3',
      [usuario_id, inicioSemana, fimSemana]
    );
    
    if (parseInt(agendamentosSemanais.rows[0].count) >= 4) {
      return res.status(400).json({ error: 'Você já atingiu o limite de 4 agendamentos por semana.' });
    }
    
    // Criar o agendamento
    const insertQuery = `
      INSERT INTO agendamentos (usuario_id, sala_id, data_inicio, data_fim, titulo, descricao)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    
    const novoAgendamento = await pool.query(insertQuery, [
      usuario_id, sala_id, dataInicioObj, dataFim, titulo, descricao
    ]);
    
    return res.status(201).json(novoAgendamento.rows[0]);
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    return res.status(500).json({ error: 'Erro ao criar agendamento.' });
  }
};

// Listar todos os agendamentos
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
