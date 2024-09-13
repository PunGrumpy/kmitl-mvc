import { t } from 'elysia'

export const CreateUserSchema = t.Object({
  email: t.String({ format: 'email' }),
  name: t.String()
})

export const UpdateUserSchema = t.Object({
  email: t.Optional(t.String({ format: 'email' })),
  name: t.Optional(t.String())
})

export type CreateUserInput = {
  email: string
  name: string
}

export type UpdateUserInput = {
  email?: string
  name?: string
}
