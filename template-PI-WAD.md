# Web Application Document - Projeto Individual - Módulo 2 - Inteli

**_Os trechos em itálico servem apenas como guia para o preenchimento da seção. Por esse motivo, não devem fazer parte da documentação final._**

## Sistema online para reservar salas de estudo no Edifício Arara Azul.

#### Francisco de Araujo Ferreira Filho

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução (Semana 01)

Em um prédio estudantil chamado "Arara Azul", há diversas salinhas de estudo que são disponibilizadas para os moradores. Entretanto, devido à desorganização do prédio e à falta de regras claras, há diversos conflitos entre as pessoas, como moradores que deixam suas coisas nas salinhas e não voltam, além de pessoas que passam muito tempo sem deixar outras usarem. Com isso, o prédio Arara Azul decidiu entrar em contato com Francisco, aluno do Inteli, para que ele conseguisse resolver aquele problema. Assim, Francisco observou a necessidade de criar uma plataforma com um sistema de agendamento para as salas de estudo, com horários bem definidos, certas limitações de agendamento sucessivos e com as regras do espaço para que todos os moradores conseguissem usar sem nenhum conflito .

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01)
## Sobre
Meu nome é Eloisa Borges Lima, sou estudante de medicina na Idomede, tenho 18 anos e sou natural de Caririaçu, Ceará. Sou uma pessoa dedicada, esforçada e muito organizada; gosto de planejar toda a minha rotina, mas estou preparada para imprevistos. Atualmente, estou morando na cidade de Juazeiro do Norte porque estou em busca de realizar o meu sonho de me tornar médica. Por questões de distância, tive que procurar um prédio perto da faculdade, e foi assim que conheci o prédio Arara Azul, um prédio universitário muito acolhedor e com uma estrutura de ponta toda preparada para estudantes. Entretanto, mal organizado, e com isso estou pensando em mudar de prédio.

<div align="center">
  <sub>Persona Eloisa Borges Lima</sub><br>
  <img src="assets/persona.jpg" width="50%">
</div>

Necessidades: Eloísa precisa conseguir estudar quando chega da faculdade.

Dores: Ao chegar da faculdade às 16h, ela corre para tentar pegar uma salinha de estudo e, ao chegar lá, encontra o seguinte cenário: algumas pessoas estão na mesma sala desde o meio-dia, outras estão usando o espaço para jogar jogos eletrônicos, e as demais salinhas estão cheias de mochilas e cadernos, mas sem nenhuma pessoa dentro. Nesse cenário, ela não consegue realizar seus estudos, nem individualmente nem em grupo, o que prejudica os encontros marcados com suas amigas e está afetando diretamente suas notas.

Solução: Com a solução e implementação do sistema de agendamento das salinhas de estudo, proposta por Francisco, os alunos só poderão acessar esses espaços mediante agendamento, com bloqueio de agendamentos sucessivos por uma mesma pessoa. Dessa forma, Eloísa conseguirá reservar seu horário na sala de estudos com antecedência. Assim, ela não terá pressa para voltar da faculdade, terá privacidade para estudar, um espaço para estudo coletivo e para tirar dúvidas com as amigas, além de aumentar sua satisfação com o prédio Arara Azul.

### 2.2. User Stories (Semana 01)

US01- Como moradora, eu quero poder ver eventos que irão interditar as salas para que eu consiga organizar minha rotina.

US02- Como moradora, eu quero que na plataforma indique boas práticas de cuidado com a sala agendada para que não prejudique a experiência do próximo.

US03- Como uma estudante de medicina e moradora do prédio, quero poder ver os horários disponível de agendamento das salinhas particulares para que eu consiga organizar meus estudos.

## Método INVEST
Em termos gerais o método INVEST é muito utilizado na metodologia agil para analisar a qualidade de uma user story com critérios de avaliação para garantir que as histórias estejam bem escritas e eficar para o planejamento e desenvolvimento. INVEST(Independent, Negotiable, Valuable, Estimable, Small, Testable).

Ele fornece um conjunto de critérios para garantir que as histórias de usuário sejam bem escritas e eficazes para o planejamento e desenvolvimento. Cada letra do acrônimo representa uma característica importante que uma boa User Story deve ter:

