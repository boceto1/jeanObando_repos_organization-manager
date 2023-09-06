# Proyecto Organization Manager

Este es un proyecto de backend que se ha desarrollado como parte de una entrevista técnica. El objetivo principal de este proyecto es demostrar mis habilidades y conocimientos en el desarrollo de aplicaciones web backend.

## Descripción del Ejercicio
El Proyecto requiere implementar que me permita:

* Exponer un Mock Endpoint que será utilizado por otro servicio
* Implementar un CRUD service para la entididad Organization
* Implementar un endpoint que permita obtener las métricas de los repositorios de una tribu. 
* Implementar un endpoint que genere un archivo csv con la información del endpoint anterior

_Nota: El ejercicio provee otros detalles cómo la estructura del MockEndpoint y el diseño de la Base de Datos. Sin embargo, estos no serán expuestos en este apartado._

## Tecnologías Utilizadas

- **Versión de Node**: v18.16.0
- **Lenguaje de Programación**: Javascript/Typescript
- **Framework**: NestJS
- **Base de Datos**: Cockroachdb (Postgre) | MySQL
- **Herramientas**: TypeORM, Jest

## Funcionalidades

- MockEndpoint con respuesta al estado de los repositorios de una tribu
- Crud Service de la entidad organización
- Endpoint para la consulta de métricas de los repositorios de una tribu
- Endpoint para generar un csv con las métricas de los repositorios de una tribu

Adicionalmente se ha implementado lo siguiente:
- Migraciones para la creación de las tablas de la Base de Datos
- Integración con Swagger para documentar las endpoints

## Estructura del Proyecto

- **/src**: Contiene el código fuente del proyecto.
  - **/db**: Contiene los archivos de migración.
  - **/metrics**: Módulo para la administración del recurso Metric.
  - **/mock-api**: Módulo con el mock endpoint.
  - **/organization**: Módulo para la administración del recurso Organization.
  - **/repository**: Módulo para la administración del recurso Repositry.
  - **/third-party-validator**: Módulo con el cliente HTTP para consumir el mock endpoint
  - **/tribe**: Módulo para la administración del recurso Tribe.
  - **/utils**: Carpeta con funciones utilitarias


## Instalación y Uso

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias utilizando el gestor de paquetes adecuado.
3. Configura las variables de entorno necesarias.
4. Ejecuta la aplicación utilizando el comando [comando de inicio].

```bash
$ git clone https://github.com/boceto1/jeanObando_repos_habit_tracker.git
$ cd jeanObando_repos_habit_tracker
$ nvm use # para asegurar utilizar la correcta versión de node
$ yarn install
$ cp .env.example .env # Copia el archivo de ejemplo de variables de entorno y configúralo adecuadamente
$ yarn migration:run # La primera vez es neceario para condicionar la Base de Datos
$ yarn start:dev # o el comando de inicio correspondiente
```

* Puedes acceder a los endpoints a traves de http://localhost:3000

* Puedes acceder a la documentación traves de http://localhost:3000/api

## Variables de Entorno

- `DATABASE_DRIVER`: Indica la BD que estamos utilizado.

Si estamos usando Mysql
- `DATABASE_HOST`: Host de la Base de Datos
- `DATABASE_PORT`: Puerto de la Base de Datos
- `DATABASE_USERNAME`: Usuario de la Base de Datos
- `DATABASE_PASSWORD`: Password para acceder a la base de datos
- `DATABASE_DATABASE`: Nombre de la Base de Datos a utilizar

Si estamos usando Cockroachdb
- `DATABASE_URL`: Cadena de conexión a la Base de Datos

## Pruebas

Para ejecutar las pruebas, utiliza el siguiente comando:

```bash
$ yarn test
```

Se ha implementado pruebas a nivel de servicios.

Existen pruebas para:
- Cada servicio del OrganizationService
- Para el servicio getRepositoryMetrics

_Nota: Al `generateRepositoryMetricsReport` basarse en `getRepositoryMetrics`, y solo implementar funcionalidad para la generación del csv hemos decidido no implementar pruebas por tiempo. Sin embargo, sería oportuno hacerlo más adelante`._

---

Gracias por revisar mi proyecto. Si tienes alguna pregunta o sugerencia, no dudes en contactarme.

Jean Karlo Obando Ramos
janka.obando@outlook.es
