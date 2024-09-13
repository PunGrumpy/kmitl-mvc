import cors from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { Elysia } from 'elysia'
import logixlysia from 'logixlysia'

import { UserController } from '@/src/controllers/userControllers'

const app = new Elysia()
  .use(
    logixlysia({
      config: {
        showBanner: true,
        ip: true
      }
    })
  )
  .use(
    swagger({
      path: '/',
      documentation: {
        info: {
          title: 'KMITL Exit Exam API',
          version: '1.0.0'
        },
        tags: [
          {
            name: 'User',
            description: 'User CRUD operations'
          }
        ]
      }
    })
  )
  .use(cors())
  .listen(3000)

// Register the Route
app.use(UserController)
