# Boilerplate MVC em Node.js com PostgreSQL

Este projeto é uma plataforma de agendamento de salas de estudo feita para os moradores do prédio Arara Azul. Nela, é possível ver as salas disponíveis, verificar se há algum evento que possa interditar o acesso, consultar os horários e dicas de boas práticas do ambiente. Tudo isso porque conta com um banco de dados completo trabalhando para gerar a melhor experiência de funcionamento e de uso para o usuário.

## 1. Requisitos Prévios

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas em seu ambiente:

* **Node.js:** Versão 22.14.0 (ou compatível). Você pode baixar em [nodejs.org](https://nodejs.org/).

* **PostgreSQL:** Certifique-se de ter uma versão compatível instalada e o serviço do PostgreSQL em execução no seu sistema. Você pode baixar em [postgresql.org](https://www.postgresql.org/download/).

## 2. Instalação e Execução Local

Siga os passos abaixo para configurar e rodar o projeto em sua máquina:

1.  **Clone o repositório:**
    Abra seu terminal (Bash, PowerShell, CMD, etc.) e execute o comando para clonar o projeto do GitHub:

    ```
    git clone [https://github.com/fr4ncisco7/Projeto-Individual-Francisco](https://github.com/fr4ncisco7/Projeto-Individual-Francisco)
    ```

2.  **Navegue até o diretório do projeto:**
    Após a clonagem, entre na pasta principal do projeto:

    ```
    cd Projeto-Individual-Francisco
    ```

3.  **Instale as dependências:**
    Este comando instalará todas as bibliotecas e pacotes Node.js necessários, listados no arquivo `package.json`:

    ```
    npm install
    ```

4.  **Configure as variáveis de ambiente:**
    Variáveis de ambiente são essenciais para armazenar informações sensíveis (como credenciais de banco de dados) de forma segura.

    * Duplique o arquivo `.env.example` que está na raiz do projeto.

    * Renomeie a cópia para `.env`.

        * **No Linux/macOS:** `mv .env.example .env`

        * **No Windows (CMD):** `ren .env.example .env`

    * Edite o arquivo `.env` recém-criado e preencha as informações de conexão com o seu banco de dados PostgreSQL. As variáveis a serem configuradas são:

        * `DB_USER`

        * `DB_HOST`

        * `DB_DATABASE`

        * `DB_PASSWORD`

        * `DB_PORT`

    * **Observação:** O servidor está configurado para rodar na porta `3000`. Se desejar usar outra porta, adicione ou ajuste a linha `PORT=XXXX` no seu arquivo `.env` (onde `XXXX` é a porta desejada).

5.  **Crie e Inicialize o Banco de Dados:**
    Certifique-se de que o serviço do PostgreSQL está ativo em seu sistema. Este passo é crucial para criar as tabelas necessárias e popular o banco de dados com dados de exemplo.

    ```
    npm run init-db
    ```

    Isso executará o script SQL para criar a tabela `agendamentos`, `users` e outras, e inserirá alguns registros de exemplo no seu banco de dados PostgreSQL.

6.  **Inicie o Servidor:**
    Você tem duas opções para iniciar o servidor Node.js:

    * **Modo de Produção (para execução padrão):**

        ```
        npm start
        ```

    * **Modo de Desenvolvimento (recomendado durante o desenvolvimento, pois reinicia automaticamente o servidor após alterações no código):**

        ```
        npm run dev
        ```

    No terminal, você deverá ver uma mensagem indicando que o servidor está rodando na porta configurada (por exemplo, "Servidor rodando na porta 3000").

7.  **Acesse a Aplicação:**
    Com o servidor em execução, abra seu navegador web e digite o seguinte endereço para acessar a plataforma de agendamento:

    ```
    http://localhost:3000
    ```

    (Se você configurou uma porta diferente no `.env`, use essa porta no endereço).

## Funcionalidades

* **Padrão MVC:** Estrutura organizada em Model, View e Controller, facilitando a organização e manutenção do código.

* **PostgreSQL:** Banco de dados relacional robusto utilizado para persistência dos dados de agendamentos e usuários.

* **UUID:** Utilização de UUID (Universally Unique Identifier) como chave primária em tabelas, garantindo identificadores únicos globalmente.

* **Scripts com `nodemon`:** Utilização do `nodemon` para otimizar o fluxo de desenvolvimento, reiniciando automaticamente o servidor após cada alteração no código-fonte.

* **Testes:** Inclui estrutura básica para testes automatizados, assegurando a qualidade e a funcionalidade das principais lógicas.

## Scripts Disponíveis

* `npm start`: Inicia o servidor Node.js em modo de produção.

* `npm run dev`: Inicia o servidor com `nodemon`, para desenvolvimento com reinício automático.

* `npm run test`: Executa os testes automatizados do projeto com relatório de cobertura.

* `npm run test:coverage`: Executa os testes e gera um relatório detalhado de cobertura de código.

* `npm run init-db`: Executa o script SQL para inicialização do banco de dados.

## Estrutura de Diretórios

* **`config/`**: Contém `database.js` para configurações do banco de dados e outras configurações gerais do projeto.

* **`controllers/`**: Armazena os controladores da aplicação, responsáveis pela lógica de negócio e processamento das requisições (ex: `HomeController.js`, `AgendamentoController.js`).

* **`models/`**: Contém os modelos da aplicação, que definem a estrutura dos dados e as interações com o banco de dados (ex: `User.js`, `Agendamento.js`).

* **`routes/`**: Define as rotas da aplicação, mapeando URLs para as funções dos controladores (ex: `index.js`, `agendamentoRoutes.js`).

* **`services/`**: Inclui serviços auxiliares que encapsulam lógicas específicas, como `userService.js`.

* **`assets/`**: Diretório para arquivos públicos como imagens e fontes.

* **`scripts/`**: Contém scripts auxiliares, como o `runSQLScript.js` para inicialização do banco.

* **`styles/`**: Armazena arquivos CSS públicos para estilização das páginas.

* **`tests/`**: Inclui arquivos de testes unitários (ex: `example.test.js`).

* **`.gitignore`**: Arquivo para ignorar arquivos e diretórios específicos no controle de versão Git.

* **`.env`**: Arquivo para variáveis de ambiente (renomeado a partir de `.env.example`).

* **`jest.config.js`**: Arquivo de configuração do Jest para testes.

* **`package-lock.json`**: Gerenciado automaticamente pelo npm, registra as versões exatas das dependências.

* **`package.json`**: Gerenciador de dependências do Node.js, lista scripts e metadados do projeto.

* **`readme.md`**: Documentação principal do projeto.

* **`server.js`**: Arquivo principal que inicializa o servidor Express.

* **`srest.http`**: Arquivo para testar endpoints HTTP diretamente.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir um [issue](https://github.com/fr4ncisco7/Projeto-Individual-Francisco/issues) ou enviar um [pull request](https://github.com/fr4ncisco7/Projeto-Individual-Francisco/pulls).

## Licença

Este projeto está licenciado sob a Licença MIT.