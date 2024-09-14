import { Elysia, t } from 'elysia'

export const MilkProductionModel = new Elysia({
  name: 'Model.MilkProduction'
}).model({
  'milkProduction.create': t.Object({
    cowId: t.String(),
    milkType: t.String(),
    quantity: t.Number()
  }),
  'milkProduction.report': t.Object({
    regular: t.Number(),
    sour: t.Number(),
    chocolate: t.Number(),
    soy: t.Number(),
    almond: t.Number()
  })
})

export type CreateMilkProductionInput = {
  cowId: string
  milkType: string
  quantity: number
}

export type MilkProductionReport = {
  regular: number
  sour: number
  chocolate: number
  soy: number
  almond: number
}