I -  A user story por si só já possui uma história independente, com ela tenho informações que a pessoa é uma estudante e moradora de um prédio e que busca horários de agendamento disponíveis das salas de estudos para melhorar e organizar o seu aprendizado. Pode haver dependências da infraestrutura básica (existência das salas, sistema de login), mas a história em si parece independente dessas camadas subjacentes.

N - A história apresentada é negociável, porque ela é suficientemente genérica, não há nada definido ou fixo, por isso é perfeita para que seja debatida e definida a melhor abordagem pela a equipe de desenvolvimento.

V - A história de usuário criada é extremamente valiosa, porque ela é um passo importante para conclusão e resolução diretamente das dores da personagem, a solução proposta na persona detalha o valor que essa funcionalidade trará.

E - Com as informações da história e o contexto do problema, esse User Story é altamente estimável. A equipe de desenvolvimento deverá analisar, planejar e definir a abordagem que será utilizada para que a estimativa seja feita.

S - Representa a funcionalidade específica de visualizar os horários disponíveis para agendamento das salinhas particulares. Ela representa um parte específica e importante do sistema completo, é um tarefa que pode ser incrementada em uma única sprint.

A implementação dessa funcionalidade pode envolver diversas tarefas complexas. Para garantir que o trabalho seja gerenciável e entregue valor incrementalmente em cada sprint, pode ser necessário dividir essa história em histórias menores e mais focadas, como a capacidade de visualizar a disponibilidade das salas, a ação de agendar um horário específico e a funcionalidade de cancelar um agendamento.

T - Ela é testável, os critérios de aceite podem ser definidos claramente a partir da história e das dores de Eloísa. Por exemplo: A estudante deve conseguir selecionar uma data e hora para agendar uma salinha., Outros moradores devem poder visualizar os horários agendados (dependendo dos requisitos).

---

##  Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados  (Semana 3)

### Modelo lógico do banco de dados
<div align="center">
  <sub></sub><br>
  <img src="assets/modeloLogico.png" width="50%">
</div>

### Modelo físico do banco de dados

[Clique aqui para acessar o modelo físico do banco de dados](migrations/init.sql)


### 3.1.1 BD e Models (Semana 5)
[Clique aqui para acessar a explicação dos models no meu sistema](detalhamento_models.md)

### 3.2. Arquitetura (Semana 5)
O esquema de arquitetura MVC (Model-View-Controller) é uma representação visual que ilustra como os diferentes módulos de um software se organizam e interagem, seguindo o padrão MVC. Esse diagrama ajuda a visualizar elementos da aplicação, como as tabelas do banco de dados, seus campos, as operações básicas de dados (Criar, Ler, Atualizar e Excluir), as telas do sistema, as tecnologias empregadas e os caminhos de acesso definidos.

<div align="center">
  <sub></sub><br>
  <img src="assets/diagramaMvc.png" width="100%">
</div>

### **•View (Visão)**
Esta primeira área do diagrama representa a Visão, que é a parte da aplicação que o usuário realmente vê e com a qual interage. Ela é responsável por apresentar as informações ao usuário e por capturar suas ações, enviando-as para o Controller. Nesse sentido, nela está contido todas as telas da aplicação web que nesse caso são a tela de login, agendamento e a de confirmação de agendamento. Sendo assim, cada requisição está representada em sua respectiva tela, indicando o que acontecerá nela e qual será o fluxo.

- **Login:** a tela de login tem dois atributos principais, o email e a senha. Quando o usuário colocar o email e a senha, a requisição é mandada para o controller, que por lar ele pede para o model conferir no banco de dados se aquele email e senha existe, ou então cria um email e senha.


- **Agendamentos:** a tela de agendamento tem três atributos principais para a seleção: a Sala, o Horário e o Dia. Quando o usuário seleciona esses dados, a requisição é enviada para o Controller de Agendamentos. Este, por sua vez, solicita ao Model de Agendamentos que verifique a disponibilidade da sala, horário e dia no banco de dados. A resposta dessa verificação é então retornada para a View, preparando-se para a etapa de confirmação.

- **Confirmação_Agendamento:** a tela de confirmação de agendamento exibe os detalhes do agendamento previamente selecionado (Sala, Horário, Dia) e adiciona o atributo Dia_agendado (que indica quando a confirmação está sendo feita). É nessa tela que o usuário finaliza o agendamento. Ao confirmar, uma nova requisição é enviada ao Controller de Agendamentos, que então instrui o Model a registrar efetivamente o agendamento no banco de dados. Após a conclusão bem-sucedida dessa operação, o Controller envia uma resposta para a View, indicando que o agendamento foi concluído.

