import {
  PUBLICATION_CATEGORIES,
  PUBLICATION_CONDITIONS,
  PUBLICATION_STATUSES,
} from '../models/publication.model.js';

export const swaggerSpec = {
  openapi: '3.0.3',
  info: {
    title: 'varias-kosas API',
    version: '1.0.0',
    description:
      'API REST para la plataforma de compra y venta de artículos de segunda mano en excelente calidad (sin autenticación por token).',
  },
  servers: [
    {
      url: '/api',
      description: 'Servidor actual',
    },
    {
      url: 'http://localhost:3000/api',
      description: 'Servidor local de desarrollo',
    },
  ],
  tags: [
    { name: 'Salud', description: 'Verificación de estado de la API' },
    { name: 'Autenticación', description: 'Registro, inicio de sesión (GET) y perfil' },
    { name: 'Usuarios', description: 'Consulta de usuarios registrados' },
    { name: 'Publicaciones', description: 'CRUD de artículos publicados' },
  ],
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Jaime Zapata' },
          email: { type: 'string', format: 'email', example: 'jaime@variaskosas.co' },
          phone: { type: 'string', nullable: true, example: '3001112233' },
          city: { type: 'string', nullable: true, example: 'Medellín' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      Publication: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 10 },
          title: { type: 'string', example: 'Chaqueta de jean Levi’s talla M' },
          description: {
            type: 'string',
            example: 'Usada dos veces, sin detalles ni manchas, excelente estado.',
          },
          price: { type: 'number', example: 120000 },
          category: { type: 'string', enum: PUBLICATION_CATEGORIES, example: 'ropa' },
          condition: { type: 'string', enum: PUBLICATION_CONDITIONS, example: 'excelente' },
          imageUrl: {
            type: 'string',
            nullable: true,
            example: 'https://ejemplo.com/chaqueta.jpg',
          },
          status: { type: 'string', enum: PUBLICATION_STATUSES, example: 'disponible' },
          userId: { type: 'integer', example: 1 },
          seller: { $ref: '#/components/schemas/User' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      RegisterRequest: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string', minLength: 2, maxLength: 80, example: 'Jaime Zapata' },
          email: { type: 'string', format: 'email', example: 'jaime@variaskosas.co' },
          password: { type: 'string', minLength: 6, maxLength: 100, example: '123456' },
          phone: { type: 'string', minLength: 7, maxLength: 20, example: '3001234567' },
          city: { type: 'string', minLength: 2, maxLength: 60, example: 'Medellín' },
        },
      },
      AuthResponse: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          data: {
            type: 'object',
            properties: {
              user: { $ref: '#/components/schemas/User' },
            },
          },
        },
      },
      CreatePublicationRequest: {
        type: 'object',
        required: ['userId', 'title', 'description', 'price', 'category'],
        properties: {
          userId: { type: 'integer', example: 1 },
          title: { type: 'string', minLength: 3, maxLength: 120, example: 'Audífonos Sony WH-1000XM4' },
          description: {
            type: 'string',
            minLength: 10,
            maxLength: 1000,
            example: 'En caja original con cable y estuche, batería al 100%.',
          },
          price: { type: 'number', minimum: 0.01, example: 650000 },
          category: { type: 'string', enum: PUBLICATION_CATEGORIES, example: 'tecnologia' },
          condition: { type: 'string', enum: PUBLICATION_CONDITIONS, example: 'como_nuevo' },
          imageUrl: { type: 'string', format: 'uri', example: 'https://ejemplo.com/audifonos.jpg' },
        },
      },
      UpdatePublicationRequest: {
        type: 'object',
        properties: {
          userId: { type: 'integer', example: 1, description: 'Opcional: valida propiedad si se envía' },
          title: { type: 'string', minLength: 3, maxLength: 120 },
          description: { type: 'string', minLength: 10, maxLength: 1000 },
          price: { type: 'number', minimum: 0.01 },
          category: { type: 'string', enum: PUBLICATION_CATEGORIES },
          condition: { type: 'string', enum: PUBLICATION_CONDITIONS },
          imageUrl: { type: 'string', format: 'uri' },
          status: { type: 'string', enum: PUBLICATION_STATUSES },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          error: { type: 'string', example: 'Mensaje descriptivo del error' },
          details: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: { type: 'string' },
                message: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },
  paths: {
    '/health': {
      get: {
        tags: ['Salud'],
        summary: 'Verificar estado de la API y base de datos',
        responses: {
          200: { description: 'Servicio operativo' },
        },
      },
    },
    '/auth/register': {
      post: {
        tags: ['Autenticación'],
        summary: 'Registrar un nuevo usuario',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RegisterRequest' },
            },
          },
        },
        responses: {
          201: {
            description: 'Usuario registrado exitosamente',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } },
            },
          },
          400: { description: 'Datos inválidos', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          409: { description: 'Correo ya registrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/auth/login': {
      get: {
        tags: ['Autenticación'],
        summary: 'Iniciar sesión con GET (sin token)',
        parameters: [
          { name: 'email', in: 'query', required: true, schema: { type: 'string', format: 'email' }, example: 'jaime@variaskosas.co' },
          { name: 'password', in: 'query', required: true, schema: { type: 'string' }, example: '123456' },
        ],
        responses: {
          200: {
            description: 'Inicio de sesión exitoso',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } },
            },
          },
          400: { description: 'Correo y contraseña requeridos' },
          401: { description: 'Credenciales inválidas', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/auth/me': {
      get: {
        tags: ['Autenticación'],
        summary: 'Obtener el perfil de un usuario por userId',
        parameters: [
          { name: 'userId', in: 'query', required: true, schema: { type: 'integer' }, example: 1 },
        ],
        responses: {
          200: {
            description: 'Perfil del usuario',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { data: { $ref: '#/components/schemas/User' } },
                },
              },
            },
          },
          400: { description: 'userId inválido o faltante' },
          404: { description: 'Usuario no encontrado' },
        },
      },
    },
    '/users': {
      get: {
        tags: ['Usuarios'],
        summary: 'Listar todos los usuarios registrados',
        responses: {
          200: {
            description: 'Lista de usuarios',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: { type: 'array', items: { $ref: '#/components/schemas/User' } },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/users/{id}': {
      get: {
        tags: ['Usuarios'],
        summary: 'Obtener un usuario por ID',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, example: 1 },
        ],
        responses: {
          200: {
            description: 'Detalle del usuario',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { data: { $ref: '#/components/schemas/User' } },
                },
              },
            },
          },
          400: { description: 'ID de usuario inválido' },
          404: { description: 'Usuario no encontrado' },
        },
      },
    },
    '/publications': {
      get: {
        tags: ['Publicaciones'],
        summary: 'Listar todas las publicaciones de todos los usuarios',
        parameters: [
          { name: 'category', in: 'query', schema: { type: 'string', enum: PUBLICATION_CATEGORIES } },
          { name: 'condition', in: 'query', schema: { type: 'string', enum: PUBLICATION_CONDITIONS } },
          { name: 'status', in: 'query', schema: { type: 'string', enum: PUBLICATION_STATUSES } },
          { name: 'search', in: 'query', schema: { type: 'string' }, description: 'Buscar por título o descripción' },
          { name: 'userId', in: 'query', schema: { type: 'integer' }, description: 'Filtrar por ID de usuario' },
        ],
        responses: {
          200: {
            description: 'Lista de publicaciones',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: { type: 'array', items: { $ref: '#/components/schemas/Publication' } },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Publicaciones'],
        summary: 'Crear una nueva publicación (sin token)',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreatePublicationRequest' },
            },
          },
        },
        responses: {
          201: {
            description: 'Publicación creada exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    data: { $ref: '#/components/schemas/Publication' },
                  },
                },
              },
            },
          },
          400: { description: 'Datos inválidos' },
        },
      },
    },
    '/publications/mine': {
      get: {
        tags: ['Publicaciones'],
        summary: 'Listar publicaciones de un usuario por userId',
        parameters: [
          { name: 'userId', in: 'query', required: true, schema: { type: 'integer' }, example: 1 },
          { name: 'category', in: 'query', schema: { type: 'string', enum: PUBLICATION_CATEGORIES } },
          { name: 'condition', in: 'query', schema: { type: 'string', enum: PUBLICATION_CONDITIONS } },
          { name: 'status', in: 'query', schema: { type: 'string', enum: PUBLICATION_STATUSES } },
          { name: 'search', in: 'query', schema: { type: 'string' } },
        ],
        responses: {
          200: {
            description: 'Publicaciones del usuario',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: { type: 'array', items: { $ref: '#/components/schemas/Publication' } },
                  },
                },
              },
            },
          },
          400: { description: 'userId inválido o faltante' },
        },
      },
    },
    '/publications/{id}': {
      get: {
        tags: ['Publicaciones'],
        summary: 'Obtener el detalle de una publicación por ID',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          200: {
            description: 'Detalle de la publicación',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { data: { $ref: '#/components/schemas/Publication' } },
                },
              },
            },
          },
          400: { description: 'ID inválido' },
          404: { description: 'Publicación no encontrada' },
        },
      },
      put: {
        tags: ['Publicaciones'],
        summary: 'Actualizar una publicación (PUT)',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdatePublicationRequest' },
            },
          },
        },
        responses: {
          200: { description: 'Publicación actualizada exitosamente' },
          400: { description: 'Datos o ID inválidos' },
          403: { description: 'Sin permiso para editar esta publicación' },
          404: { description: 'Publicación no encontrada' },
        },
      },
      patch: {
        tags: ['Publicaciones'],
        summary: 'Actualizar parcialmente una publicación (PATCH)',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdatePublicationRequest' },
            },
          },
        },
        responses: {
          200: { description: 'Publicación actualizada exitosamente' },
          400: { description: 'Datos o ID inválidos' },
          403: { description: 'Sin permiso para editar esta publicación' },
          404: { description: 'Publicación no encontrada' },
        },
      },
      delete: {
        tags: ['Publicaciones'],
        summary: 'Eliminar una publicación',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
          { name: 'userId', in: 'query', required: false, schema: { type: 'integer' }, description: 'Opcional: valida propiedad si se envía' },
        ],
        responses: {
          200: { description: 'Publicación eliminada exitosamente' },
          400: { description: 'ID inválido' },
          403: { description: 'Sin permiso para eliminar esta publicación' },
          404: { description: 'Publicación no encontrada' },
        },
      },
    },
  },
};
