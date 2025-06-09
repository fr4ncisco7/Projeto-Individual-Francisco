-- Criação da tabela usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(100) NOT NULL,
  data_cadastro DATE
);


-- Inserindo usuários
INSERT INTO usuarios(nome, email, senha) 
VALUES ('admin', 'admin@admin.com', 'admin'),
('usuario1', 'usuario1@gmail.com', 'usuario1'),
('Francisco', 'francisco@gmail.com', '123')
ON CONFLICT (email) DO NOTHING;

-- Criação da tabela salas
CREATE TABLE IF NOT EXISTS salas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) UNIQUE NOT NULL, --Unique garante que os valores de nome sejam unicos
  capacidade INTEGER NOT NULL, --Integer garante que a capacidade seja um número inteiro
  disponibilidade BOOLEAN NOT NULL DEFAULT TRUE, --Default True garante que a disponibilidade seja true por padrão
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  -- Timestamp with time zone garante que a data de criação seja armazenada com o fuso horário
  -- Default current_timestamp garante que a data de criação seja a data atual por padrão
);

INSERT INTO salas (nome, capacidade, disponibilidade)
VALUES ('sala de 01', 5, TRUE),
('sala 02', 10, TRUE),
('sala 03', 3, TRUE),
('sala 04', 3, TRUE),
('sala 05', 5, TRUE),
('sala 06', 5, TRUE)
ON CONFLICT (nome) DO NOTHING; -- Diz ao banco de dados ignorar se caso tentar inserir um valor que já existe.

CREATE TABLE IF NOT EXISTS agendamentos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id), --Indica que usuario_id é uma chave estrangeira que referencia a tabela usuarios
    sala_id INTEGER REFERENCES salas(id), --Indica que sala_id é uma chave estrangeira que referencia a tabela salas
    data_inicio TIMESTAMP NOT NULL, --Timestamp garante que a data de inicio seja uma data e hora válida
    data_fim TIMESTAMP NOT NULL,
    descricao TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, --Garante que a data de criação seja a data atual por padrão
    CONSTRAINT check_datas CHECK (data_fim > data_inicio), -- Garante que a data de fim seja maior que a data de inicio
    CONSTRAINT check_bloco_4_horas CHECK (
        EXTRACT(HOUR FROM data_inicio)::integer % 4 = 0 AND
        EXTRACT(MINUTE FROM data_inicio) = 0 AND
        EXTRACT(SECOND FROM data_inicio) = 0 AND
        (EXTRACT(EPOCH FROM (data_fim - data_inicio)) / 3600) = 4
    ) -- Garante que os agendamentos comecem em blocos de 4 horas (00:00, 04:00, 08:00, 12:00, 16:00, 20:00)
    -- e que durem exatamente 4 horas
);

-- Tabela de relacionamento entre salas e agendamentos (para agendamentos com múltiplas salas)
CREATE TABLE IF NOT EXISTS salas_agendamentos (
    salas_id INTEGER REFERENCES salas(id),
    agendamentos_id INTEGER REFERENCES agendamentos(id),
    PRIMARY KEY (salas_id, agendamentos_id)
);

-- Função para verificar o limite de 4 reservas por semana por usuário
CREATE OR REPLACE FUNCTION check_reservas_limite_semanal()
RETURNS TRIGGER AS $$
DECLARE
    contagem INTEGER;
    inicio_semana TIMESTAMP;
    fim_semana TIMESTAMP;
BEGIN
    -- Determina o início (segunda-feira) e fim (domingo) da semana para a data do novo agendamento
    inicio_semana := date_trunc('week', NEW.data_inicio);
    fim_semana := inicio_semana + interval '6 days 23 hours 59 minutes 59 seconds';
    
    -- Conta quantos agendamentos o usuário já tem nessa semana
    SELECT COUNT(*) INTO contagem
    FROM agendamentos
    WHERE usuario_id = NEW.usuario_id
    AND data_inicio >= inicio_semana
    AND data_inicio <= fim_semana;
    
    -- Se o usuário já tem 4 ou mais agendamentos nessa semana, rejeita o novo agendamento
    IF contagem >= 4 THEN
        RAISE EXCEPTION 'Limite de 4 reservas por semana excedido para o usuário %', NEW.usuario_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para verificar o limite de reservas antes de inserir um novo agendamento
CREATE TRIGGER check_limite_reservas_trigger
BEFORE INSERT ON agendamentos
FOR EACH ROW
EXECUTE FUNCTION check_reservas_limite_semanal();

