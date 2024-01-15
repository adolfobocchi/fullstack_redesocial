const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
require('dotenv').config();

// Função para abrir o banco de dados SQLite
const openDatabase = async () => {
  return open({
    filename: process.env.NODE_ENV === 'test' ? process.env.SQLITE_TEST_DB_PATH : process.env.SQLITE_DB_PATH,
    driver: sqlite3.Database,
  });
}

// Função para configurar o banco de dados SQLite
const sqlitedb = async () => {
  try {
    const db = await openDatabase();

    // Verifica o ambiente (se for teste, remove as tabelas existentes)
    if (process.env.NODE_ENV === 'test') {
      await db.exec(`
        DROP TABLE IF EXISTS User;
        DROP TABLE IF EXISTS Post;
        DROP TABLE IF EXISTS Comment;
        DROP TABLE IF EXISTS PostHistory;

        -- Tabela de Usuários
        CREATE TABLE IF NOT EXISTS User (
          id INTEGER PRIMARY KEY,
          name TEXT(100), -- Nome do usuário com limite de 100 caracteres
          email TEXT(191), -- Endereço de e-mail com limite de 191 caracteres
          password TEXT
        );

        -- Tabela de Postagens
        CREATE TABLE IF NOT EXISTS Post (
          id INTEGER PRIMARY KEY,
          likes INTEGER DEFAULT 0,
          unlikes INTEGER DEFAULT 0,
          views INTEGER DEFAULT 0,
          user_id INTEGER,  -- Chave estrangeira referenciando User(id)
          title TEXT(100),  -- Título da postagem com limite de 100 caracteres
          description TEXT, -- Descrição da postagem
          created_at TEXT DEFAULT CURRENT_TIMESTAMP, -- Adiciona o campo de data e hora com valor padrão
          imagem TEXT,
          FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE
        );

        -- Tabela de Comentários
        CREATE TABLE IF NOT EXISTS Comment (
          id INTEGER PRIMARY KEY,
          user_id INTEGER,  -- Chave estrangeira referenciando User(id)
          post_id INTEGER,  -- Chave estrangeira referenciando Post(id)
          description TEXT, -- Descrição do comentário
          FOREIGN KEY (user_id) REFERENCES User(id),
          FOREIGN KEY (post_id) REFERENCES Post(id) ON DELETE CASCADE
        );

        -- Tabela de histórico
        CREATE TABLE IF NOT EXISTS PostHistory (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          post_id INTEGER,
          title TEXT(100),
          description TEXT,
          FOREIGN KEY (post_id) REFERENCES Post(id) ON DELETE CASCADE
        );
      `);
    } else {
      // Se não for ambiente de teste, cria as tabelas normalmente
      await db.exec(`
      DROP TABLE IF EXISTS User;
      DROP TABLE IF EXISTS Post;
      DROP TABLE IF EXISTS Comment;
      DROP TABLE IF EXISTS PostHistory;
        -- Tabela de Usuários
        CREATE TABLE IF NOT EXISTS User (
          id INTEGER PRIMARY KEY,
          name TEXT(100), -- Nome do usuário com limite de 100 caracteres
          email TEXT(191), -- Endereço de e-mail com limite de 191 caracteres
          password TEXT
        );

        -- Tabela de Postagens
        CREATE TABLE IF NOT EXISTS Post (
          id INTEGER PRIMARY KEY,
          likes INTEGER DEFAULT 0,
          unlikes INTEGER DEFAULT 0,
          views INTEGER DEFAULT 0,
          user_id INTEGER,  -- Chave estrangeira referenciando User(id)
          title TEXT(100),  -- Título da postagem com limite de 100 caracteres
          description TEXT, -- Descrição da postagem
          created_at TEXT DEFAULT CURRENT_TIMESTAMP, -- Adiciona o campo de data e hora com valor padrão
          imagem TEXT,
          FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE
        );

        -- Tabela de Comentários
        CREATE TABLE IF NOT EXISTS Comment (
          id INTEGER PRIMARY KEY,
          user_id INTEGER,  -- Chave estrangeira referenciando User(id)
          post_id INTEGER,  -- Chave estrangeira referenciando Post(id)
          description TEXT, -- Descrição do comentário
          FOREIGN KEY (user_id) REFERENCES User(id),
          FOREIGN KEY (post_id) REFERENCES Post(id) ON DELETE CASCADE
        );

        -- Tabela de histórico
        CREATE TABLE IF NOT EXISTS PostHistory (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          post_id INTEGER,
          title TEXT(100),  -- Titulo anterior da postagem
          description TEXT, -- Descrição anterior da postagem
          FOREIGN KEY (post_id) REFERENCES Post(id) ON DELETE CASCADE
        );
      `);
    }
    console.log('SQLite conectado com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar no SQLite: ', error.message);
  }
};

module.exports = { sqlitedb, openDatabase };
