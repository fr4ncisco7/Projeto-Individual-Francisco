# **Models**

Os models são parte da estrutura da arquitetura de software MVC e são responsáveis pela conexão com o banco de dados. Quando um endpoint recebe uma requisição e define o caminho específico para o controller, o controller processa esses dados e os envia para o model. Como o model está diretamente ligado ao banco de dados, ele é responsável por executar a operação.Neste projeto, como não usamos um ORM (como Sequelize), os Models estão embutidos diretamente nos Controllers por meio de comandos SQL.


## **usuarioModel.js** 
Este Model é a interface direta com a tabela de Usuários no seu banco de dados, responsável por todas as operações de persistência relacionadas aos dados do usuário.

## **getAllUsuarios()**

- Função: Busca e retorna uma lista de todos os usuários registrados no banco de dados.
- Chamado por: UsuarioController.listarUsuarios
add 

## **getUsuarioById(id)**

- Função: Busca e retorna os dados de um único usuário com base em seu ID.
- Chamado por: UsuarioController.obterUsuario


## **createUsuario({ nome, email, senha })**

- Função: Insere um novo registro de usuário no banco de dados.
- Chamado por: UsuarioController.criarUsuario


## **updateUsuario(id, { nome, email, senha })**

- Função: Atualiza as informações de um usuário existente, identificado pelo seu ID.
- Chamado por: UsuarioController.atualizarUsuario


## **deleteUsuario(id)**

- Função: Remove um registro de usuário do banco de dados com base em seu ID.
- Chamado por: UsuarioController.excluirUsuario



# **Operações do Model de Salas** 



## **Operação de Criação (INSERT INTO salas)**

- Função: Adiciona um novo registro de sala à tabela salas no banco de dados.
- Chamado por: exports.criarSala (dentro do SalaController.js)


## **Operação de Listagem (SELECT * FROM salas)**

- Função: Busca e retorna uma lista de todas as salas registradas no banco de dados.
- Chamado por: exports.listarSalas (dentro do SalaController.js)

## **Operação de Obtenção por ID (SELECT * FROM salas WHERE id = $1)**

- Função: Busca e retorna os dados de uma única sala com base em seu ID.
- Chamado por: exports.getSalaById (dentro do SalaController.js)


## **Operação de Atualização**

- Função: Modifica as informações de uma sala existente, identificada pelo seu ID.
- Chamado por: exports.atualizarSala (dentro do SalaController.js)


## **Operação de Exclusão (DELETE FROM salas WHERE id = $1)**

- Função: Remove um registro de sala do banco de dados com base em seu ID.
- Chamado por: exports.excluirSala (dentro do SalaController.js)



# **Operações do Model de Agendamentos** 

## **Operação de Criação de Agendamento (INSERT INTO agendamentos e INSERT INTO salas_agendamentos)**

- Função: Adiciona um novo registro de agendamento principal e estabelece as associações com as salas selecionadas.
- Chamado por: exports.criarAgendamento (dentro do AgendamentoController.js)


## **Operação de Listagem de Agendamentos (SELECT ... FROM agendamentos LEFT JOIN ...)**

- Função: Recupera todos os agendamentos existentes no banco de dados, incluindo as informações das salas associadas a cada agendamento.
- Chamado por: exports.listarAgendamentos (dentro do AgendamentoController.js)


## Operação de Obtenção de Agendamento por ID (SELECT ... FROM agendamentos ... WHERE a.id = $1)

- Função: Recupera os detalhes de um agendamento específico, identificado pelo seu ID, juntamente com suas salas associadas.
- Chamado por: exports.getAgendamentoById (dentro do AgendamentoController.js)


## **Operação de Atualização de Agendamento (UPDATE agendamentos, DELETE FROM salas_agendamentos, INSERT INTO salas_agendamentos)**

- Função: Modifica os atributos de um agendamento existente e/ou ajusta suas associações com as salas.
- Chamado por: exports.atualizarAgendamento (dentro do AgendamentoController.js)


## **Operação de Exclusão de Agendamento (DELETE FROM agendamentos)**

- Função: Remove um agendamento específico do banco de dados.
- Chamado por: exports.excluirAgendamento (dentro do AgendamentoController.js)
