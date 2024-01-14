const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const path = require('path');

const publicDir = path.resolve(__dirname, '../public');

const { sqlitedb } = require('./database/sqlitedb');
require('dotenv').config();

const server = express();

// Inicializa o banco de dados SQLite
sqlitedb();

// Middleware para tratar CORS (Cross-Origin Resource Sharing)
server.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'UPDATE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Serve arquivos estáticos da pasta 'public'
server.use(express.static(`${publicDir}`));

// Configuração para parse de dados no formato JSON
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
server.use(bodyParser.json({ limit: '50mb' }));

// Rotas da API
server.use('/api', routes);

// Rota de fallback para páginas não encontradas
server.use((req, res) => {
    res.send('Página não encontrada');
});

module.exports = server;
