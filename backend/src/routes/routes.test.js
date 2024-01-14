const request = require('supertest');
const app = require('../app');
const {openDatabase} = require('../database/sqlitedb')

describe('Testing api routes', () => {
    
    let name = 'adolfo';
    let email = 'dolfao@gmail.com'
    let password = '123456'
    let passwordUpdate = '12345678'
    let nameUpdate = 'adolfo bocchi'
    let authToken;

    let title = 'titulo postagem'
    let descricao = 'descricao da postagem'

    let titleUpdate = 'update titulo postagem'
    let descricaoUpdate = 'update descricao da postagem'

    let comentario = 'comentario da postagem'
    let comentarioUpdate = 'update comentario da postagem'

    beforeAll(async () => {
        const db = await openDatabase(); 
        await db.all('DELETE FROM User');
    });
    it('should ping pong', (done) => {
        request(app)
            .get('/api/ping')
            .then(response => {
                expect(response.body.pong).toBeTruthy();
                return done();
            })
    });
    //usuario
    it('should create new user', (done) => {
        request(app)
            .post('/api/register')
            .send(`name=${name}&email=${email}&password=${password}`)
            .then(response => {
                expect(response.body.error).toBeUndefined();
                expect(response.body).toHaveProperty('id');
                return done();
            })
    });

    it('should not allow to create user with existing email', (done) => {
        request(app)
            .post('/api/register')
            .send(`name=${name}&email=${email}`)
            .then(response => {
                expect(response.body.error).not.toBeUndefined();
                return done();
            })
    });

    it('should not login with incorrect data', (done) => {
        request(app)
            .post('/api/login')
            .send(`email=${email}&password=invalid`)
            .then(response => {
                expect(response.body).toHaveProperty('message', 'Credenciais invalidas.')
                return done();
            })
    });
    //login
    it('should login correctly', (done) => {
        request(app)
            .post('/api/login')
            .send(`email=${email}&password=${password}`)
            .then(response => {
                expect(response.body.error).toBeUndefined();
                expect(response.body).toHaveProperty('token');
                authToken = response.body.token;
                return done();
            })
    });

    it('should update user', (done) => {
        request(app)
            .put('/api/user')
            .set('Authorization', `Bearer ${authToken}`)
            .send(`id=1&name=${nameUpdate}&email=${email}`)
            .then(response => {
                expect(response.body.error).toBeUndefined();
                expect(response.body).toHaveProperty('id','1');
                return done();
            })
    });

    it('should update password user', (done) => {
        request(app)
            .put('/api/user/password')
            .set('Authorization', `Bearer ${authToken}`)
            .send(`id=1&password=${passwordUpdate}`)
            .then(response => {
                expect(response.body.error).toBeUndefined();
                expect(response.body).toHaveProperty('id','1');
                return done();
            })
    });

    it('should login correctly update password', (done) => {
        request(app)
            .post('/api/login')
            .send(`email=${email}&password=${passwordUpdate}`)
            .then(response => {
                expect(response.body.error).toBeUndefined();
                expect(response.body).toHaveProperty('token');
                authToken = response.body.token;
                return done();
            })
    });
    //postagem
    it('should create new post', (done) => {
        request(app)
            .post('/api/post')
            .set('Authorization', `Bearer ${authToken}`)
            .send(`title=${title}&description=${descricao}&user_id=1`)
            .then(response => {
                expect(response.body.error).toBeUndefined();
                expect(response.body).toHaveProperty('id');
                return done();
            })
    });

    it('should update post and save history', (done) => {
        request(app)
            .put('/api/post')
            .set('Authorization', `Bearer ${authToken}`)
            .send(`title=${titleUpdate}&description=${descricaoUpdate}&user_id=1&id=1`)
            .then(response => {
                expect(response.body.error).toBeUndefined();
                expect(response.body).toHaveProperty('id');
                return done();
            })
    });
    it('should view a post', (done) => {
        request(app)
            .put('/api/post/view/1')
            .set('Authorization', `Bearer ${authToken}`)
            .then(response => {
                expect(response.body.error).toBeUndefined();
                expect(response.body).toHaveProperty('message', 'Visualização registrada com sucesso.');
                return done();
            })
    });
    it('should like a post', (done) => {
        request(app)
            .put('/api/post/like/1')
            .set('Authorization', `Bearer ${authToken}`)
            .then(response => {
                expect(response.body.error).toBeUndefined();
                expect(response.body).toHaveProperty('message', 'Postagem curtida com sucesso.');
                return done();
            })
    });
    it('should unlike a post', (done) => {
        request(app)
            .put('/api/post/unlike/1')
            .set('Authorization', `Bearer ${authToken}`)
            .then(response => {
                expect(response.body.error).toBeUndefined();
                expect(response.body).toHaveProperty('message', 'Postagem descurtida com sucesso.');
                return done();
            })
    });
    //comentarios
    it('should add comment in a post ', (done) => {
        request(app)
            .post('/api/comment')
            .set('Authorization', `Bearer ${authToken}`)
            .send(`post_id=1&description=${comentario}&user_id=1`)
            .then(response => {
                expect(response.body.error).toBeUndefined();
                expect(response.body).toHaveProperty('id');
                return done();
            })
    });
    it('should update comment in a post ', (done) => {
        request(app)
            .put('/api/comment')
            .set('Authorization', `Bearer ${authToken}`)
            .send(`id=1&description=${comentarioUpdate}&user_id=1`)
            .then(response => {
                expect(response.body.error).toBeUndefined();
                expect(response.body).toHaveProperty('id');
                return done();
            })
    });

    //timeline
    
    it('should return recent posts', (done) => {
        request(app)
          .get('/api/posts')
          .set('Authorization', `Bearer ${authToken}`)
          .then(response => {
            expect(response.body.error).toBeUndefined();
            expect(response.body).toBeInstanceOf(Array); // Verifica se 'posts' é um array
            return done();
          })
          .catch(error => done(error));
      });

      it('should return comments in a posts', (done) => {
        request(app)
          .get('/api/comments/1')
          .set('Authorization', `Bearer ${authToken}`)
          .then(response => {
            expect(response.body.error).toBeUndefined();
            expect(response.body).toBeInstanceOf(Array); // Verifica se 'posts' é um array
            return done();
          })
          .catch(error => done(error));
      });
    //deletes

    it('should delete a comment', (done) => {
        request(app)
            .delete('/api/comment/1')
            .set('Authorization', `Bearer ${authToken}`)
            .send(`user_id=1`)
            .then(response => {
                expect(response.body.error).toBeUndefined();
                expect(response.body).toHaveProperty('message', 'Comment excluído com sucesso');
                return done();
            })
    });
    it('should delete a post', (done) => {
        request(app)
            .delete('/api/post/1')
            .set('Authorization', `Bearer ${authToken}`)
            .send(`user_id=1`)
            .then(response => {
                expect(response.body.error).toBeUndefined();
                expect(response.body).toHaveProperty('message', 'post excluído com sucesso');
                return done();
            })
    });
    it('should delete a user', (done) => {
        request(app)
            .delete('/api/user/1')
            .set('Authorization', `Bearer ${authToken}`)
            .then(response => {
                expect(response.body.error).toBeUndefined();
                expect(response.body).toHaveProperty('message', 'Usuario excluído com sucesso');
                return done();
            })
    });
});
