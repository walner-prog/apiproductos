const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

/// Base de datos en memoria (simulación)
const products = [
    // Categoría: Electrónica
    { id: 1, name: 'Laptop Dell XPS 13', description: 'Portátil ultradelgado con pantalla InfinityEdge', price: 1299.99, category: 'Electrónica', image: 'URL_IMAGEN_1' },
    { id: 2, name: 'iPhone 13 Pro', description: 'Smartphone con cámara Pro y pantalla Super Retina XDR', price: 1099.99, category: 'Electrónica', image: 'URL_IMAGEN_2' },
    { id: 3, name: 'TV Samsung QLED 4K', description: 'Televisor con tecnología Quantum Dot y resolución 4K', price: 899.99, category: 'Electrónica', image: 'URL_IMAGEN_3' },
    { id: 4, name: 'Auriculares Sony WH-1000XM4', description: 'Auriculares inalámbricos con cancelación de ruido', price: 299.99, category: 'Electrónica', image: 'URL_IMAGEN_4' },
    { id: 5, name: 'Cámara Mirrorless Canon EOS R5', description: 'Cámara profesional con grabación de video 8K', price: 3499.99, category: 'Electrónica', image: 'URL_IMAGEN_5' },
    { id: 6, name: 'Tablet iPad Air', description: 'Tableta con pantalla Liquid Retina y potente chip A14 Bionic', price: 599.99, category: 'Electrónica', image: 'URL_IMAGEN_6' },
    { id: 7, name: 'Smartwatch Garmin Venu 2', description: 'Reloj inteligente con seguimiento avanzado de salud y deportes', price: 399.99, category: 'Electrónica', image: 'URL_IMAGEN_7' },
    { id: 8, name: 'Altavoz Bluetooth JBL Flip 5', description: 'Altavoz portátil resistente al agua con sonido potente', price: 89.99, category: 'Electrónica', image: 'URL_IMAGEN_8' },
    { id: 9, name: 'Impresora Epson EcoTank', description: 'Impresora con tanques de tinta recargables de alta capacidad', price: 299.99, category: 'Electrónica', image: 'URL_IMAGEN_9' },
    { id: 10, name: 'Router WiFi 6 TP-Link Archer AX6000', description: 'Router de alta velocidad con soporte para la última tecnología WiFi', price: 249.99, category: 'Electrónica', image: 'URL_IMAGEN_10' },
  
    // Categoría: Ropa
    { id: 11, name: 'Chaqueta de Cuero', description: 'Chaqueta de cuero genuino con forro suave', price: 249.99, category: 'Ropa', image: 'URL_IMAGEN_11' },
    { id: 12, name: 'Zapatillas Deportivas Nike Air Max', description: 'Zapatillas deportivas con tecnología de amortiguación Air Max', price: 129.99, category: 'Ropa', image: 'URL_IMAGEN_12' },
    { id: 13, name: 'Camiseta Polo Ralph Lauren', description: 'Camiseta polo de algodón pima con logo bordado', price: 79.99, category: 'Ropa', image: 'URL_IMAGEN_13' },
    { id: 14, name: 'Jeans Levi\'s 501', description: 'Jeans clásicos con corte recto y estilo atemporal', price: 59.99, category: 'Ropa', image: 'URL_IMAGEN_14' },
    { id: 15, name: 'Abrigo de Lana', description: 'Abrigo elegante de lana con diseño moderno', price: 199.99, category: 'Ropa', image: 'URL_IMAGEN_15' },
    { id: 16, name: 'Vestido Floral', description: 'Vestido femenino con estampado floral y diseño favorecedor', price: 89.99, category: 'Ropa', image: 'URL_IMAGEN_16' },
    { id: 17, name: 'Sombrero de Paja', description: 'Sombrero de paja con ala ancha para protección solar', price: 29.99, category: 'Ropa', image: 'URL_IMAGEN_17' },
    { id: 18, name: 'Calcetines de Algodón', description: 'Pack de calcetines suaves y transpirables', price: 14.99, category: 'Ropa', image: 'URL_IMAGEN_18' },
    { id: 19, name: 'Pantalones Deportivos Adidas', description: 'Pantalones cómodos para entrenamiento y estilo casual', price: 39.99, category: 'Ropa', image: 'URL_IMAGEN_19' },
    { id: 20, name: 'Gorra de Béisbol', description: 'Gorra clásica de béisbol con ajuste regulable', price: 19.99, category: 'Ropa', image: 'URL_IMAGEN_20' },
  
    // Categoría: Libros
    { id: 21, name: 'Libro "El Principito"', description: 'Clásico de la literatura infantil escrito por Antoine de Saint-Exupéry', price: 14.99, category: 'Libros', image: 'URL_IMAGEN_21' },
    { id: 22, name: 'Novela "Cien años de soledad"', description: 'Obra maestra del realismo mágico escrita por Gabriel García Márquez', price: 19.99, category: 'Libros', image: 'URL_IMAGEN_22' },
    { id: 23, name: 'Guía de Aprendizaje de JavaScript', description: 'Libro educativo para aprender JavaScript desde cero', price: 29.99, category: 'Libros', image: 'URL_IMAGEN_23' },
    { id: 24, name: 'Biografía de Steve Jobs', description: 'Historia completa de la vida del cofundador de Apple', price: 24.99, category: 'Libros', image: 'URL_IMAGEN_24' },
    { id: 25, name: 'Libro de Cocina Italiana', description: 'Recetas auténticas y deliciosas de la cocina italiana', price: 34.99, category: 'Libros', image: 'URL_IMAGEN_25' },
    { id: 26, name: 'Thriller Psicológico', description: 'Novela intrigante con giros inesperados', price: 18.99, category: 'Libros', image: 'URL_IMAGEN_26' },
    { id: 27, name: 'Libro de Fotografía', description: 'Exploración visual de la fotografía contemporánea', price: 42.99, category: 'Libros', image: 'URL_IMAGEN_27' },
    { id: 28, name: 'Libro de Ciencia Ficción', description: 'Aventuras en mundos futuristas y tecnología avanzada', price: 16.99, category: 'Libros', image: 'URL_IMAGEN_28' },
    { id: 29, name: 'Libro de Historia Antigua', description: 'Exploración de civilizaciones antiguas y sus misterios', price: 26.99, category: 'Libros', image: 'URL_IMAGEN_29' },
    { id: 30, name: 'Libro de Poesía Contemporánea', description: 'Colección de poesía de autores contemporáneos', price: 12.99, category: 'Libros', image: 'URL_IMAGEN_30' },
  
    // Categoría: Juegos de Mesa
    { id: 31, name: 'Juego de Mesa Catan', description: 'Juego estratégico de mesa para toda la familia', price: 39.99, category: 'Juegos de Mesa', image: 'URL_IMAGEN_31' },
    { id: 32, name: 'Dominó de Madera', description: 'Set clásico de dominó con fichas de madera', price: 15.99, category: 'Juegos de Mesa', image: 'URL_IMAGEN_32' },
    { id: 33, name: 'Rompecabezas 1000 piezas', description: 'Rompecabezas desafiante con 1000 piezas', price: 24.99, category: 'Juegos de Mesa', image: 'URL_IMAGEN_33' },
    { id: 34, name: 'Juego de Cartas Uno', description: 'Clásico juego de cartas para divertirse en familia', price: 9.99, category: 'Juegos de Mesa', image: 'URL_IMAGEN_34' },
    { id: 35, name: 'Ajedrez de Madera', description: 'Tablero de ajedrez de madera con piezas elegantes', price: 49.99, category: 'Juegos de Mesa', image: 'URL_IMAGEN_35' },
    { id: 36, name: 'Juego de Palabras Scrabble', description: 'Desafío de palabras con fichas de letras', price: 29.99, category: 'Juegos de Mesa', image: 'URL_IMAGEN_36' },
    { id: 37, name: 'Juego de Estrategia Risk', description: 'Conquista territorios en este juego de estrategia', price: 44.99, category: 'Juegos de Mesa', image: 'URL_IMAGEN_37' },
    { id: 38, name: 'Juego de Rol Dungeons & Dragons', description: 'Sumérgete en un mundo de fantasía con este juego de rol', price: 59.99, category: 'Juegos de Mesa', image: 'URL_IMAGEN_38' },
    { id: 39, name: 'Puzzle 3D de Arquitectura', description: 'Construye réplicas detalladas de famosos edificios', price: 19.99, category: 'Juegos de Mesa', image: 'URL_IMAGEN_39' },
    { id: 40, name: 'Juego de Estrategia Carcassonne', description: 'Crea paisajes medievales en este juego táctico', price: 34.99, category: 'Juegos de Mesa', image: 'URL_IMAGEN_40' },
  
    // Categoría: Deportes
  { id: 41, name: 'Bicicleta de Montaña', description: 'Bicicleta todoterreno para aventuras en la naturaleza', price: 549.99, category: 'Deportes', image: 'URL_IMAGEN_41' },
  { id: 42, name: 'Balón de Fútbol Adidas', description: 'Balón de fútbol profesional con diseño de la UEFA Champions League', price: 29.99, category: 'Deportes', image: 'URL_IMAGEN_42' },
  { id: 43, name: 'Set de Pesas', description: 'Set completo de pesas para entrenamiento en casa', price: 79.99, category: 'Deportes', image: 'URL_IMAGEN_43' },
  { id: 44, name: 'Raqueta de Tenis Head', description: 'Raqueta de tenis de alta calidad para jugadores avanzados', price: 129.99, category: 'Deportes', image: 'URL_IMAGEN_44' },
  { id: 45, name: 'Mochila de Senderismo', description: 'Mochila resistente al agua para excursiones y senderismo', price: 49.99, category: 'Deportes', image: 'URL_IMAGEN_45' },
  { id: 46, name: 'Guantes de Ciclismo', description: 'Guantes transpirables para ciclismo de montaña', price: 19.99, category: 'Deportes', image: 'URL_IMAGEN_46' },
  { id: 47, name: 'Patineta Profesional', description: 'Patineta con tabla de arce para trucos profesionales', price: 89.99, category: 'Deportes', image: 'URL_IMAGEN_47' },
  { id: 48, name: 'Botella de Agua Deportiva', description: 'Botella con boquilla a prueba de fugas para actividades al aire libre', price: 9.99, category: 'Deportes', image: 'URL_IMAGEN_48' },
  { id: 49, name: 'Pelota de Yoga', description: 'Pelota de yoga anti-explosión para entrenamiento de equilibrio', price: 15.99, category: 'Deportes', image: 'URL_IMAGEN_49' },
  { id: 50, name: 'Cuerda de Saltar Profesional', description: 'Cuerda ajustable para saltar con mangos antideslizantes', price: 12.99, category: 'Deportes', image: 'URL_IMAGEN_50' }
  // Puedes agregar más productos de Deportes según sea necesario
];


