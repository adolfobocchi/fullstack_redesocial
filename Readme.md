Backend do Projeto

O backend deste projeto utiliza várias bibliotecas e dependências para fornecer funcionalidades essenciais. Abaixo está uma breve explicação de cada uma dessas dependências, juntamente com a justificativa de seu uso no projeto.
Dependências
Bcrypt

    Versão: ^5.1.1
    Descrição: Biblioteca para hash de senhas.
    Justificativa de Uso: Utilizada para garantir a segurança das senhas armazenadas no banco de dados.

Body-parser

    Versão: ^1.20.2
    Descrição: Middleware para análise de corpos de solicitação HTTP.
    Justificativa de Uso: Facilita a manipulação de dados enviados através de solicitações HTTP.

Cors

    Versão: ^2.8.5
    Descrição: Middleware para habilitar o compartilhamento de recursos entre diferentes origens.
    Justificativa de Uso: Necessário para permitir solicitações de diferentes domínios no frontend.

Crypto

    Versão: ^1.0.1
    Descrição: Módulo integrado do Node.js para criptografia.
    Justificativa de Uso: Utilizado para operações criptográficas específicas.

Dotenv

    Versão: ^16.3.1
    Descrição: Carrega variáveis de ambiente de um arquivo .env.
    Justificativa de Uso: Permite configurar variáveis de ambiente, como chaves secretas, para maior segurança.

Express

    Versão: ^4.18.2
    Descrição: Framework para construção de aplicativos web com Node.js.
    Justificativa de Uso: Facilita o roteamento, manipulação de solicitações e respostas HTTP.

Express-jwt

    Versão: ^8.4.1
    Descrição: Middleware para autenticação baseada em JSON Web Token (JWT).
    Justificativa de Uso: Utilizado para proteger rotas que exigem autenticação.

Fs

    Versão: ^0.0.1-security
    Descrição: Módulo integrado do Node.js para operações de sistema de arquivos.
    Justificativa de Uso: Usado para operações relacionadas a arquivos no sistema.

Multer

    Versão: ^1.4.5-lts.1
    Descrição: Middleware para manipulação de formulários com suporte a upload de arquivos.
    Justificativa de Uso: Necessário para lidar com o envio de arquivos, como imagens.

Nodemailer

    Versão: ^6.9.8
    Descrição: Biblioteca para envio de e-mails.
    Justificativa de Uso: Utilizado para enviar e-mails, por exemplo, ao criar um novo comentário.

Nodemon

    Versão: ^3.0.2
    Descrição: Monitora alterações no código e reinicia automaticamente o servidor.
    Justificativa de Uso: Facilita o desenvolvimento, eliminando a necessidade de reinicialização manual do servidor a cada alteração no código.

Path

    Versão: ^0.12.7
    Descrição: Módulo integrado do Node.js para manipulação de caminhos de arquivo e diretório.
    Justificativa de Uso: Utilizado para construir caminhos de arquivos e diretórios.

Sqlite

    Versão: ^5.1.1
    Descrição: Módulo do SQLite para Node.js.
    Justificativa de Uso: Utilizado como banco de dados para armazenamento de dados.

Sqlite3

    Versão: ^5.1.7
    Descrição: Biblioteca SQLite para Node.js.
    Justificativa de Uso: Complementa o módulo sqlite fornecendo funcionalidades adicionais.

DevDependencies
Jest

    Versão: ^29.7.0
    Descrição: Framework de teste para JavaScript.
    Justificativa de Uso: Facilita a execução de testes automatizados para garantir a qualidade do código.

Supertest

    Versão: ^6.3.3
    Descrição: Biblioteca para testar APIs HTTP.
    Justificativa de Uso: Usado em conjunto com o Jest para realizar testes automatizados das rotas da API.

Como Executar o Backend

Para executar o backend, siga as etapas abaixo:

git clone https://github.com/adolfobocchi/fullstack_redesocial.git

Navegue até o diretório do projeto:

cd fullstack_redesocial

navegue ate a pasta backend:

cd backend

crie um arquivo .env e edite o arquivo conforme abaixo, definindo os valores das variaveis de acordo com o seu ambiente:
PORT=3002
SQLITE_DB_PATH=./db/db.sqlite
SQLITE_TEST_DB_PATH=./db/testdb.sqlite
JWT_SECRET=
SMTP_PORT=
SMTP_EMAIL=
SMTP_PASSWORD=
SMTP_SERVER=

Instale as dependências do Node.js:

npm install

Inicie o servidor:

npm start

Frontend do Projeto

O frontend deste projeto utiliza várias bibliotecas e dependências para oferecer uma experiência de usuário dinâmica e responsiva. Abaixo está uma breve explicação de cada uma dessas dependências, juntamente com a justificativa de seu uso no projeto.
Dependências
Axios

    Versão: ^1.6.5
    Descrição: Cliente HTTP baseado em Promises para realizar solicitações.
    Justificativa de Uso: Utilizado para fazer requisições à API backend.

React

    Versão: ^18.2.0
    Descrição: Biblioteca JavaScript para construção de interfaces de usuário.
    Justificativa de Uso: Base do desenvolvimento do frontend, facilita a criação de componentes reutilizáveis.

React-dom

    Versão: ^18.2.0
    Descrição: Fornece métodos específicos do DOM para o React.
    Justificativa de Uso: Necessário para renderizar componentes React no navegador.

React-icons

    Versão: ^5.0.1
    Descrição: Biblioteca de ícones para React.
    Justificativa de Uso: Utilizado para incorporar ícones aos componentes do React.

React-redux

    Versão: ^9.1.0
    Descrição: Facilita a integração do Redux com o React.
    Justificativa de Uso: Gerencia o estado global da aplicação, facilitando o compartilhamento de dados entre componentes.

React-router-dom

    Versão: ^6.21.2
    Descrição: Roteamento para aplicativos React.
    Justificativa de Uso: Permite a navegação entre diferentes páginas do aplicativo sem recarregar a página.

React-scripts

    Versão: 5.0.1
    Descrição: Conjunto de scripts e configurações para criar projetos React.
    Justificativa de Uso: Facilita o desenvolvimento e a construção do projeto.

Redux

    Versão: ^5.0.1
    Descrição: Gerenciador de estado previsível para aplicações JavaScript.
    Justificativa de Uso: Gerencia o estado global da aplicação, facilitando o compartilhamento de dados entre componentes.

Redux-persist

    Versão: ^6.0.0
    Descrição: Biblioteca para persistir e reidratar um store Redux.
    Justificativa de Uso: Mantém o estado da aplicação mesmo após recarregar a página.

Redux-thunk

    Versão: ^3.1.0
    Descrição: Middleware para realizar ações assíncronas no Redux.
    Justificativa de Uso: Utilizado para realizar operações assíncronas, como solicitações à API.

Styled-components

    Versão: ^6.1.8
    Descrição: Biblioteca para estilizar componentes React com estilos dinâmicos.
    Justificativa de Uso: Facilita a criação de estilos dinâmicos e reutilizáveis para os componentes React.

Como Executar o Frontend

Para executar o frontend, siga as etapas abaixo:

git clone https://github.com/adolfobocchi/fullstack_redesocial.git

Navegue até o diretório do projeto:

cd fullstack_redesocial

navegue ate a pasta frontend:

cd frontend

crie um arquivo .env e edite o arquivo conforme abaixo:
REACT_APP_URL_API=http://localhost:3002

Instale as dependências:

npm install

Inicie o servidor de desenvolvimento:

npm start
