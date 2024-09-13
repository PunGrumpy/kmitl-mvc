import { Elysia, t } from 'elysia'

import { UserModel } from '@/src/models/userModel'
import { UserService } from '@/src/services/userService'

export const userRoutes = new Elysia({
  prefix: '/users',
  detail: {
    tags: ['User'],
    description: 'User CRUD operations'
  }
})
  .use(UserService)
  .use(UserModel)
  .get('/', ({ User }) => User.findMany())
  .post('/', ({ User, body }) => User.create(body), {
    body: 'user.create'
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
      body: 'user.update'
    }
  )
  .delete('/:id', ({ User, params: { id } }) => User.delete(Number(id)), {
    params: t.Object({
      id: t.Numeric()
    })
  })
