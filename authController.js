const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const router = express.Router();

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'logincrudbd'
});

connection.connect();

// Middleware
router.use(bodyParser.json());

// Endpoint para el registro de usuarios
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error al registrar usuario');
      } else {
        res.status(201).send('Usuario registrado correctamente');
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al registrar usuario');
  }
});

// Endpoint para el inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    connection.query('SELECT * FROM users WHERE username = ?', [username], async (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error al iniciar sesión');
      } else if (results.length === 0) {
        res.status(401).send('Usuario o contraseña incorrectos');
      } else {
        const user = results[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          res.status(401).send('Usuario o contraseña incorrectos');
        } else {
          const token = jwt.sign({ userId: user.id }, 'secret');
          res.send({ token });
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al iniciar sesión');
  }
});

module.exports = router;
