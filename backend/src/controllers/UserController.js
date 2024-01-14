const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserController = {

  // pega um usuario por ID
  async getUserById(req, res) {
    const userId = req.params.id;
    try {
      const user = await User.getUserById(userId);

      if (user) {
        return res.json(user);
      } else {
        return res.status(404).json({ error: 'Usuario não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao obter usuario por ID:', error.message);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Cria um novo usuario
  async createUser(req, res) {
    const { name, email, password } = req.body;
    try {
      const user = await User.getUserByEmail(email);
      if (user) {
        return res.status(500).json({ error: 'O email fornecido ja esta em uso.' });
      }
      const newUser = await User.createUser({ name, email, password });
      return res.status(201).json(newUser);
    } catch (error) {
      console.error('Erro ao criar usuario:', error.message);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Atualiza um usuario por ID
  async updateUser(req, res) {
    const userId = req.body.id;
    const { name, email } = req.body;
    try {
      const updatedUser = await User.updateUserById(userId, { name, email });
      if (updatedUser) {
        return res.json(updatedUser);
      } else {
        return res.status(404).json({ error: 'Usuario não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao atualizar usuario por ID:', error.message);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async updatePassword(req, res) {
    const userId = req.body.id;
    const { password } = req.body;
    try {
      const updatedUser = await User.updatePasswordById(userId, { password });
      if (updatedUser) {
        return res.json(updatedUser);
      } else {
        return res.status(404).json({ error: 'Usuario não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao atualizar usuario por ID:', error.message);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Exclui um usuario por ID
  async deleteUserById(req, res) {
    const userId  = req.params.userId;
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (parseInt(decodedToken.userId) !== parseInt(userId)) {
        return res.status(403).json({ error: 'Acesso Negado.' });
      }
      const deletedUser = await User.deleteUserById(userId);
      if (deletedUser) {
        return res.json({ message: 'Usuario excluído com sucesso' });
      } else {
        return res.status(404).json({ error: 'Usuario não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao excluir usuario por ID:', error.message);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Credenciais invalidas.' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Credenciais invalidas.' });
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ user, token });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async private(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ mensagem: 'Token JWT ausente.' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ mensagem: 'Token JWT inválido.' });
    }
  },
};

module.exports = UserController;