import { Elysia, t } from 'elysia'

import { UserService } from '@/src/services/userService'
import { CreateUserSchema, UpdateUserSchema } from '@/src/types/user'

export const userRoutes = new Elysia({ prefix: '/users' })
  .use(UserService)
  .get('/', ({ User }) => User.findMany())
  .post('/', ({ User, body }) => User.create(body), {
    body: CreateUserSchema
  })
  .get('/:id', ({ User, params: { id } }) => User.findUnique(Number(id)), {
    params: t.Object({
      id: t.Numeric()
    })
  })
  .put(
    '/:id',
    ({ User, params: { id }, body }) => User.update(Number(id), body),
    {
      params: t.Object({
        id: t.Numeric()
      }),
      body: UpdateUserSchema
    }
  )
  .delete('/:id', ({ User, params: { id } }) => User.delete(Number(id)), {
    params: t.Object({
      id: t.Numeric()
    })
  })
