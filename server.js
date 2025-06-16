const express = require('express');
const path = require('path');
const app = express();

// Configurando o EJS como template engine
app.set('view engine', 'ejs');
// Definindo a pasta de views
app.set('views', path.join(__dirname, 'views'));

// Configuração para servir arquivos estáticos
app.use(express.static(__dirname + '/public'));

app.use('/assets', express.static(path.join(__dirname, 'assets')));


// Middlewares para leitura de dados do corpo da requisição
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar rotas
const apiRoutes = require('./routes/index.js');
const frontRoutes = require('./routes/frontRoutes.js');

// Rota raiz - renderiza diretamente a página de login
app.get('/', (req, res) => {
  res.render('pages/login', {
    title: 'Login - Sistema de Reservas'
  });
});

// Usar rotas de frontend (exceto a raiz que já definimos acima)
app.use('/', frontRoutes);

// Importante: use as rotas de API e também as rotas normais do index.js
app.use('/', apiRoutes); // Adicione esta linha se não existir
app.use('/api', apiRoutes);

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