#### **•Controller (Controlador)**
A área central simboliza o Controlador, que atua como um elo entre a Visão e o Modelo. Sua função é receber as interações da interface, aplicar a lógica de negócios necessária e encaminhá-las ao Modelo. Ele também coordena o retorno das informações processadas de volta para a Visão. Nessa pespectiva, ela representa as tebales que estão no módel e as operações possíveis de serem realizadas.

**Usuários (Controller):** O Controller de Usuários é responsável por gerenciar as operações relacionadas aos dados dos usuários. Ele recebe requisições da View (como a tela de Login) para:

- Selecionar: Verificar a existência de um usuário e suas credenciais no Model de Usuários (comunicando-se com a tabela de Usuários no banco de dados).
- Criar: Inserir um novo registro de usuário no Model de Usuários (adicionar um novo usuário ao banco).
- Atualizar: Modificar informações de um usuário existente no Model de Usuários.
- Deletar: Remover um registro de usuário do Model de Usuários. Ele coordena com o Model de Usuários para realizar essas operações e envia as respostas apropriadas de volta para a View.

**Salas (Controller):** O Controller de Salas é encarregado das operações de gerenciamento das salas. Ele recebe requisições para:

- Selecionar: Consultar informações sobre as salas disponíveis no Model de Salas (como nome, capacidade e disponibilidade).
- Criar: Adicionar novos registros de salas no Model de Salas.
 -Atualizar: Modificar os detalhes de salas existentes no Model de Salas.
- Deletar: Remover registros de salas do Model de Salas. Este Controller interage diretamente com o Model de Salas para obter ou modificar os dados e retorna os resultados para as Views que precisam dessas informações.

**Agendamentos (Controller):** O Controller de Agendamentos é crucial para orquestrar o processo de agendamento de salas. Ele recebe requisições das Views de Agendamento e Confirmação_Agendamento para:

- Selecionar: Verificar a disponibilidade de salas para datas e horários específicos no Model de Agendamentos.
- Criar: Registrar um novo agendamento no Model de Agendamentos, uma vez que a disponibilidade tenha sido confirmada e o usuário tenha finalizado a operação.
- Atualizar: Modificar os detalhes de agendamentos existentes no Model de Agendamentos.
- Deletar: Cancelar ou remover agendamentos no Model de Agendamentos. Ele atua como o intermediário principal para todas as ações relacionadas a agendamentos, garantindo que a lógica de negócios seja aplicada antes de interagir com o Model de Agendamentos para persistir ou recuperar os dados.

 #### **•Model (Modelo)**
A terceira área corresponde ao Modelo, que representa a camada de dados da aplicação. O Modelo se comunica diretamente com o banco de dados, sendo capaz de acessar, modificar ou recuperar informações das tabelas. Quando uma solicitação chega a ele através do Controlador, o Modelo executa a operação de dados requerida e envia os resultados de volta ao Controlador.

**Usuários (Model):** O Model de Usuários corresponde à tabela de Usuários no banco de dados. Ele é responsável por gerenciar os dados dos usuários e suas credenciais. Seus principais atributos são:

- Id: Um identificador único para cada usuário.
- Nome: O nome completo do usuário.
- E-mail: O endereço de e-mail do usuário, frequentemente usado como identificador de login.
- Data_Cadastro: A data em que o usuário foi registrado no sistema.
- Senha: A senha do usuário, armazenada de forma segura. Este Model é acessado pelo Controller de Usuários para realizar operações como verificar credenciais, criar novos usuários, atualizar informações ou deletar registros.

**Salas (Model):** O Model de Salas representa a tabela de Salas no banco de dados. Ele armazena as informações detalhadas sobre cada sala disponível para agendamento. Seus principais atributos são:

- Id: Um identificador único para cada sala.
- Nome: O nome ou identificação da sala.
- Capacidade: O número máximo de pessoas que a sala pode acomodar.
- Disponibilidade: Um indicador que mostra se a sala está livre ou ocupada em determinados períodos. Este Model é consultado pelo Controller de Salas (e indiretamente pelo Controller de Agendamentos) para obter informações sobre as salas, verificar sua capacidade e disponibilidade antes de um agendamento.

