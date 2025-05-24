// routes/index.js
const express = require('express');
const router = express.Router();

const TarefaController = require('../controllers/TarefaController');
const UsuarioController = require('../controllers/usuarioController');

// Rotas para tarefas
router.post('/tarefas', TarefaController.criarTarefa);
router.get('/tarefas', TarefaController.listarTarefas);
router.put('/tarefas/:id', TarefaController.editarTarefa);
router.delete('/tarefas/:id', TarefaController.excluirTarefa);

// 🔥 Rotas para usuários
router.get('/usuarios', UsuarioController.listarUsuarios);
router.get('/usuarios/:id', UsuarioController.obterUsuario);
router.post('/usuarios', UsuarioController.criarUsuario);
router.put('/usuarios/:id', UsuarioController.atualizarUsuario); 
router.delete('/usuarios/:id', UsuarioController.excluirUsuario);


module.exports = router;