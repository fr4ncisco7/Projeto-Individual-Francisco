const express = require('express');
const router = express.Router();

// Defina suas rotas aqui
router.get('/', (req, res) => {
  res.send('Bem-vindo à sua aplicação!');
});

// Exemplo de outra rota
router.get('/api/data', (req, res) => {
  res.json({ message: 'Dados da API' });
});

module.exports = router;