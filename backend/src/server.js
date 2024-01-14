// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Importa o aplicativo Express
const app = require('./app');

// Inicia o servidor na porta especificada nas variáveis de ambiente
app.listen(process.env.PORT, () => {
  console.log(`Servidor escutando em http://localhost:${process.env.PORT}`);
});

// A separacao dos arquivos app e server é devido ao ambiente de testes