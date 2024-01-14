const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const UserController = require('../controllers/UserController');
const PostController = require('../controllers/PostController');
const CommentController = require('../controllers/CommentController');

const imagesDir = path.resolve(__dirname, '../../public/images');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagesDir)
    },
    filename: function (req, file, cb) {
        const extensaoArquivo = file.originalname.split('.')[file.originalname.split('.').length - 1];
        const novoNomeArquivo = crypto.randomBytes(16).toString('hex');
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    }
});

const upload = multer({ storage });

router.get('/ping', (req, res) => {
    return res.json({ pong: true })
})

router.post('/register', UserController.createUser)
router.post('/login', UserController.login)

router.put('/user', UserController.private, UserController.updateUser)
router.put('/user/password', UserController.private, UserController.updatePassword)
router.delete('/user/:userId', UserController.private, UserController.deleteUserById)

router.post('/post', UserController.private, upload.fields([{ name: 'image', maxCount: 10 }]), PostController.createPost)
router.get('/post/:id', UserController.private, PostController.getPostById)
router.put('/post', UserController.private, upload.fields([{ name: 'image', maxCount: 10 }]), PostController.updatePost)
router.put('/post/like/:id', UserController.private, PostController.likePost)
router.put('/post/unlike/:id', UserController.private, PostController.unlikePost)
router.put('/post/view/:id', UserController.private, PostController.viewPost)
router.delete('/post/:id', UserController.private, PostController.deletePostById)

router.post('/comment', UserController.private, CommentController.createComment)
router.get('/comment/:id', UserController.private, CommentController.getCommentById)
router.put('/comment', UserController.private, CommentController.updateComment)
router.delete('/comment/:id', UserController.private, CommentController.deleteCommentById)

router.get('/posts', UserController.private, PostController.getPosts)

router.get('/posts/report', UserController.private, PostController.generateReport)

router.get('/historys/:id', UserController.private, PostController.getHistorysByPostId)

router.get('/comments/:postId', UserController.private, CommentController.getCommentsByPostId)

module.exports = router;
