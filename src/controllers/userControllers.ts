import { Elysia, t } from 'elysia'

import { UserModel } from '@/src/models/userModel'
import { UserService } from '@/src/services/userService'

export const UserController = new Elysia({ prefix: '/users' })
  .use(UserService)
  .use(UserModel)
  .get('/', ({ User }) => User.findMany(), {
    detail: {
      summary: 'Get all users',
      tags: ['User']
    }
  })
  .post('/', ({ User, body }) => User.create(body), {
    body: 'user.create',
    detail: {
      summary: 'Create a new user',
      tags: ['User']
    }
  })
  .get('/:id', ({ User, params: { id } }) => User.findUnique(Number(id)), {
    params: t.Object({
      id: t.Numeric()
    }),
    detail: {
      summary: 'Get a user by ID',
      tags: ['User']
    }
  })
  .put(
    '/:id',
    ({ User, params: { id }, body }) => User.update(Number(id), body),
    {
      params: t.Object({
        id: t.Numeric()
      }),
      body: 'user.update',
      detail: {
        summary: 'Update a user',
        tags: ['User']
      }
    }
  )
  .delete('/:id', ({ User, params: { id } }) => User.delete(Number(id)), {
    params: t.Object({
      id: t.Numeric()
    }),
    detail: {
      summary: 'Delete a user',
      tags: ['User']
    }
  })
