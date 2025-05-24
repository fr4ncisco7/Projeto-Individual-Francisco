// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const routes = require('./routes'); // <--- COMENTE OU REMOVA ESTA LINHA

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// ADICIONE ESTE LOG AQUI
app.use((req, res, next) => {
    console.log(`Requisição Recebida: ${req.method} ${req.url}`);
    next(); // Não esqueça de chamar next() para passar para o próximo middleware/rota
});

// *** ADICIONE AQUI AS ROTAS DE USUÁRIO DIRETAMENTE NO SERVER.JS PARA TESTE ***
const UsuarioController = require('./controllers/usuarioController'); // Ajuste o caminho conforme necessário

app.get('/api/usuarios', UsuarioController.listarUsuarios);
app.get('/api/usuarios/:id', UsuarioController.obterUsuario);
app.post('/api/usuarios', UsuarioController.criarUsuario);
app.put('/api/usuarios/:id', UsuarioController.atualizarUsuario); // AQUI
app.delete('/api/usuarios/:id', UsuarioController.excluirUsuario);
//app.patch('/api/usuarios/:id', UsuarioController.atualizarParcialUsuario);

// app.use('/api', routes); // <--- COMENTE OU REMOVA ESTA LINHA POR ENQUANTO

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});