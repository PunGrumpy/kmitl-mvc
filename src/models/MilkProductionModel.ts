import { Elysia, t } from 'elysia'

// Create the Milk Production Model for validation and documentation
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

// Define the types for the Milk Production Model (Create)
export type CreateMilkProductionInput = {
  cowId: string
  milkType: string
  quantity: number
}

// Define the types for the Milk Production Model (Report)
export type MilkProductionReport = {
  regular: number
  sour: number
  chocolate: number
  soy: number
  almond: number
}
