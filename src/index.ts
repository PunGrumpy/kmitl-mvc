import cors from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { Elysia } from 'elysia'
import logixlysia from 'logixlysia'

import { userRoutes } from '@/src/routes/userRoutes'

const app = new Elysia()

app.use(
  logixlysia({
    config: {
      showBanner: true,
      ip: true
    }
  })
)
app.use(
  swagger({
    path: '/',
    documentation: {
      info: {
        title: 'Elysia documentation',
        version: '0.1.0'
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
app.use(cors())
app.use(userRoutes)
app.listen(3000)
