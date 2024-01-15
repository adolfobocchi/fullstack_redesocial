const { openDatabase } = require('../database/sqlitedb');
require('dotenv').config();

const CommentModel = {
  // Obtém um comentário por id
  async getCommentById(id) {
    try {
      const db = await openDatabase();
      return db.get('SELECT * FROM Comment WHERE id = ?', id);
    } catch (error) {
      throw error;
    }
  },

  // Obtém todos os comentários de uma postagem pelo  id da postagem
  async getCommentsByPostId(post_id) {
    try {
      const db = await openDatabase();
      return db.all('SELECT tab1.*, tab2.name FROM Comment tab1 INNER JOIN user tab2 ON tab1.user_id = tab2.id WHERE post_id = ? ORDER BY tab1.id DESC', post_id);
    } catch (error) {
      throw error;
    }
  },

  // Cria um novo comentário
  async createComment({ user_id, post_id, description }) {
    try {
      const db = await openDatabase();
      const result = await db.run('INSERT INTO Comment (user_id, post_id, description) VALUES (?, ?, ?)', [user_id, post_id, description]);
      const id = result.lastID;
      const comment = await db.get('SELECT tab1.*, tab2.name FROM Comment tab1 INNER JOIN user tab2 ON tab1.user_id = tab2.id WHERE tab1.id = ?', id);
      return comment;
    } catch (error) {
      throw error;
    }
  },

  // Atualiza um comentário por id
  async updateCommentById(id, user_id, { description }) {
    try {
      const db = await openDatabase();

      const result = await db.run('UPDATE Comment SET description = ? WHERE id = ? AND user_id = ?', [description, id, user_id]);

      if (result.changes > 0) {
        return { id, user_id, description };
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  },

  // Exclui um comentário por id
  async deleteCommentById(id) {
    try {
      const db = await openDatabase();
      const result = await db.run('DELETE FROM Comment WHERE id = ?', id);

      if (result.changes > 0) {
        return true;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  },
};

module.exports = CommentModel;
