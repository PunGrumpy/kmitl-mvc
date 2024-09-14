# 🦊 KMITL Exit Exam (MVC)

| Preview 1                         | Preview 2                         | Preview 3                         |
| --------------------------------- | --------------------------------- | --------------------------------- |
| ![Preview](/public/preview-1.png) | ![Preview](/public/preview-2.png) | ![Preview](/public/preview-3.png) |

## 📄 Description

This project is a robust RESTful API built with Elysia.js, following the enterprise MVC (Model-View-Controller) architecture. It leverages Prisma ORM for efficient database management and uses TypeScript to enhance type safety and developer experience.

1. Create and manage cow data (code, color, age) through CowModel and CowService
2. Simulate milking and calculate BSOD chances in CowController
3. Generate milk production reports via MilkProductionService
4. Display results through GUI using HTML generated from CowView
5. Manage BSOD status and lemon feeding in CowController

## 🧱 MVC Architecture

This project follows a modified Model-View-Controller (MVC) architecture pattern, adapted for a RESTful API using Elysia.js. Here's an overview of each component and its corresponding folder in the project structure:

### 📁 Models (`src/models/`)

- `CowModel.ts` and `MilkProductionModel.ts`
- Define data structures, validation, and business logic
- Handle data management, storage, and retrieval
- Use Elysia.model for schema validation

### 🖥️ Views (`Swagger UI`)

- In a RESTful API, the "View" is the data sent back to the client
- Managed by Elysia.js through route handlers and data serialization
- CowView.ts creates HTML templates for displaying cow data and milk production results
- Swagger UI is used for API documentation

### 🛣️ Routes and Controllers (`src/controllers/`)

- `CowController.ts`
- Defines API endpoints and manages the request/response cycle
- Uses models for request validation and response formatting
- Calls appropriate service methods to process requests

### 🛠️ Services (`src/services/`)

- `CowService.ts` and `MilkProductionService.ts`
- Contain business logic that doesn't belong in models or routes
- Handle complex operations, often involving database interactions
- Use Prisma client for database operations

## 👯 How They Work Together

1. **Controller** receives HTTP requests, calls **Service** to process data
2. **Service** uses **Model** for data validation and database operations
3. **Controller** uses **View** (in this case, sending data back) to send response
4. `index.ts` is the application entry point, configured with Elysia.js, and invokes `CowController`

## 📦 Technologies

- 🦊 [Elysia.js](https://elysiajs.com/): A lightweight, flexible web framework for Node.js
- 🛠️ [Prisma](https://www.prisma.io/): Modern database toolkit for TypeScript and Node.js
- 🍞 [Bun](https://bun.sh/): JavaScript runtime for building web applications
- 🦄 [TypeScript](https://www.typescriptlang.org/): Typed superset of JavaScript
- 🦭 [MariaDB](https://mariadb.org/): Open-source relational database management system
- 📦 [Swagger UI](https://swagger.io/tools/swagger-ui/): Open-source tool for API documentation

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
│   ├── models/
│   │   └── userModel.ts
│   ├── controllers/
│   │   └── userControllers.ts
│   └── services/
│       └── userService.ts
├── prisma/
│   └── schema.prisma
├── index.ts
├── .env
├── package.json
└── README.md
```

## 🔑 API Endpoints

- `GET /api/cows`: Retrieve all cows or find a cow by code
- `POST /api/cows`: Create a new cow
- `POST /api/cows/reset-bsod`: Reset BSOD status for all cows
- `POST /api/cows/:code/add-lemon`: Add lemon to a cow
- `POST /api/milk/:code`: Milk a cow
- `GET /api/milk/report`: Get milk production report

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
