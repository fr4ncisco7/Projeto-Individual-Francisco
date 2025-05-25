# **Endpoints (Rotas da API)**
Os endpoints são as rotas que fazem a ligação entre as URLs e os métodos HTTP. Nesse sentido, cada endpoint carrega uma requisição HTTP (GET, PUT, DELETE, POST) e o caminho (URL), funcionando como um endereço específico para onde essa requisição deve ir. Assim, cada endpoint está associado a um método HTTP diferente e direciona a requisição para uma função específica do controller.



# **Rotas para Usuários**
Essas rotas são a interface para gerenciar os dados dos usuários e se conectam ao UsuarioController.

### **GET / usuarios:**

- Função: Lista todos os usuários cadastrados no sistema.
- Controller: UsuarioController.listarUsuarios
- Fluxo: O UsuarioController solicita ao Model de Usuários que traga todos os registros de usuários do banco de dados e os retorna.

### **GET /usuarios/:id :**

- Função: Obtém os detalhes de um usuário específico, identificado pelo seu ID.
- Controller: UsuarioController.obterUsuario
- Fluxo: Recebe o ID do usuário na URL. O UsuarioController consulta o Model de Usuários para buscar os dados daquele usuário em particular no banco de dados.

### **POST /usuarios:**

- Função: Cria um novo usuário no sistema. Isso pode estar ligado à função de "Criar" na tela de Login ou um cadastro separado.
- Controller: UsuarioController.criarUsuario
- Fluxo: Recebe os dados do novo usuário (como nome, e-mail, senha) no corpo da requisição. O UsuarioController valida esses dados e instrui o Model de Usuários a inseri-los na tabela de Usuários do banco de dados.

### **PUT /usuarios/:id :**

- Função: Atualiza as informações de um usuário existente, identificado pelo seu ID.
- Controller: UsuarioController.atualizarUsuario
- Fluxo: Recebe o ID do usuário na URL e os dados a serem atualizados no corpo da requisição. O UsuarioController envia essas informações ao Model de Usuários para que o registro seja modificado no banco de dados.

### **DELETE /usuarios/:id :**

- Função: Exclui um usuário do sistema, identificado pelo seu ID.
- Controller: UsuarioController.excluirUsuario
- Fluxo: Recebe o ID do usuário na URL. O UsuarioController coordena com o Model de Usuários para remover o registro correspondente do banco de dados.

# **Rotas para Salas**

Essas rotas permitem a gestão das salas disponíveis para agendamento e se conectam ao SalaController.

### **POST /salas:**

- Função: Cria uma nova sala.
- Controller: SalaController.criarSala
- Fluxo: Recebe os detalhes da nova sala (nome, capacidade) no corpo da requisição. O SalaController instrui o Model de Salas a adicionar este novo registro à tabela de Salas.

### **GET /salas:**

- Função: Lista todas as salas cadastradas.
- Controller: SalaController.listarSalas
- Fluxo: O SalaController solicita ao Model de Salas que retorne todos os registros da tabela de Salas no banco de dados.

### **GET /salas/:id :**

- Função: Obtém os detalhes de uma sala específica, identificado pelo seu ID.
- Controller: SalaController.getSalaById
- Fluxo: Recebe o ID da sala na URL. O SalaController consulta o Model de Salas para buscar os dados daquela sala em particular no banco de dados.

### **PUT /salas/:id :**

- Função: Atualiza as informações de uma sala existente, identificado pelo seu ID.
- Controller: SalaController.atualizarSala
- Fluxo: Recebe o ID da sala na URL e os dados a serem atualizados. O SalaController envia essas informações ao Model de Salas para que o registro seja modificado.

### **DELETE /salas/:id :**

- Função: Exclui uma sala do sistema, identificado pelo seu ID.
- Controller: SalaController.excluirSala
- Fluxo: Recebe o ID da sala na URL. O SalaController coordena com o Model de Salas para remover o registro correspondente.
Rotas para Agendamentos
Essas rotas são fundamentais para o processo de agendamento e se conectam ao AgendamentoController.

### **POST /agendamentos:**

- Função: Cria um novo agendamento de sala. Este endpoint seria acionado após a confirmação na tela de Confirmação_Agendamento.
- Controller: AgendamentoController.criarAgendamento
- Fluxo: Recebe os detalhes do agendamento (IDs de usuário e sala, data/hora de início e fim) no corpo da requisição. O AgendamentoController valida esses dados, verifica a disponibilidade via Model de Agendamentos (e talvez Model de Salas), e se tudo estiver ok, instrui o Model de Agendamentos a registrar o novo agendamento na tabela de Agendamentos.

### **GET /agendamentos:**

- Função: Lista todos os agendamentos registrados.
- Controller: AgendamentoController.listarAgendamentos
- Fluxo: O AgendamentoController solicita ao Model de Agendamentos que retorne todos os registros da tabela de Agendamentos, podendo incluir informações das tabelas Usuários e Salas via joins.

### ***GET /agendamentos/:id :***

- Função: Obtém os detalhes de um agendamento específico, identificado pelo seu ID.
- Controller: AgendamentoController.getAgendamentoById
- Fluxo: Recebe o ID do agendamento na URL. O AgendamentoController consulta o Model de Agendamentos para buscar os dados daquele agendamento em particular no banco de dados. 

### **PUT /agendamentos/:id :**

- Função: Atualiza as informações de um agendamento existente, identificado pelo seu ID.
- Controller: AgendamentoController.atualizarAgendamento
- Fluxo: Recebe o ID do agendamento na URL e os novos detalhes (por exemplo, mudança de horário). O AgendamentoController envia essas informações ao Model de Agendamentos para que o registro seja modificado, podendo exigir nova verificação de disponibilidade.

### **DELETE /agendamentos/:id :**

- Função: Exclui um agendamento do sistema, identificado pelo seu ID.
- Controller: AgendamentoController.excluirAgendamento
- Fluxo: Recebe o ID do agendamento na URL. O AgendamentoController coordena com o Model de Agendamentos para remover o registro correspondente do banco de dados.