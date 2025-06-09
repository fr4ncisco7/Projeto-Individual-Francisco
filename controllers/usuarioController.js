// controllers/usuarioController.js
const usuarioModel = require('../models/usuarioModel');
const pool = require('../config/db');

// Função que já está funcionando
async function listarUsuarios(req, res) {
  try {
    const usuarios = await usuarioModel.getAllUsuarios();
    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
}

// Função para obter usuário por ID (GET /usuarios/:id)
async function obterUsuario(req, res) {
  try {
    const { id } = req.params;
    const usuario = await usuarioModel.getUsuarioById(id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    res.status(500).json({ error: 'Erro ao obter usuário' });
  }
}


async function criarUsuario(req, res) {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
    }
    const novoUsuario = await usuarioModel.createUsuario({ nome, email, senha });
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao criar usuário.' });
  }
}



async function atualizarUsuario(req, res) {
  try {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    
   
    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios para atualização.' });
    }

    const usuarioAtualizado = await usuarioModel.updateUsuario(id, { nome, email, senha });
    if (usuarioAtualizado) {
      res.json(usuarioAtualizado);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado para atualização.' });
    }
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao atualizar usuário.' });
  }
}

async function excluirUsuario(req, res) {
  try {
    const { id } = req.params;
    const sucesso = await usuarioModel.deleteUsuario(id);
    if (sucesso) {
      res.status(204).send(); 
    } else {
      res.status(404).json({ error: 'Usuário não encontrado para exclusão.' });
    }
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao excluir usuário.' });
  }
}


async function loginUsuario(req, res) {
  try {
    const { email, senha } = req.body;
    
    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }
    
    // Buscar usuário pelo email
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const result = await pool.query(query, [email]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }
    
    const usuario = result.rows[0];
    
    // Em um sistema real, você deve comparar senhas com hash
    // Aqui estamos fazendo uma comparação simples para demonstração
    if (senha !== usuario.senha) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }
    
    // Aqui você poderia implementar JWT ou sessões
    // Para simplificar, apenas retornamos sucesso
    res.status(200).json({ 
      message: 'Login realizado com sucesso',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao fazer login.' });
  }
}

module.exports = {
  listarUsuarios,
  obterUsuario,
  criarUsuario,
  atualizarUsuario, 
  excluirUsuario,
  loginUsuario
};
