CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT null,
  email VARCHAR(100) NOT NULL,
  data_cadastro DATE
);

CREATE TABLE IF NOT EXISTS salas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  capacidade INTEGER NOT NULL,
  disponibilidade BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS agendamentos (
  id SERIAL PRIMARY KEY,
  usuarios_id INTEGER NOT NULL,
  data_hora_inicio DATE,
  data_hora_fim DATE,
  FOREIGN KEY (usuarios_id) REFERENCES usuarios(id)
  
);

CREATE TABLE IF NOT EXISTS salas_agendamentos(
  salas_id INTEGER NOT NULL,
  agendamentos_id INTEGER NOT NULL,
  PRIMARY KEY (salas_id, agendamentos_id),
  FOREIGN KEY (salas_id) REFERENCES salas(id),
  FOREIGN KEY (agendamentos_id) REFERENCES agendamentos(id)
);