**Agendamentos (Model):** O Model de Agendamentos corresponde à tabela de Agendamentos no banco de dados. Ele é fundamental para registrar e gerenciar todos os agendamentos de salas. Seus principais atributos são:

- Id: Um identificador único para cada agendamento.
- Usuarios_Id: Uma chave estrangeira que vincula o agendamento a um usuário específico (da tabela de Usuários), indicando quem fez o agendamento.
- Data_Hora_Inicio: A data e hora exatas de início do agendamento.
- Data_Hora_Fim: A data e hora exatas de término do agendamento.
- Dia_Agendado: A data em que o agendamento foi efetivamente registrado no sistema. Este Model é acessado pelo Controller de Agendamentos para criar novos agendamentos, consultar agendamentos existentes (para verificar disponibilidade ou listar agendamentos de um usuário), atualizar horários ou cancelar agendamentos. Ele desempenha um papel crucial na lógica de verificação de conflitos de horário.
  

### 3.3. Wireframes (Semana 03)

### **Tela de login**
**User Storie:** Não está associada a nenhuma US.
<div align="center">
  <sub>Wireframe tela 1</sub><br>
  <img src="assets/Tela1.png" width="20%">
</div>

<p>A tela de login é essencial para o acesso dos moradores à plataforma de agendamento das salas de estudo do prédio. O e-mail cadastrado no sistema do edifício deve ser utilizado para entrar.
 <p>

### **Tela de agendamento**
**User Storie:** 
- "Como uma estudante de medicina e moradora do prédio, quero poder ver os horários disponível de agendamento das salinhas particulares para que eu consiga organizar meus estudos."
<div align="center">
  <sub>Wireframe tela 2</sub><br>
  <img src="assets/Tela2.png" width="20%">
</div>

<p>A tela de agendamento é fundamental para otimizar a experiência dos estudantes nos espaços de estudo, pois permite visualizar os dias com os horários disponíveis, selecionar a sala desejada e agendar horários com bastante antecedência. Observa-se que os horários são marcados de 4 em 4 horas, um tempo perfeito para estudar todo o conteúdo com amigos ou individualmente. Dessa forma, soluciona completamente a questão levantada, pois resolve com eficiência a demanda da Eloisa de ver os dias e horários livres das salinhas de estudo, que ficam visíveis na parte inferior do wireframe (horários sem marcação).
<p>

### **Tela de confirmação de reserva**
**User Storie:** 
- "Como moradora, eu quero que na plataforma indique boas práticas de cuidado com a sala agendada para que não prejudique a experiência do próximo."
- "Como moradora, eu quero poder ver eventos que irão interditar as salas para que eu consiga organizar minha rotina".
<div align="center">
  <sub>Wireframe tela 3</sub><br>
  <img src="assets/Tela3.png" width="20%">
</div>

<p>A tela de confirmação é um passo importante para nossa plataforma. Nela, é possível visualizar a data, o horário, as regras de uso e os eventos que poderiam interditar a sala de estudo. Desse modo, soluciona com clareza as dúvidas da Eloisa sobre possíveis interdições das salinhas, como uma detetização, e as normas de convivência do local.

<p>

#### **link do figma:** https://www.figma.com/design/6vGv5QEdLNycb3QFHrQ7h8/Untitled?node-id=0-1&t=BKp1rVrURdjMeIUL-1




### 3.4. Guia de estilos (Semana 05)


## Guia de Estilo – Arara Azul (Mobile)

## Contexto
Aplicativo mobile para reserva de salas de estudo do prédio **Arara Azul**, exclusivo para estudantes.

---

## Paleta de Cores

