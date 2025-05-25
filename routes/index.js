// routes/index.js
const express = require('express');
const router = express.Router();

const TarefaController = require('../controllers/TarefaController');
const UsuarioController = require('../controllers/usuarioController');
const SalaController = require('../controllers/SalaController');
const AgendamentoController = require('../controllers/AgendamentoController');


// Rotas para tarefas
router.post('/tarefas', TarefaController.criarTarefa);
router.get('/tarefas', TarefaController.listarTarefas);
router.put('/tarefas/:id', TarefaController.editarTarefa);
router.delete('/tarefas/:id', TarefaController.excluirTarefa);

//  Rotas para usuários
router.get('/usuarios', UsuarioController.listarUsuarios);
router.get('/usuarios/:id', UsuarioController.obterUsuario);
router.post('/usuarios', UsuarioController.criarUsuario);
router.put('/usuarios/:id', UsuarioController.atualizarUsuario); 
router.delete('/usuarios/:id', UsuarioController.excluirUsuario);


// Rotas para o CRUD de Salas
router.post('/salas', SalaController.criarSala);
router.get('/salas', SalaController.listarSalas);
router.get('/salas/:id', SalaController.getSalaById);
router.put('/salas/:id', SalaController.atualizarSala);
router.delete('/salas/:id', SalaController.excluirSala);


// Rotas para o CRUD de Agendamentos
router.post('/agendamentos', AgendamentoController.criarAgendamento);
router.get('/agendamentos', AgendamentoController.listarAgendamentos);
router.get('/agendamentos/:id', AgendamentoController.getAgendamentoById);
router.put('/agendamentos/:id', AgendamentoController.atualizarAgendamento);
router.delete('/agendamentos/:id', AgendamentoController.excluirAgendamento);


module.exports = router;

