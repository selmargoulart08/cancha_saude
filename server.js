const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Configuração da sessão
app.use(session({
  secret: 'seu_segreto',
  resave: false,
  saveUninitialized: true
}));

// Cria uma conexão com o banco de dados
const db = new sqlite3.Database(':memory:'); // Usei um banco de dados em memória para fins de exemplo

// Cria uma tabela para o agendamento
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS agendamento (id INTEGER PRIMARY KEY AUTOINCREMENT, mes TEXT, dia TEXT, horario TEXT)');
});

// Rota de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verificar o usuário e senha no banco de dados
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else if (!user) {
      res.sendStatus(401);
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          req.session.loggedIn = true;
          res.sendStatus(200);
        } else {
          res.sendStatus(401);
        }
      });
    }
  });
});

// Middleware para verificar se o usuário está autenticado
function requireAuth(req, res, next) {
  if (req.session.loggedIn) {
    next();
  } else {
    res.sendStatus(401);
  }
}

// Rota para obter os dados de agendamento
app.get('/api/agendamento', (req, res) => {
  db.all('SELECT * FROM agendamento', (err, rows) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.json(rows);
    }
  });
});

// Rota para modificar os dados de agendamento
app.post('/api/agendamento', requireAuth, (req, res) => {
  // Lógica para modificar os dados de agendamento no banco de dados
  res.sendStatus(200);
});

// Rota de logout
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
