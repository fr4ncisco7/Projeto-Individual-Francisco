// config/db.js
require('dotenv').config();

const { Pool } = require('pg');

// Criando a pool de conexões
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE, // CORRIGIDO AQUI
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false // Adicionado suporte a SSL
});

module.exports = pool;