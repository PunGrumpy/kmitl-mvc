import { Elysia, t } from 'elysia'

export const CowModel = new Elysia({ name: 'Model.Cow' }).model({
  'cow.create': t.Object({
    code: t.String({ pattern: '^[1-9][0-9]{7}$' }),
    color: t.Enum({ white: 'white', brown: 'brown' }),
    age: t.Number({ minimum: 0, maximum: 10 }),
    ageMonths: t.Number({ minimum: 0, maximum: 11 })
  }),
  'cow.update': t.Object({
    code: t.Optional(t.String({ pattern: '^[1-9][0-9]{7}$' })),
    color: t.Optional(t.Enum({ white: 'white', brown: 'brown' })),
    age: t.Optional(t.Number({ minimum: 0, maximum: 10 })),
    ageMonths: t.Optional(t.Number({ minimum: 0, maximum: 11 })),
    milkCount: t.Optional(t.Number()),
    isBSOD: t.Optional(t.Boolean())
  })
})

export type CreateCowInput = {
  code: string
  color: 'white' | 'brown'
  age: number
  ageMonths: number
}

export type UpdateCowInput = Partial<CreateCowInput> & {
  milkCount?: number
  isBSOD?: boolean
}