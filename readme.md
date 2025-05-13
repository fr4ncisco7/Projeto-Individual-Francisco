# Boilerplate MVC em Node.js com PostgreSQL

Este projeto é uma plataforma de agendamento de salas de estudo feita para os moradores do prédio Arara Azul. Nela, é possível ver as salas disponíveis, verificar se há algum evento que possa interditar o acesso, consultar os horários e dicas de boas práticas do ambiente. Tudo isso porque conta com um banco de dados completo trabalhando para gerar a melhor experiência de funcionamento e de uso para o usuário.

## Requisitos

- Node.js (versão X.X.X)
- PostgreSQL (versão X.X.X)

## Instalação

### Como execultar o projeto localmente:
1. **Abra o seu terminal Bash e clone o repositório:**

```bash
   git clone https://github.com/fr4ncisco7/Projeto-Individual-Francisco
```


2. **Instalar as dependências:**
    
```bash
npm install
```
    
3. **Configure as variáveis de ambiente:**

Mudar o nome do arquivo: Pegue esse arquivo .env.example e renomeie-o para .env. Basicamente, você está removendo o ".example" do nome.


4. **Iniciar o servidor:**

```bash
npm install
```
ou
```bash
node server.js
```

OBS: A porta desse servidor foi alterada para 8080

4. **Acesse o servidor:**
```bash
http://localhost:8080
```



Configuração do Banco de Dados
------------------------------

1. **Criar banco de dados:**
    
    Certifique-se de que existe um banco de dados PostgreSQL com o nome definido no seu arquivo .env.
    
2. **Executar o script SQL de inicialização:**
    
```bash
npm run init-db
```
    
Isso criará a tabela `users` no seu banco de dados PostgreSQL com UUID como chave primária e inserirá alguns registros de exemplo.
    

Funcionalidades
---------------

* **Padrão MVC:** Estrutura organizada em Model, View e Controller.
* **PostgreSQL:** Banco de dados relacional utilizado para persistência dos dados.
* **UUID:** Utilização de UUID como chave primária na tabela `users`.
* **Scripts com `nodemon`:** Utilização do `nodemon` para reiniciar automaticamente o servidor após alterações no código.
* **Testes:** Inclui estrutura básica para testes automatizados.

Scripts Disponíveis
-------------------

* `npm start`: Inicia o servidor Node.js.
* `npm run dev`: Inicia o servidor com `nodemon`, reiniciando automaticamente após alterações no código.
* `npm run test`: Executa os testes automatizados.
* `npm run test:coverage`: Executa os testes e gera um relatório de cobertura de código.

Estrutura de Diretórios
-----------------------

* **`config/`** -> `database.js`: Configurações do banco de dados e outras configurações do projeto. 


* **`controllers/`** -> `HomeController.js`: Controladores da aplicação (lógica de negócio). -> 

* **`models/`** -> `User.js`: Modelos da aplicação (definições de dados e interações com o banco de dados). 

* **`routes/`** -> `index.js`: Rotas da aplicação. 

* **`services/`** -> `userService.js`: TServiços auxiliares do sistema. 

* **`assets/ `**: Arquivos públicos como imagens e fontes.

* **`scripts/  `**: Arquivos de JavaScript públicos.

* **`styles/ `**: Arquivos CSS públicos.

* **`tests/ `** -> `example.test.js`: Arquivos de testes unitários. 

* **`.gitignore  `**: Arquivo para ignorar arquivos no Git.

* **`.env `**: Arquivo de exemplo para variáveis de ambient.

* **`jest.config.js  `**: Arquivo de configuração do Jest

* **`package-lock.json  `**: Gerenciador de dependências do Node.js

* **`package.json  `**: Gerenciador de dependências do Node.js

* **`readme.md  `**: Documentação do projeto (Markdown).

* **`server.js  `**: Arquivo principal que inicializa o servidor.

* **`srest.http  `**: Teste de endpoints.
Contribuição
------------

Contribuições são bem-vindas! Sinta-se à vontade para abrir um issue ou enviar um pull request.

Licença
-------

Este projeto está licenciado sob a Licença MIT.

Este README.md fornece uma visão geral clara do boilerplate, incluindo instruções de instalação, configuração do banco de dados, funcionalidades principais, scripts disponíveis, estrutura de diretórios, como contribuir e informações de licença. Certifique-se de personalizar as seções com detalhes específicos do seu projeto conforme necessário.