import { Elysia, t } from 'elysia'

export const UserModel = new Elysia({ name: 'Model.User' }).model({
  'user.create': t.Object({
    email: t.String({ format: 'email' }),
    name: t.String()
  }),
  'user.update': t.Object({
    email: t.Optional(t.String({ format: 'email' })),
    name: t.Optional(t.String())
  })
})

export type CreateUserInput = {
  email: string
  name: string
}

export type UpdateUserInput = {
  email?: string
  name?: string
}
