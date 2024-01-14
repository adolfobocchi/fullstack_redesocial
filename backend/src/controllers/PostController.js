const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const imagesDir = path.resolve(__dirname, '../../public/images');

function deleteImage(imageName) {
  let imagePath = `${imagesDir}/${imageName}`;
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error(err);
      return false;
    }
    return true;
  });
}

const PostController = {

  async getPosts  (req, res) {
    try {
      const limit = req.query.limit || 20; // Pode ajustar o número padrão conforme necessário
      const posts = await Post.getPosts(limit);
      return res.json(posts);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao obter postagens mais recentes.' });
    }
  },
  // pega um usuario por ID
  async getPostById(req, res) {
    const PostId = req.params.id;

    try {
      const Post = await Post.getPostById(PostId);

      if (Post) {
        return res.json(Post);
      } else {
        return res.status(404).json({ error: 'Post não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao obter usuario por ID:', error.message);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Cria um novo usuario
  async createPost(req, res) {
    const { title, description, user_id } = JSON.parse(req.body.post);
    
    try {
      if (req.files && Object.keys(req.files).length > 0) {
        var imagem = req.files.image[0].filename;
      }
      const newPost = await Post.createPost({ user_id, title, description, imagem });
      return res.status(201).json(newPost);
    } catch (error) {
      console.error('Erro ao criar post:', error.message);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async updatePost(req, res) {
    const { id, title, description, user_id } = JSON.parse(req.body.post);

    try {
      if (req.files && Object.keys(req.files).length > 0) {
        var imagem = req.files.image[0].filename;
      }
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (parseInt(decodedToken.userId) !== parseInt(user_id)) {
        return res.status(403).json({ error: 'Acesso Negado.' });
      }
      const updatedPost = await Post.updatePostById(id, user_id, { title, description, imagem });

      if (updatedPost) {
        return res.json(updatedPost);
      } else {
        return res.status(404).json({ error: 'Post não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao atualizar post por ID:', error.message);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },
  
  async likePost (req, res) {
    const postId = req.params.id;
  
    try {
      await Post.incrementLikes(postId);
      res.json({ message: 'Postagem curtida com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao curtir postagem.' });
    }
  },
  
  async unlikePost (req, res) {
    const postId = req.params.id;
  
    try {
      await Post.incrementUnlikes(postId);
      res.json({ message: 'Postagem descurtida com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao descurtir postagem.' });
    }
  },
  
  async viewPost (req, res) {
    const postId = req.params.id;
  
    try {
      await Post.incrementViews(postId);
      res.json({ message: 'Visualização registrada com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao registrar visualização.' });
    }
  },

  async deletePostById(req, res) {
    const postId = req.params.id;
    
    try {
      const post = await Post.getPostById(postId);
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (parseInt(decodedToken.userId) !== parseInt(post.user_id)) {
        return res.status(403).json({ error: 'Acesso Negado.' });
      }
      const deletedPost = await Post.deletePostById(postId);

      if (deletedPost) {
        deleteImage(post.imagem)
        return res.json({ message: 'post excluído com sucesso' });
      } else {
        return res.status(404).json({ error: 'post não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao excluir post por ID:', error.message);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async getHistorysByPostId  (req, res) {
    const postId = req.params.id;
    try {
      console.log(postId);
      const historys = await Post.getHistorysByPostId(postId);
      return res.json(historys);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao obter postagens mais recentes.' });
    }
  },

  async generateReport  (req, res) {
    try {
      const posts = await Post.generateReport();
      return res.json(posts);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao obter postagens mais recentes.' });
    }
  },

};

module.exports = PostController;