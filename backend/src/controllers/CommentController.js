const Comment = require('../models/Comment');
const User = require('../models/User');
const Post = require('../models/Post');

const jwt = require('jsonwebtoken');
const SendEmail = require('../utils/SendEmail');

const CommentController = {

  // Obtém um comentário por id
  async getCommentById(req, res) {
    const commentId = req.params.id;

    try {
      const comment = await Comment.getCommentById(commentId);

      if (comment) {
        return res.json(comment);
      } else {
        return res.status(404).json({ error: 'Comentário não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao obter comentário por id:', error.message);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Obtém comentários por id de postagem
  async getCommentsByPostId(req, res) {
    const postId = req.params.postId;

    try {
      const comments = await Comment.getCommentsByPostId(postId);

      if (comments) {
        return res.json(comments);
      } else {
        return res.status(404).json({ error: 'Comentários não encontrados' });
      }
    } catch (error) {
      console.error('Erro ao obter comentários por id de postagem:', error.message);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Cria um novo comentário
  async createComment(req, res) {
    const { post_id, description, user_id } = req.body;

    try {
      const newComment = await Comment.createComment({ user_id, post_id, description });
      const userComment = await User.getUserById(user_id);
      const postComment = await Post.getPostById(post_id);

      if (newComment) {
        // Envia um e-mail para o autor da postagem sobre o novo comentário
        await SendEmail.sendEmail(
          postComment.email,
          'FullStack Social - Novo Comentário',
          `Olá ${postComment.name} <br> ${userComment.name} acaba de fazer um novo comentário na sua postagem: ${postComment.title}`
        );
      }

      return res.status(201).json(newComment);
    } catch (error) {
      console.error('Erro ao criar comentário:', error.message);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Atualiza um comentário por id
  async updateComment(req, res) {
    const commentId = req.body.id;
    const { description, user_id } = req.body;

    try {
      const updatedComment = await Comment.updateCommentById(commentId, user_id, { description });

      if (updatedComment) {
        return res.json(updatedComment);
      } else {
        return res.status(404).json({ error: 'Comentário não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao atualizar comentário por id:', error.message);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Exclui um comentário por id
  async deleteCommentById(req, res) {
    const commentId = req.params.id;

    try {
      const comment = await Comment.getCommentById(commentId);
      const post = await Post.getPostById(comment.post_id);
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Verifica se o usuário tem permissão para excluir o comentário
      if ((parseInt(decodedToken.userId) !== parseInt(comment.user_id)) && (parseInt(decodedToken.userId) !== parseInt(post.user_id))) {
        return res.status(403).json({ error: 'Acesso Negado.' });
      }

      const deletedComment = await Comment.deleteCommentById(commentId);

      if (deletedComment) {
        return res.json({ message: 'Comentário excluído com sucesso' });
      } else {
        return res.status(404).json({ error: 'Comentário não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao excluir comentário por id:', error.message);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },
};

module.exports = CommentController;
