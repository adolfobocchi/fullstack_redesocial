const { openDatabase } = require('../database/sqlitedb');
require('dotenv').config();

const createPostHistory = async (post_id, title, description) => {
  try {
    const db = await openDatabase();
    const result = await db.run('INSERT INTO PostHistory (title, description, post_id) VALUES (?, ?, ?)', [title, description, post_id]);
    return result.lastID;
  } catch (error) {
    console.log(error)
    throw error;
  }
};


const PostModel = {
  // pega um usuário por ID
  async getPostById(id) {
    const db = await openDatabase();
    return db.get('SELECT tab1.*, tab2.email, tab2.name FROM Post tab1 inner join User tab2 on tab1.user_id = tab2.id WHERE tab1.id = ?', id);
  },

  async getAllPostByUser(user_id) {
    const db = await openDatabase();
    return db.all('SELECT * FROM Post WHERE user_id = ?', user_id);
  },

  // Cria um novo usuário
  async createPost({ user_id, title, description, imagem }) {
    const db = await openDatabase();
    const result = await db.run('INSERT INTO Post (user_id, title, description, imagem) VALUES (?, ?, ?, ?)', [user_id, title, description, imagem]);
    const lastID = result.lastID;
    const post = await db.get('SELECT * FROM Post WHERE id = ?', [lastID]);
    return post;
  },

  

  // Atualiza um usuário por ID
  async updatePostById(id, user_id, { title, description, imagem }) {
    try {
      const db = await openDatabase();
      const currentPost = await db.get('SELECT * FROM Post WHERE id = ? and user_id = ?', [id, user_id]);
      const result = await db.run('UPDATE Post SET title = ?, description = ?, imagem = ? WHERE id = ? and user_id = ?', [title, description, imagem, id, user_id]);

      if (result.changes > 0) {
        await createPostHistory(id, currentPost.title, currentPost.description);
        const postUpdated = await db.get('SELECT tab1.*, tab2.name FROM Post tab1 inner join User tab2 on tab1.user_id = tab2.id WHERE tab1.id = ?', id);
        return postUpdated;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  },

  async incrementLikes(post_id) {
    try {
      const db = await openDatabase();
      await db.run('UPDATE Post SET likes = likes + 1 WHERE id = ?', [post_id]);
    } catch (error) {
      throw error;
    }
  },

  async incrementUnlikes(post_id) {
    try {
      const db = await openDatabase();
      await db.run('UPDATE Post SET unlikes = unlikes + 1 WHERE id = ?', [post_id]);
    } catch (error) {
      throw error;
    }
  },

  async incrementViews(post_id) {
    try {
      const db = await openDatabase();
      await db.run('UPDATE Post SET views = views + 1 WHERE id = ?', [post_id]);
    } catch (error) {
      throw error;
    }
  },

  // Exclui um usuário por ID
  async deletePostById(id) {
    const db = await openDatabase();
    const result = await db.run('DELETE FROM Post WHERE id = ?', id);

    if (result.changes > 0) {
      return true;
    } else {
      return null;
    }
  },

  async getPosts(limit = 10) {
    try {
      const db = await openDatabase();
      const result = await db.all('SELECT tab1.*, tab2.name  FROM Post tab1 inner join user tab2 on tab1.user_id = tab2.id  ORDER BY created_at DESC LIMIT ?', [limit]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  async getHistorysByPostId(postId) {
    try {
      console.log(postId);
      const db = await openDatabase();
      const result = await db.all('SELECT * FROM PostHistory WHERE post_id = ? ORDER BY id DESC', [postId]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  async generateReport() {
    try {
      const db = await openDatabase();
      const result = await db.all('SELECT tab1.*, COUNT(DISTINCT tab2.id) AS total_comments FROM Post tab1 LEFT JOIN Comment tab2 ON tab1.id = tab2.post_id GROUP BY tab1.id, tab1.title');
      return result;
    } catch (error) {
      console.log(error)
      throw error;
    }
  },
}


module.exports = PostModel;
