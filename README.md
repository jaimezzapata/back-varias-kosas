# varias-kosas API

API REST construida con **Node.js**, **Express** y **Prisma (PostgreSQL)** para una plataforma de compra y venta de artículos de segunda mano en excelente calidad (ropa, tecnología, hogar, deportes, libros, accesorios y más).

---

## Arquitectura por capas

El proyecto está organizado en capas independientes dentro de `src/`:

```text
back-varias-kosas/
├── prisma/
│   └── schema.prisma              # Modelos de base de datos (User, Publication)
├── src/
│   ├── config/                    # Configuración de entorno, Prisma y Swagger
│   ├── models/                    # Mappers de respuesta y constantes de dominio
│   ├── repositories/              # Acceso a datos con Prisma
│   ├── services/                  # Lógica de negocio y reglas de propiedad
│   ├── controllers/               # Manejo de req/res HTTP
│   ├── transport/                 # Rutas, middlewares (auth, validación, errores) y DTOs Zod
│   ├── utils/                     # Clases de error y utilidades JWT
│   ├── app.js                     # Configuración de Express y Swagger UI
│   └── server.js                  # Arranque del servidor y conexión a Prisma
├── .env                           # Variables de entorno (DATABASE_URL, etc.)
└── package.json
```

---

## Requisitos previos

- **Node.js** 20+
- Base de datos **PostgreSQL** configurada en `.env`

---

## Instalación y ejecución

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Configura tu archivo `.env` (ya incluye `DATABASE_URL`; opcionalmente puedes definir `PORT` y `JWT_SECRET`):
   ```env
   DATABASE_URL="postgres://..."
   PORT=3000
   JWT_SECRET="cambia_este_secreto_en_produccion"
   JWT_EXPIRES_IN="7d"
   ```

3. Genera el cliente de Prisma y sincroniza el esquema con la base de datos:
   ```bash
   npm run prisma:generate
   npm run prisma:push
   ```

4. Inicia el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

---

## Documentación interactiva (Swagger)

Con el servidor encendido, abre en tu navegador:

- **Swagger UI**: `http://localhost:3000/api/docs`
- **Especificación OpenAPI JSON**: `http://localhost:3000/api/docs.json`

Para probar rutas protegidas en Swagger UI:
1. Registra un usuario en `POST /api/auth/register` o inicia sesión en `POST /api/auth/login`.
2. Copia el `token` recibido.
3. Haz clic en el botón **Authorize** en Swagger UI y pega el token.

---

## Endpoints principales (`/api`)

### Salud
| Método | Ruta | Descripción | Auth |
| --- | --- | --- | --- |
| `GET` | `/api/health` | Verifica que la API esté activa | No |

### Autenticación
| Método | Ruta | Descripción | Auth |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Registra un usuario y devuelve JWT | No |
| `POST` | `/api/auth/login` | Inicia sesión y devuelve JWT | No |
| `GET` | `/api/auth/me` | Retorna el perfil del usuario autenticado | Sí |

### Publicaciones (CRUD)
| Método | Ruta | Descripción | Auth |
| --- | --- | --- | --- |
| `GET` | `/api/publications` | Lista todas las publicaciones (filtros: `category`, `condition`, `status`, `search`, `userId`) | No |
| `GET` | `/api/publications/mine` | Lista únicamente las publicaciones del usuario autenticado | Sí |
| `GET` | `/api/publications/:id` | Obtiene el detalle de una publicación | No |
| `POST` | `/api/publications` | Crea una nueva publicación asociada al usuario | Sí |
| `PUT` / `PATCH` | `/api/publications/:id` | Edita una publicación (solo si pertenece al usuario) | Sí |
| `DELETE` | `/api/publications/:id` | Elimina una publicación (solo si pertenece al usuario) | Sí |

### Valores permitidos en publicaciones
- **Categorías (`category`)**: `ropa`, `tecnologia`, `hogar`, `deportes`, `libros`, `accesorios`, `otros`
- **Condición (`condition`)**: `nuevo`, `como_nuevo`, `excelente` *(por defecto)*, `bueno`
- **Estado (`status`)**: `disponible` *(por defecto)*, `vendido`, `pausado`

---

## Scripts disponibles

- `npm run dev` — Inicia el servidor con recarga automática (`node --watch`).
- `npm start` — Inicia el servidor en modo normal.
- `npm run prisma:generate` — Genera el cliente de Prisma.
- `npm run prisma:push` — Sincroniza `prisma/schema.prisma` con la base de datos.
