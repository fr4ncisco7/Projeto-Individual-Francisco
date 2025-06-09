const express = require('express');
const router = express.Router();

// Rota para a página de agendamentos
router.get('/agendamentos', (req, res) => {
  res.render('pages/agendamentos', {
    title: 'Agendamentos - Sistema de Reservas'
  });
});

// Rota para a página de salas
router.get('/salas', (req, res) => {
  res.render('pages/salas', {
    title: 'Salas - Sistema de Reservas'
  });
});

// Rota para a página de perfil do usuário
router.get('/perfil', (req, res) => {
  res.render('pages/perfil', {
    title: 'Meu Perfil - Sistema de Reservas'
  });
});

// Rota para logout (redireciona para a página inicial/login)
router.get('/logout', (req, res) => {
  // Aqui você implementaria a lógica de logout (destruir sessão, etc.)
  res.redirect('/');
});

// Rota para a página de confirmação de agendamento (com 's' no final)
router.get('/confirmacaoAgendamentos', (req, res) => {
  res.render('pages/confirmacaoAgendamento', {
    title: 'Confirmação de Agendamento - Sistema de Reservas'
  });
});

module.exports = router;
