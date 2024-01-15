const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const UserController = require('../controllers/UserController');
const PostController = require('../controllers/PostController');
const CommentController = require('../controllers/CommentController');

// Caminho do diretório para armazenar as imagens
const imagesDir = path.resolve(__dirname, '../../public/images');

// Configuração do armazenamento para o multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagesDir);
    },
    filename: function (req, file, cb) {
        // Gera um nome de arquivo único usando criptografia
        const extensaoArquivo = file.originalname.split('.')[file.originalname.split('.').length - 1];
        const novoNomeArquivo = crypto.randomBytes(16).toString('hex');
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`);
    }
});

// Configuração do multer com a estratégia de armazenamento definida acima
const upload = multer({ storage });

// Rotas
router.get('/ping', (req, res) => {
    return res.json({ pong: true });
});

// Rotas relacionadas a usuários
router.post('/register', UserController.createUser);
router.post('/login', UserController.login);
router.put('/user', UserController.private, UserController.updateUser);
router.put('/user/password', UserController.private, UserController.updatePassword);
router.delete('/user/:userId', UserController.private, UserController.deleteUserById);

// Rotas relacionadas a postagens
router.post('/post', UserController.private, upload.fields([{ name: 'image', maxCount: 10 }]), PostController.createPost);
router.get('/post/:id', UserController.private, PostController.getPostById);
router.put('/post', UserController.private, upload.fields([{ name: 'image', maxCount: 10 }]), PostController.updatePost);
router.put('/post/like/:id', UserController.private, PostController.likePost);
router.put('/post/unlike/:id', UserController.private, PostController.unlikePost);
router.put('/post/view/:id', UserController.private, PostController.viewPost);
router.delete('/post/:id', UserController.private, PostController.deletePostById);

// Rotas relacionadas a comentários
router.post('/comment', UserController.private, CommentController.createComment);
router.get('/comment/:id', UserController.private, CommentController.getCommentById);
router.put('/comment', UserController.private, CommentController.updateComment);
router.delete('/comment/:id', UserController.private, CommentController.deleteCommentById);

// Rota para obter todas as postagens de um usuário
router.get('/posts', UserController.private, PostController.getPosts);

// Rota para gerar um relatório de postagens
router.get('/posts/report', UserController.private, PostController.generateReport);

// Rota para obter o histórico de revisões de uma postagem
router.get('/historys/:id', UserController.private, PostController.getHistorysByPostId);

// Rota para obter todos os comentários de uma postagem
router.get('/comments/:postId', UserController.private, CommentController.getCommentsByPostId);

// Exporta o roteador configurado
module.exports = router;