// Ruta para obtener todos los productos
app.get('/products', (req, res) => {
  res.json(products);
});

// Ruta para obtener un producto por ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    res.status(404).json({ message: 'Producto no encontrado' });
  } else {
    res.json(product);
  }
});


// Ruta para obtener productos por categoría
app.get('/products/category/:category', (req, res) => {
    const category = req.params.category.toLowerCase();
    const categoryProducts = products.filter(p => p.category.toLowerCase() === category);
  
    if (categoryProducts.length === 0) {
      res.status(404).json({ message: 'No hay productos en esta categoría' });
    } else {
      res.json(categoryProducts);
    }
  });
  
  // Ruta para obtener un producto por ID dentro de una categoría
  app.get('/products/category/:category/:id', (req, res) => {
    const category = req.params.category.toLowerCase();
    const productId = parseInt(req.params.id);
    const categoryProduct = products.find(p => p.category.toLowerCase() === category && p.id === productId);
  
    if (!categoryProduct) {
      res.status(404).json({ message: 'Producto no encontrado en esta categoría' });
    } else {
      res.json(categoryProduct);
    }
  });
  

  // Ruta para obtener productos filtrados por nombre
app.get('/products/filter/name', (req, res) => {
    const { productName } = req.query;
  
    if (!productName) {
      return res.status(400).json({ message: 'Se requiere el parámetro productName' });
    }
  
    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(productName.toLowerCase()));
  
    if (filteredProducts.length === 0) {
      return res.status(404).json({ message: 'No hay productos que cumplan con los criterios de filtrado' });
    }
  
    res.json(filteredProducts);
  });
  

  // Ruta para obtener productos filtrados por precio