| Função | Descrição | HEX | Representação |
|---|---|---|---|
| Primária | Azul Escuro | `#21006F` | <span style="display:inline-block;width:20px;height:20px;background-color:#21006F;border:1px solid #000;"></span> |
| Primária | Azul Secundário | `#6135C7` | <span style="display:inline-block;width:20px;height:20px;background-color:#6135C7;border:1px solid #000;"></span> |
| Secundária | Branco | `#FFFAFA` | <span style="display:inline-block;width:20px;height:20px;background-color:#FFFAFA;border:1px solid #000;"></span> |
| Secundária | Preto | `#000000` | <span style="display:inline-block;width:20px;height:20px;background-color:#000000;border:1px solid #000;"></span> |
| Terciária | Cinza Claro | `#D9D9D9` | <span style="display:inline-block;width:20px;height:20px;background-color:#D9D9D9;border:1px solid #000;"></span> |
| Terciária | Cinza Médio | `#817E7E` | <span style="display:inline-block;width:20px;height:20px;background-color:#817E7E;border:1px solid #000;"></span> |
| Destaque | Amarelo (Seleção) | `#FFF600` | <span style="display:inline-block;width:20px;height:20px;background-color:#FFF600;border:1px solid #000;"></span> |


---

## Tipografia

- **Fonte:** Inter
- **Estilo:** Regular
- **Capitalização:** Primeira letra em maiúsculo nas frases.

### Tamanhos

| Aplicação | Tamanho | Representação |
|---|---|---|
| Títulos | 20 | <span style="font-family: 'Inter', sans-serif; font-size: 20px;">Exemplo</span> |
| Botões e Informações | 16 | <span style="font-family: 'Inter', sans-serif; font-size: 16px;">Exemplo</span> |
| Avisos e Observações | 12 | <span style="font-family: 'Inter', sans-serif; font-size: 12px;">Exemplo</span> |

---

## Componentes e Elementos Visuais

### Botões
- Fundo: `#21006F`, `#6135C7` ou `#000000` (para botões de ação como "Reservar", "Continuar")
- Texto: `#FFFAFA` (branco) ou `#000000` (preto)
- Raio (arredondamento): 10px
- Stroke (borda): Preto (`#000000`), 2px de espessura
- Sombra:
    - Offset X: 6
    - Offset Y: 4
    - Blur: 4
    - Spread: 2

**Representação:**
<button style="background-color: #21006F; color: #FFFAFA; border: 2px solid #000000; border-radius: 10px; padding: 8px 16px; font-family: 'Inter', sans-serif; font-size: 16px; box-shadow: 6px 4px 4px 2px rgba(0,0,0,0.4);">Botão Exemplo</button><br>
<button style="background-color: #6135C7; color: #FFFAFA; border: 2px solid #000000; border-radius: 10px; padding: 8px 16px; font-family: 'Inter', sans-serif; font-size: 16px; box-shadow: 6px 4px 4px 2px rgba(0,0,0,0.4);">Botão Exemplo</button><br>
<button style="background-color: #000000; color: #FFFAFA; border: 2px solid #000000; border-radius: 10px; padding: 8px 16px; font-family: 'Inter', sans-serif; font-size: 16px; box-shadow: 6px 4px 4px 2px rgba(0,0,0,0.4);">Botão Exemplo</button>

### Caixas (Inputs, Avisos, Informações)
- Fundo: Branco (`#FFFAFA`) ou Cinza (`#D9D9D9`)
- Borda: Stroke Preto (`#000000`), 2px
- Raio: 10px
- Sombra padrão (X:6, Y:4, Blur:4, Spread:2)

**Representação:**
<div style="background-color: #FFFAFA; border: 2px solid #000000; border-radius: 10px; padding: 15px; width: 200px; box-shadow: 6px 4px 4px 2px rgba(0,0,0,0.4);">
    <p style="font-family: 'Inter', sans-serif; font-size: 14px; margin: 0;">Exemplo de Caixa Branca</p>
</div><br>
<div style="background-color: #D9D9D9; border: 2px solid #000000; border-radius: 10px; padding: 15px; width: 200px; box-shadow: 6px 4px 4px 2px rgba(0,0,0,0.4);">
    <p style="font-family: 'Inter', sans-serif; font-size: 14px; margin: 0;">Exemplo de Caixa Cinza</p>
</div>

### Calendário
- Fundo: Azul Escuro (`#21006F`) ou Azul Secundário (`#6135C7`)
- Dia Selecionado: Fundo Amarelo (`#FFF600`)
- Texto: Preto (`#000000`) ou Branco (`#FFFAFA`)

