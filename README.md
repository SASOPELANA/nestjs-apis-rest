# API REST con NestJS, TypeScript, Docker con PostgreSQL

## Descripción

En este proyecto decidí usar NestJS para tener una API REST con TypeScript, motivo de estar mejor organizado y tener una mejor estructura del proyecto, usando arquitectura monolítica modular, con la carpeta `src` con los módulos, controllers, services, dtos, types, etc. Para la gestión de la base de datos use **Prisma ORM**, **Docker** para tener un contenedor con **PostgreSQL**, y para tener una documentación legible y fácil de entender la API use **Swagger** para probar los endpoints.

Configuración de variables de entorno con el paquete `@nestjs/config` (o `dotenv`) para tener una mejor gestión de las variables de entorno para credenciales e información sensible como password, bases de datos y tokens. Para la validación de los DTOs use los paquetes `class-validator` y `class-transformer` para tener una validación más robusta y fácil de usar.

Prisma es el ORM de nueva generación que permite una interacción tipo-segura (type-safe) con la base de datos, integrándose perfectamente con el ecosistema de NestJS.

Guía a través de la documentación Oficial de NestJS para una mejor experiencia de desarrollo y buenas prácticas.

## Manejo de Errores con Excepciones HTTP en NestJS

NestJS provee excepciones listas para usar que lanzan automáticamente el status HTTP correcto y formatean la respuesta en JSON.

**Filosofía recomendada**  

- Lanzar excepciones directamente (`throw`) desde **services** (lógica de negocio) o controllers (validaciones simples).  
- **No usar try/catch** salvo que necesites loguear, hacer cleanup o transformar el error.  
- El filtro global de excepciones de NestJS las captura y responde automáticamente.

## Excepciones más usadas y cuándo lanzarlas

| Excepción                        | Status | Cuándo usarla (caso típico)                              | Ejemplo de uso práctico                                      |
|----------------------------------|--------|----------------------------------------------------------|--------------------------------------------------------------|
| `BadRequestException`            | 400    | Datos inválidos, validación fallida, parámetro malo      | Email con formato incorrecto, campo requerido faltante      |
| `UnauthorizedException`          | 401    | No autenticado (sin token, token inválido/expirado)      | Intento de acceso sin JWT válido o credenciales erróneas     |
| `ForbiddenException`             | 403    | Autenticado pero sin permiso (rol insuficiente)          | Usuario "user" intenta eliminar un recurso de "admin"       |
| `NotFoundException`              | 404    | Recurso no existe en la base de datos                    | `GET /users/999` → el usuario con ID 999 no existe           |
| `ConflictException`              | 409    | Conflicto de estado (duplicado, ya existe)               | Registro de usuario con email que ya está en uso             |
| `GoneException`                  | 410    | Recurso existió pero ya no está disponible               | Token de recuperación de contraseña ya expirado/usado       |
| `InternalServerErrorException`   | 500    | Error grave del servidor (usar muy poco manualmente)     | Mejor dejar que errores no manejados suban solos             |

## Ejemplos prácticos

### 1. En un Service (recomendado – lógica de negocio)

```ts
// src/users/users.service.ts
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`El usuario con ID ${id} no existe`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (!createUserDto.email.includes('@')) {
      throw new BadRequestException('El email debe ser válido');
    }

    const emailExists = await this.userRepository.existsByEmail(createUserDto.email);
    if (emailExists) {
      throw new ConflictException('El email ya está registrado');
    }

    return this.userRepository.save(createUserDto);
  }

  async update(id: number, updateDto: UpdateUserDto, currentUser: User) {
    const user = await this.findOne(id); // ya lanza NotFound si no existe

    if (user.id !== currentUser.id && !currentUser.isAdmin) {
      throw new ForbiddenException('No tienes permiso para modificar este usuario');
    }

    // ... actualizar
  }
}

## Pre requisitos para correr el proyecto

- Node.js (versión 18 o superior)
- pnpm o elegir el gestor de preferencia npm o yarn
- Docker (para correr el contenedor de PostgreSQL)
- Git (para manejar las versiones del proyecto y su repositorio remoto)

## Instalación

1. Clonar el repositorio remoto en tu máquina local o en tu entorno de desarrollo.
2. Instalar pnpm o el gestor de preferencia npm o yarn:
```shell
npm install -g pnpm

```

1. Instalar las dependencias del proyecto:

```shell
pnpm install
```

1. Configurar las variables de entorno del archivo `.env`, usando la guía del archivo `.env.example`.

2. Correr el proyecto en modo desarrollo y el contenedor de PostgreSQL con Docker:

```shell
docker compose up -d
pnpm run start:dev
```

## Prisma ORM (Acceso a Datos)

Este proyecto utiliza el cliente de Prisma para interactuar con PostgreSQL. El esquema de la base de datos se define en `prisma/schema.prisma`.

### Operaciones principales con Prisma Client

| Método                    | Acción SQL Equivalente           | Descripción                                      |
| :------------------------ | :------------------------------- | :----------------------------------------------- |
| `prisma.user.findMany()`  | `SELECT * FROM User`             | Retorna todos los usuarios.                      |
| `prisma.user.findUnique()`| `SELECT * FROM User WHERE id=...`| Busca un registro por su ID único.               |
| `prisma.user.create()`    | `INSERT INTO User`               | Crea un nuevo registro.                          |
| `prisma.user.update()`    | `UPDATE User SET ...`            | Actualiza un registro existente.                 |
| `prisma.user.delete()`    | `DELETE FROM User`               | Elimina un registro físicamente.                 |

---

## Características y beneficios

- **Abstracción de la fuente de datos:** Prisma abstrae el acceso a datos, proporcionando una API fluida y tipada.
- **Tipado Fuerte:** Generación automática de tipos basada en tu esquema de base de datos.
- **Migraciones sencillas:** Gestión de versiones de base de datos automatizada con `prisma migrate`.
- **Swagger Integrado:** Documentación interactiva accesible en `/api`.

## Entidades (Prisma Schema)

`prisma\schema.prisma`

```prisma
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  age       Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Métodos de la API

### Módulo de Usuarios (`/api/users`)

#### Crear un usuario

- **POST** `/api/users`
- **Body (JSON):**

```json
{
  "name": "Sergio",
  "email": "sergio@example.com",
  "password": "password123",
  "age": 25
}
```

#### Obtener todos los usuarios

- **GET** `/api/users`

#### Obtener usuario por ID

- **GET** `/api/users/:id`

### Módulo de Tareas (`/api/tasks`)

#### Crear una tarea

- **POST** `/api/tasks`
- **Body (JSON):**

```json
{
  "title": "Mi primera tarea",
  "description": "Descripción de la tarea",
  "status": false
}
```

#### Obtener todas las tareas

- **GET** `/api/tasks`

### Documentación Completa

Puedes acceder a la UI de Swagger en: `http://localhost:3000/api`
