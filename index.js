// Importa los módulos necesarios
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./db'); // Asegúrate de que el archivo db.js esté en la misma carpeta
const mysql = require('mysql2'); // Importa el módulo mysql2

// Crea una instancia de Express
const app = express();

// Configura bodyParser para parsear JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Habilita CORS
app.use(cors());

// Función para conectar a la base de datos
const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
      const db = mysql.createConnection({
          host: MYSQL_ADDON_HOST,
          port: MYSQL_ADDON_PORT,
          user: MYSQL_ADDON_USER,
          password: MYSQL_ADDON_PASSWORD,
          database: MYSQL_ADDON_DB
      });
      
      db.connect((err) => {
          if (err) {
              reject(err);
          } else {
              resolve(db);
          }
      });
  });
};


// Ruta para obtener todos los productos
app.get('/api/productos', async (req, res) => {
    try {
        const db = await connectToDatabase(); // Usa la función para conectar a la base de datos
        const [rows] = await db.query('SELECT * FROM productos');
        db.end(); // Cierra la conexión a la base de datos
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error al obtener productos' });
    }
});

// Ruta para obtener un producto por su ID
app.get('/api/productos/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM productos WHERE id = ?', [productId]);
        db.end();
        if (rows.length === 0) {
            res.status(404).json({ message: 'Producto no encontrado' });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        console.error('Error al obtener producto por ID:', error);
        res.status(500).json({ message: 'Error al obtener producto por ID' });
    }
});

// Ruta para crear un nuevo producto
app.post('/api/productos', async (req, res) => {
    const newProduct = req.body;
    try {
        const db = await connectToDatabase();
        await db.query('INSERT INTO productos SET ?', [newProduct]);
        db.end();
        res.status(201).json({ message: 'Producto creado exitosamente' });
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ message: 'Error al crear producto' });
    }
});

// Ruta para actualizar un producto por su ID
app.put('/api/productos/:id', async (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;
    try {
        const db = await connectToDatabase();
        await db.query('UPDATE productos SET ? WHERE id = ?', [updatedProduct, productId]);
        db.end();
        res.json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ message: 'Error al actualizar producto' });
    }
});

// Ruta para eliminar un producto por su ID
app.delete('/api/productos/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const db = await connectToDatabase();
        await db.query('DELETE FROM productos WHERE id = ?', [productId]);
        db.end();
        res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ message: 'Error al eliminar producto' });
    }
});

// Inicia el servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
