// routes/index.js
const express = require('express');
const router = express.Router();

// Primeiro importamos os controllers
const TarefaController = require('../controllers/TarefaController');
const UsuarioController = require('../controllers/usuarioController');
const SalaController = require('../controllers/SalaController');
const AgendamentoController = require('../controllers/AgendamentoController');

// Adiciona a rota para a página de login
router.get('/login', (req, res) => {
  res.render('pages/login', {
    title: 'Login - Sistema de Reservas'
  });
});

router.get('/agendamentos', (req, res) => { //Callback da rota
  res.render('pages/agendamentos');
})

router.get('/confirmacaoAgendamento', (req, res) => {
  res.render('pages/confirmacaoAgendamento', {
    title: 'Confirmação de Agendamento - Sistema de Reservas'
  });
});

router.get('/confirmacaoAgendamentos', (req, res) => {
  res.render('pages/confirmacaoAgendamento', {
    title: 'Confirmação de Agendamento - Sistema de Reservas'
  });
});



// Rota de API para processar o login
router.post('/login', UsuarioController.loginUsuario);

// Rotas para tarefas
router.post('/tarefas', TarefaController.criarTarefa);
router.get('/tarefas', TarefaController.listarTarefas);
router.put('/tarefas/:id', TarefaController.editarTarefa);
router.delete('/tarefas/:id', TarefaController.excluirTarefa);

// Rotas para usuários
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

// Rota de API para criar agendamento
router.post('/api/agendamentos', AgendamentoController.criarAgendamento);

module.exports = router;

