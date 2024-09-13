import { Elysia, t } from 'elysia'

import { UserService } from '@/src/services/userService'
import { CreateUserSchema, UpdateUserSchema } from '@/src/types/user'

const userService = new UserService()

export const userRoutes = new Elysia({ prefix: '/users' })
  .get('/', () => userService.getAllUsers())
  .post('/', ({ body }) => userService.createUser(body), {
    body: CreateUserSchema
  })
  .get('/:id', ({ params: { id } }) => userService.getUserById(Number(id)), {
    params: t.Object({
      id: t.Numeric()
    })
  })
  .put(
    '/:id',
    ({ params: { id }, body }) => userService.updateUser(Number(id), body),
    {
      params: t.Object({
        id: t.Numeric()
      }),
      body: UpdateUserSchema
    }
  )
  .delete('/:id', ({ params: { id } }) => userService.deleteUser(Number(id)), {
    params: t.Object({
      id: t.Numeric()
    })
  })
