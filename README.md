# Proyecto stemfounding-react

Este es el proyecto final para el curso de 2DAW, desarrollado por Luis Garcia. El proyecto es una plataforma de crowdfunding.

## Características

- **Registro y autenticación de usuarios**: Los usuarios pueden registrarse y autenticarse en la plataforma.
- **Creación y gestión de proyectos**: Los emprendedores pueden crear y gestionar sus proyectos.
- **Visualización de proyectos**: Los usuarios no autenticados pueden ver todos los proyectos disponibles.
- **Aceptación o rechazo de proyectos**: Los administradores pueden aceptar o rechazar proyectos.
- **Limitación de proyectos activos**: Los emprendedores pueden tener un máximo de 2 proyectos activos.
- **Visualización de detalles del proyecto**: Incluye el estado del proyecto, el creador, y las inversiones actuales.
- **Inversiones**: Los inversores pueden invertir en proyectos y ver sus inversiones.
- **Comentarios**: Los usuarios pueden añadir, editar y eliminar comentarios en los proyectos.
- **Desactivación automática de proyectos**: Los proyectos se desactivan automáticamente al alcanzar el máximo de financiación o cuando expira la fecha límite sin alcanzar el mínimo.
- **Validación de IBAN**: Validación estricta de IBAN según países permitidos.
- **Paginación**: Paginación de proyectos para una mejor visualización.

## Requisitos

- Node.js y npm
- PHP y Composer
- React
- Vite
- Bootstrap
- Laravel (para el backend)

## Instalación

### Frontend (React)

1. Clona el repositorio del frontend:
   ```bash
   git clone https://github.com/garcialuis23/stemfounding-react.git
   cd stemfounding-react
   ```

2. Instala las dependencias de Node.js:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

### Backend (PHP/Laravel)

4. Clona el repositorio del backend:
   ```bash
   git clone https://github.com/garcialuis23/stemfounding-php.git
   cd stemfounding-php
   ```

5. Instala las dependencias de PHP:
   ```bash
   composer install
   ```

6. Configura el archivo `.env` con tu base de datos

7. Ejecuta las migraciones:
   ```bash
   php artisan migrate
   ```

8. Inicia el servidor del backend:
   ```bash
   php artisan serve
   ```

## Comandos disponibles

- `npm run dev` - Inicia el servidor de desarrollo del frontend
- `npm run build` - Construye el proyecto para producción
- `npm run preview` - Previsualiza el build de producción
- `npm run lint` - Ejecuta el linter

## Uso

### Configuración inicial

1. **Inicia ambos servidores**:
   - Frontend React: `npm run dev` (puerto 5173)
   - Backend Laravel: `php artisan serve` (puerto 8000)

2. **Administración de proyectos**:
   - Los proyectos creados tienen estado "pending" por defecto
   - **Importante**: Un administrador debe acceder al backend PHP y aceptar los proyectos
   - Solo los usuarios con cargo de "administrador" pueden aceptar/rechazar proyectos
   - Los proyectos aparecerán en el frontend solo después de ser aceptados

### Funcionalidades

- **Registro y autenticación**: Regístrate como usuario y autentícate.
- **Creación de proyectos**: Si eres un emprendedor, puedes crear nuevos proyectos desde tu perfil.
- **Gestión de proyectos**: Los administradores pueden aceptar o rechazar proyectos desde la página de administración del backend.
- **Visualización de proyectos**: Los usuarios pueden ver todos los proyectos aceptados.
- **Inversiones**: Los inversores pueden invertir en proyectos y ver sus inversiones.
- **Comentarios**: Los usuarios pueden añadir, editar y eliminar comentarios en los proyectos.

## Arquitectura del Proyecto

Este proyecto está dividido en dos repositorios:

- **Frontend**: [stemfounding-react](https://github.com/garcialuis23/stemfounding-react) - Aplicación React con Vite
- **Backend**: [stemfounding-php](https://github.com/garcialuis23/stemfounding-php) - API REST con Laravel

### Flujo de trabajo:

1. Los usuarios crean proyectos desde el frontend React
2. Los proyectos se envían al backend Laravel con estado "pending"
3. Un administrador debe aprobar los proyectos desde el panel de administración del backend
4. Los proyectos aprobados se muestran en el frontend para que otros usuarios puedan invertir

## API Endpoints

- **GET /api/projects**: Obtener todos los proyectos.
- **GET /api/projects/{id}**: Obtener un proyecto por ID.
- **POST /api/projects**: Crear un nuevo proyecto.
- **PUT /api/projects/{id}**: Actualizar un proyecto.
- **PUT /api/projects/{id}/inactivate**: Inactivar un proyecto.
- **GET /api/projects/{id}/investments**: Obtener las inversiones de un proyecto por su ID.
- **POST /api/projects/{id}/comments**: Añadir un comentario a un proyecto.
- **PUT /api/projects/{id}/comments/{index}**: Actualizar un comentario por su índice.
- **DELETE /api/projects/{id}/comments/{index}**: Eliminar un comentario por su índice.
- **GET /api/users/{id}**: Obtener los datos de un usuario por su ID.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request para discutir cualquier cambio que desees realizar.

## Contacto

Para cualquier consulta, puedes contactarme a través de [mi correo electrónico](mailto:garciadiazluis23@gmail.com).

---

*Este proyecto fue creado para un proyecto de ciberseguridad para mi escuela STEM.*
