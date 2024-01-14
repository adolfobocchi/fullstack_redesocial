const { openDatabase } = require('../database/sqlitedb');
const bcrypt = require('bcrypt');
require('dotenv').config();

const UserModel = {
  // pega um usuário por ID
  async getUserById(id) {
    const db = await openDatabase();
    return db.get('SELECT id, name, email FROM User WHERE id = ?', id);
  },

  async getUserByEmail(email) {
    const db = await openDatabase();
    return db.get('SELECT * FROM User WHERE email = ?', email);
  },

  // Cria um novo usuário
  async createUser({ name, email, password }) {
    const db = await openDatabase();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await db.run('INSERT INTO User (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
    return { id: result.lastID, name, email, password };
  },

  // Atualiza um usuário por ID
  async updateUserById(id, { name, email }) {
    const db = await openDatabase();
    const result = await db.run('UPDATE User SET name = ?, email = ? WHERE id = ?', [name, email, id]);

    if (result.changes > 0) {
      return { id, name, email };
    } else {
      return null;
    }
  },

  async updatePasswordById(id, { password }) {
    const db = await openDatabase();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await db.run('UPDATE User SET password = ? WHERE id = ?', [hashedPassword, id]);

    if (result.changes > 0) {
      return { id };
    } else {
      return null;
    }
  },

  // Exclui um usuário por ID
  async deleteUserById(id) {
    try {
      const db = await openDatabase();
      const result = await db.run('DELETE FROM User WHERE id = ?', id);

      if (result.changes > 0) {
        return true;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error)
    }

  },

}

module.exports = UserModel
