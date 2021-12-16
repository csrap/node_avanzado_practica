## Node_avanzado_practica

## Bootcamp Full Stack Web Developer

## Práctica Final - Módulo: Desarrollo Backend Avanzado en NodeJS/MongoDB

## NodePop Backend

La práctica la he realizado sobre el código que creé para la práctica final de Backend con NodeJS/MongoDB (Pulsa el siguiente enlace para ver el repositorio:

Indice de retos obligatorios e implementados en esta práctica:

- Autenticación con JWT
- Internacionalización (i18n)
- Subida de imagen con tarea en background (realizada con microservicio usando Sharp)

## Instrucciones

Para el correcto funcionamiento de la aplicación será necesario renombrar el archivo ".env.example" por ".env" y modificar si fuera necesario, los datos de ejemplo proporcionados como variables de entorno.

Para arrancar el proyecto en modo desarrollo usamos en la terminal el siguiente comando :

## Usage

Copy .env.example to .env and set your credentials

```sh
cp .env.example.env
```

### Development Start

```sh
npm run dev
```

Iniciar microservicio:
Para iniciar el microservicio creado que se encargará de generar un thumbnail de la imagen de cada anuncio subido, se usará:

```sh
nodemon thumbnails.js
```

Cada thumbnail generado se guardará en la carpeta "public/images/thumbnails"

## Inicializar la base de datos

```sh
npm run initDB
```

## Recordatorio de como se arranca MongoDB en Mac y Linux

Con la instalación .tar.gz puedes arrancar con este comando:

```sh
/bin/mongod --dbpath ./data/db
```

Este proceso creará la base de datos con 2 anuncios y 2 usuarios de prueba:

```sh
user@example.com - Contraseña: 1234
```

```sh
admin@example.com - Contraseña: 1234
```

## Rutas del API

- Al hacer una petición "POST" a la siguiente ruta con usuario y contraseña, devuelve un TOKEN implementado con JWT para poder usar en la cabecera "Authorization" en el resto de peticiones:

```sh
http://localhost:3200/api/authenticate
```

## Obtener los anuncios

- Haciendo un "GET"

```sh
http://localhost:3200/api/announcements
```

## Crear anuncios usando la siguiente petición, añadir el TOKEN en la cabecera "Authorization":

```sh
http://localhost:3200/api/announcements
```

No hay que olvidar que para realizar correctamente el envío del formulario en la petición habrá que usar "form-data" en el "Body" de la petición e incluir la key "foto" como tipo "file" y como value añadir la imagen que se quiera cargar.

GET:

Para poder mostrar los anuncios usando la siguiente petición, añadir el TOKEN en la cabecera "Authorization":

```sh
http://localhost:3200/api/announcements
```
