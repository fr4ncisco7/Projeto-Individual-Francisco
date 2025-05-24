const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');

// Endpoint para listar todos os usuários
router.get('/usuarios', UsuarioController.listarUsuarios);

// Endpoint para obter um usuário específico pelo ID
router.get('/usuarios/:id', UsuarioController.obterUsuario);

// Endpoint para criar um novo usuário
router.post('/usuarios', UsuarioController.criarUsuario);

module.exports = router;
