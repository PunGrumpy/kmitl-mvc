# 🦊 KMITL Exit Exam (MVC)

## 📄 Description

This project is a robust RESTful API built with Elysia.js, following the enterprise MVC (Model-View-Controller) architecture. It leverages Prisma ORM for efficient database management and uses TypeScript to enhance type safety and developer experience.

## 🧱 MVC Architecture

This project follows a modified Model-View-Controller (MVC) architecture pattern, adapted for a RESTful API using Elysia.js. Here's an overview of each component and its corresponding folder in the project structure:

### 📁 Models (`src/models/`)

- Represent the data structures and business logic of the application.
- Handle data validation, storage, and retrieval.
- Example: `User` model in `src/models/user.ts`

### 🖥️ Views (`Swagger UI`)

- In a RESTful API, the "View" is typically the data sent back to the client.
- Handled by Elysia.js through route handlers and serialization.

### 🛣️ Routes and Controllers (`src/routes/`)

- Define the API endpoints and handle the request/response cycle.
- Combine routing and controller logic in one place.
- Handle user input (API requests), process it, and return appropriate responses.
- Call appropriate service methods.
- Example: `userRoutes.ts` defines routes for user-related operations and includes the logic to handle these operations.

### 🛠️ Services (`src/services/`)

- Contain business logic that doesn't belong in models or routes.
- Handle complex operations, often involving multiple models.
- Example: `UserService` might handle operations like user authentication or complex data manipulations.

### 📝 Types (`src/types/`)

- Define TypeScript interfaces and types used throughout the application.
- Ensure type safety and improve developer experience.
- Example: `CreateUserInput` and `UpdateUserInput` types.

This architecture promotes separation of concerns while keeping related functionality (routing and request handling) together, making the codebase organized, maintainable, and scalable. It's a common approach in modern API development, especially with lightweight frameworks like Elysia.js.

## 🚀 Getting Started

### 📋 Prerequisites

- [Bun](https://bun.sh/) (v1.0.0 or later)
- [MySQL](https://www.mysql.com/) (v5.7 or later) or [MariaDB](https://mariadb.org/) (v10.2 or later)

### 🛠️ Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/PunGrumpy/kmitl-mvc.git
   cd kmitl-mvc
   ```

2. Install the dependencies:

   ```bash
   bun install
   ```

3. Configure the environment variables:

   - Create a `.env` file in the root of the project.
   - Add the following environment variables:
     ```env
     DATABASE_URL="mysql://username:password@localhost:3306/your_database_name"
     ```

4. Create Prisma client:

   ```bash
   bun db:generate
   ```

5. Run the migrations:
   ```bash
   bun db:migrate
   ```

### 🏃‍♂️ Running the Project

1. Start the development server:

   ```bash
   bun dev
   ```

2. Access the API:
   - Open your browser and go to `http://localhost:3000` for the Swagger documentation.
   - The API endpoints will be available at `http://localhost:3000/users`.

## 🏗️ Project Structure

```
.
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── types/
├── prisma/
│   └── schema.prisma
├── index.ts
├── testConnection.ts
└── README.md
```

## 🔑 API Endpoints

- `GET /users`: Retrieve all users
- `POST /users`: Create a new user
- `GET /users/:id`: Retrieve a specific user
- `PUT /users/:id`: Update a specific user
- `DELETE /users/:id`: Delete a specific user

For detailed API documentation, visit the Swagger UI at `http://localhost:3000` when the server is running.

> [!WARNING]
> This API endpoint may change in the future. Please refer to the Swagger documentation for the latest information.

> [!NOTE]
> In MVC architecture, API endpoints are considered as the "View" layer.

## 🧪 Testing

To test the database connection:

```bash
bun test:connection
```

## 🛠️ Development

This project uses Bun as the JavaScript runtime. Here are some useful commands:

- `bun dev`: Start the development server
- `bun db:generate`: Generate Prisma client
- `bun db:migrate`: Run database migrations
- `bun test:connection`: Test database connection

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## 📚 References

- [Elysia Documentation](https://elysiajs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Bun Documentation](https://bun.sh/docs)

## 🙋‍♂️ Support

If you have any questions or need help, please open an issue in the GitHub repository or contact the maintainer.
