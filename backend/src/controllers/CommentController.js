const Comment = require('../models/Comment');
const User = require('../models/User');
const Post = require('../models/Post');

const jwt = require('jsonwebtoken');
const SendEmail = require('../utils/SendEmail');

const CommentController = {


  // pega um comentario por ID
  async getCommentById(req, res) {
    const CommentId = req.params.id;

    try {
      const Comment = await Comment.getCommentById(CommentId);

      if (Comment) {
        return res.json(Comment);
      } else {
        return res.status(404).json({ error: 'comentario não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao obter comentario por ID:', error.message);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // pega um comentario por ID
  async getCommentsByPostId(req, res) {
    const postId = req.params.postId;

    try {
      const Comments = await Comment.getCommentsByPostId(postId);

      if (Comment) {
        return res.json(Comments);
      } else {
        return res.status(404).json({ error: 'comentario não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao obter comentario por ID:', error.message);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Cria um novo comentario
  async createComment(req, res) {
    const { post_id, description, user_id } = req.body;

    try {
      const newComment = await Comment.createComment({ user_id, post_id, description });
      const userComment = await User.getUserById(user_id);
      const postComment = await Post.getPostById(post_id);
      if (newComment) {
        await SendEmail.sendEmail(
          postComment.email,
          'FullStack Social - novo comentário',
          `Olá ${postComment.name} <br> ${userComment.name} acaba de fazer um novo comentário na sua postagem: ${postComment.title}`)
      }
      return res.status(201).json(newComment);
    } catch (error) {
      console.error('Erro ao criar Comment:', error.message);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async updateComment(req, res) {
    const CommentId = req.body.id;
    const { description, user_id } = req.body;

    try {
      const updatedComment = await Comment.updateCommentById(CommentId, user_id, { description });

      if (updatedComment) {
        return res.json(updatedComment);
      } else {
        return res.status(404).json({ error: 'comentario não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao atualizar comentario por ID:', error.message);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },


  async deleteCommentById(req, res) {
    const commentId = req.params.id;
    try {
      const comment = await Comment.getCommentById(commentId);
      const post = await Post.getPostById(comment.post_id);
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if ((parseInt(decodedToken.userId) !== parseInt(comment.user_id)) && (parseInt(decodedToken.userId) !== parseInt(post.user_id))) {
        return res.status(403).json({ error: 'Acesso Negado.' });
      }
      const deletedComment = await Comment.deleteCommentById(commentId);

      if (deletedComment) {
        return res.json({ message: 'Comment excluído com sucesso' });
      } else {
        return res.status(404).json({ error: 'Comment não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao excluir Comment por ID:', error.message);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

};

module.exports = CommentController;