**Representação:**
<div style="width: 250px; border: 2px solid #000; border-radius: 10px; overflow: hidden; box-shadow: 6px 4px 4px 2px rgba(0,0,0,0.4);">
    <div style="background-color: #21006F; color: #FFFAFA; padding: 10px; text-align: center; font-family: 'Inter', sans-serif;">Maio 2025</div>
    <div style="display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; background-color: #6135C7; padding: 5px; font-family: 'Inter', sans-serif; color: #FFFAFA;">
        <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
    </div>
    <div style="display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; background-color: #6135C7; padding-bottom: 10px; font-family: 'Inter', sans-serif; color: #FFFAFA;">
        <span></span><span></span><span></span><span>1</span><span>2</span><span>3</span><span>4</span>
        <span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span style="background-color: #FFF600; color: #000; border-radius: 50%; padding: 5px; display: inline-block;">10</span><span>11</span>
        <span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span>
        <span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span>
        <span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span></span>
    </div>
</div>

### Cartões de Sala
- Fundo: Cinza Claro (`#D9D9D9`)
- Ícones relacionados a estudo
- Texto centralizado: "Sala 1", "Sala 2", etc.

**Representação:**
<div style="background-color: #D9D9D9; border: 2px solid #000000; border-radius: 10px; padding: 20px; width: 150px; text-align: center; box-shadow: 6px 4px 4px 2px rgba(0,0,0,0.4);">
    <span style="font-size: 40px; display: block; margin-bottom: 10px;">📚</span>
    <p style="font-family: 'Inter', sans-serif; font-size: 18px; font-weight: bold; margin: 0;">Sala 1</p>
</div>

---

## Ícones e Ilustrações
- Estilo: Flat design (não realista)
- Temática: Estudos e Arara Azul
- Paleta de cores seguindo o padrão do app
- Bordas suaves e harmônicas

**Representação:**
<span style="font-size: 50px;">
    📘<span style="color:#21006F;">🐦</span>
</span>

---

## Layout e Grid

- **Tamanho do Frame:** 402x935 px (Mobile)
- **Grid:**
    - 6 colunas
    - Cor do grid: Vermelha
- **Espaçamento:**
    - Segue múltiplos de 8px (recomendado)

**Representação (simplificada do conceito de grid):**
<div style="width: 402px; height: 100px; border: 2px solid #000; background-color: #f0f0f0; display: flex; justify-content: space-around; align-items: center;">
    <div style="width: 15%; height: 80px; background-color: rgba(255,0,0,0.2);"></div>
    <div style="width: 15%; height: 80px; background-color: rgba(255,0,0,0.2);"></div>
    <div style="width: 15%; height: 80px; background-color: rgba(255,0,0,0.2);"></div>
    <div style="width: 15%; height: 80px; background-color: rgba(255,0,0,0.2);"></div>
    <div style="width: 15%; height: 80px; background-color: rgba(255,0,0,0.2);"></div>
    <div style="width: 15%; height: 80px; background-color: rgba(255,0,0,0.2);"></div>
</div>

---

## Efeitos (Sombra padrão)

- Offset X: 6
- Offset Y: 4
- Blur: 4
- Spread: 2

**Representação:**
<div style="width: 100px; height: 50px; background-color: #D9D9D9; border: 2px solid #000; border-radius: 10px; box-shadow: 6px 4px 4px 2px rgba(0,0,0,0.4);"></div>

---

## Observações Gerais

- Todos os elementos possuem raio de 10px e borda preta de 2px.
- Consistência nas sombras e bordas para garantir unidade visual.
- A estética reflete a identidade do prédio Arara Azul e o foco em ambiente acadêmico.

---




### 3.5. Protótipo de Alta Fidelidade (Semana 05)

| Tela de Login | Tela de Agendamento | Tela de Confirmação |
| :------------: | :------------------: | :-----------------: |
| ![Tela 1](assets/altaTela1.png) | ![Tela 2](assets/altaTela2.png) | ![Tela 3](assets/altaTela3.png) |

🔗 **Link do Figma:** [Acessar protótipo](https://www.figma.com/design/6vGv5QEdLNycb3QFHrQ7h8/Untitled?node-id=0-1&t=BKp1rVrURdjMeIUL-1)


### 3.6. WebAPI e endpoints (Semana 05)

[Clique aqui para acessar o detalhamento de cada endopoint aplicada para o funcionamento do projeto](detalhamento_endpoints.md)

### 3.7 Interface e Navegação (Semana 07)

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que seu parceiro possa consultar caso ele se interessar em aprofundar. Um exemplo de referência de livro e de site:_<br>

---
---
