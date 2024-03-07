
Resumen de la API:
La API es un servicio para acceder y gestionar información sobre productos en diversas categorías, como electrónica, ropa, libros, juegos de mesa y deportes. Proporciona operaciones como obtener todos los productos, buscar por ID, filtrar por categoría, nombre y precio, ordenar por precio, actualizar y eliminar productos.

Instrucciones para ejecutar y usar la API:
Clonar el Repositorio:

git clone [URL_DEL_REPOSITORIO]
Instalar Dependencias:

cd [NOMBRE_DEL_DIRECTORIO_CLONADO]
npm install
Configurar el Entorno:

Asegúrate de tener Node.js instalado.
Crea un archivo .env en el directorio raíz (puedes copiar el archivo .env.example).
Personaliza las variables de entorno según sea necesario.
Ejecutar la API:

npm start
Acceder a la API:

La API estará disponible en http://localhost:3000.
Puedes utilizar herramientas como Postman o cURL para realizar solicitudes HTTP.
Endpoints Disponibles:

Obtener todos los productos: GET http://localhost:3000/products
Obtener producto por ID: GET http://localhost:3000/products/:id
Obtener productos por categoría: GET http://localhost:3000/products/category/:category
Filtrar productos por nombre: GET http://localhost:3000/products/filter/name?productName=[NOMBRE]
Filtrar productos por precio: GET http://localhost:3000/products/filter/price?minPrice=[MIN]&maxPrice=[MAX]
Ordenar productos por precio: GET http://localhost:3000/products/sort/price
Actualizar producto por ID: PUT http://localhost:3000/products/:id
Eliminar producto por ID: DELETE http://localhost:3000/products/:id
Ejemplo de Uso (cURL):

Obtener todos los productos:


curl http://localhost:3000/products
Obtener producto por ID:


curl http://localhost:3000/products/1
Actualizar producto por ID:


curl -X PUT -H "Content-Type: application/json" -d '{"name": "Nuevo Producto"}' http://localhost:3000/products/1
Contribuciones:

¡Siéntete libre de contribuir al desarrollo de esta API! Realiza tus cambios, crea un fork y envía un pull request.
