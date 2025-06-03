const express = require('express');
const path = require('path');
const app = express();

// Configurando o EJS como template engine
app.set('view engine', 'ejs');
// Definindo a pasta de views
app.set('views', path.join(__dirname, 'views'));

// Configurando o diretório de arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares para leitura de dados do corpo da requisição
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas da API
const usuarioRoutes = require('./routes/index.js');
app.use('/', usuarioRoutes);



// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});