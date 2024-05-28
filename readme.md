# PCR Express API
Este es un proyecto de API RESTful construido con Node.js y Express. La API permite a los usuarios autenticarse y realizar operaciones CRUD en las reseñas de películas.

## Instalación
Clona este repositorio en tu máquina local usando `git clone`.
Navega a la carpeta del proyecto usando `cd pcr-express-api`.
Instala las dependencias del proyecto usando `npm install`.

## Base de datos

Este proyecto utiliza MySQL como sistema de gestión de bases de datos. La estructura de la base de datos incluye las siguientes tablas:

`users`: Almacena la información de los usuarios, incluyendo id, name, email y password.
`reviews`: Almacena las reseñas de las películas. Cada reseña incluye id, description, score, user_id y movie_id.
Para configurar la base de datos en tu entorno local, sigue estos pasos:

Asegúrate de tener MySQL instalado en tu máquina.
Crea una nueva base de datos para el proyecto.
Configura las variables de entorno en tu archivo .env para que coincidan con tu configuración de MySQL.
Ejecuta las migraciones para crear las tablas necesarias. Puedes encontrar los scripts de migración en la carpeta migrations.
Por favor, ten en cuenta que este proyecto utiliza el paquete mysql de Node.js para interactuar con la base de datos.


## Uso
Para iniciar el servidor, usa el comando `npm start`. Esto iniciará el servidor en el puerto especificado en tu archivo .env.

Para iniciar el servidor en modo de desarrollo (con nodemon), usa el comando `npm run watch`.

## Endpoints
###  Autenticación
- POST `/api/auth/signin`: Registra un nuevo usuario.
- POST `/api/auth/login`: Inicia sesión con un usuario existente.
###  Reseñas
- GET `/api/reviews/:id?`: Obtiene todas las reseñas o una reseña específica por ID.
- POST `/api/reviews/create`: Crea una nueva reseña. Requiere autenticación.