app.get('/products/filter/price', (req, res) => {
    const { minPrice, maxPrice } = req.query;
  
    if (!minPrice || !maxPrice) {
      return res.status(400).json({ message: 'Se requieren parámetros minPrice y maxPrice' });
    }
  
    const filteredProducts = products.filter(p => p.price >= parseFloat(minPrice) && p.price <= parseFloat(maxPrice));
  
    if (filteredProducts.length === 0) {
      return res.status(404).json({ message: 'No hay productos que cumplan con los criterios de filtrado' });
    }
  
    res.json(filteredProducts);
  });

  
  // Ruta para obtener productos ordenados por precio
app.get('/products/sort/price', (req, res) => {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
  
    if (sortedProducts.length === 0) {
      return res.status(404).json({ message: 'No hay productos para ordenar' });
    }
  
    res.json(sortedProducts);
  });
  

  // Ruta para actualizar un producto por ID
app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;
  
    const index = products.findIndex(p => p.id === productId);
  
    if (index === -1) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
  
    products[index] = { ...products[index], ...updatedProduct };
  
    res.json({ message: 'Producto actualizado exitosamente', product: products[index] });
  });
  
  // Ruta para eliminar un producto por ID
  app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
  
    const index = products.findIndex(p => p.id === productId);
  
    if (index === -1) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
  
    const deletedProduct = products.splice(index, 1);
  
    res.json({ message: 'Producto eliminado exitosamente', product: deletedProduct[0] });
  });
  
  // Ruta para crear un nuevo producto
app.post('/products', (req, res) => {
  const newProduct = req.body;
  // Aquí deberías agregar lógica para validar y guardar el nuevo producto en tu base de datos
  // Luego, devuelve el producto creado en la respuesta
  res.json(newProduct);
});


// Ruta para crear un nuevo producto
app.post('/products', (req, res) => {
  const newProduct = req.body;

  // Verifica que todos los campos requeridos estén presentes en la solicitud
  if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.category || !newProduct.image) {
      return res.status(400).json({ message: 'Todos los campos son requeridos: name, description, price, category, image' });
  }

  // Asigna un nuevo ID al producto
  newProduct.id = products.length + 1;

  // Agrega el nuevo producto a la base de datos simulada
  products.push(newProduct);

  // Devuelve el nuevo producto en la respuesta
  res.status(201).json(newProduct);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
