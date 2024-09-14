import { Elysia, t } from 'elysia'

import { CowModel } from '@/src/models/CowModel'
import { MilkProductionModel } from '@/src/models/MilkProductionModel'
import { CowService } from '@/src/services/CowService'
import { MilkProductionService } from '@/src/services/MilkProductionService'
import { CowView } from '@/src/views/CowView'

// Create the Controller for routing and request handling for Cows and Milk Production
// Separated into groups for cows and milk
export const CowController = new Elysia({ prefix: '/api' })
  .use(CowModel)
  .use(MilkProductionModel)
  .use(CowService)
  .use(MilkProductionService)
  // Group for cows
  .group('/cows', app =>
    app
      // Get all cows or find a cow by code
      .get(
        '/',
        async ({ Cow, query }) => {
          if (query.code) {
            if (!/^[1-9]\d{7}$/.test(query.code)) {
              return CowView.renderError(
                'Invalid cow code. Must be 8 digits and not start with 0.'
              )
            }
            const cow = await Cow.findByCode(query.code)
            if (!cow) {
              return CowView.renderError('Cow not found')
            }
            return CowView.renderCowInfo(cow)
          }
          return CowView.renderAllCows(await Cow.findMany())
        },
        {
          query: t.Object({
            code: t.Optional(t.String())
          }),
          detail: {
            summary: 'Get all cows or find a cow by code',
            tags: ['Cow']
          }
        }
      )
      // Create a new cow
      .post(
        '/',
        async ({ Cow, body }) => {
          const newCow = await Cow.create(body)
          return CowView.renderCowInfo(newCow)
        },
        {
          body: 'cow.create',
          detail: {
            summary: 'Create a new cow',
            tags: ['Cow']
          }
        }
      )
      // Update a cow by code
      .post(
        '/reset-bsod',
        async ({ Cow }) => {
          const resetCount = await Cow.resetAllBSOD()
          return CowView.renderMessage(
            `Reset ${resetCount} cows from BSOD state`
          )
        },
        {
          detail: {
            summary: 'Reset BSOD state for all cows',
            tags: ['Cow']
          }
        }
      )
      // Add lemon to a cow by code
      .post(
        '/:code/add-lemon',
        async ({ Cow, params }) => {
          const { code } = params
          if (!code || !/^[1-9][0-9]{7}$/.test(code)) {
            return CowView.renderError(
              'Invalid cow code. Must be 8 digits and not start with 0.'
            )
          }

          const cow = await Cow.findByCode(code)
          if (!cow) return CowView.renderError('Cow not found')
          if (cow.isBSOD) return CowView.renderError('Cow is in BSOD state')
          if (cow.color !== 'white')
            return CowView.renderError('Only white cows can eat lemons')
          if (cow.hasEatenLemon)
            return CowView.renderError('This cow has already eaten a lemon')

          const updatedCow = await Cow.update(code, { hasEatenLemon: true })
          return CowView.renderCowInfo(updatedCow)
        },
        {
          params: t.Object({
            code: t.String()
          }),
          detail: {
            summary: 'Add lemon to a cow',
            tags: ['Cow']
          }
        }
      )
  )
  // Group for milk
  .group('/milk', app =>
    app
      // Milk a cow by code
      .post(
        '/:code',
        async ({ Cow, MilkProduction, params: { code } }) => {
          const cow = await Cow.findByCode(code)
          if (!cow) return CowView.renderError('Cow not found')
          if (cow.isBSOD) return CowView.renderError('Cow is in BSOD state')

          let milkType = cow.color === 'white' ? 'regular' : 'chocolate'
          let isBSOD = false

          if (cow.color === 'white' && !cow.hasEatenLemon) {
            const bsodChance = 0.005 * cow.ageMonths
            if (Math.random() < bsodChance) {
              milkType = 'soy'
              isBSOD = true
            }
          } else if (cow.color === 'brown') {
            const bsodChance = 0.01 * cow.age
            if (Math.random() < bsodChance) {
              milkType = 'almond'
              isBSOD = true
            }
          }

          if (cow.hasEatenLemon && cow.color === 'white') {
            milkType = 'sour'
          }

          await MilkProduction.create({ cowId: cow.id, milkType, quantity: 1 })
          await Cow.update(cow.code, {
            milkCount: cow.milkCount + 1,
            isBSOD
          })

          const result = { success: true, milkType, isBSOD }
          return CowView.renderMilkResult(result)
        },
        {
          params: t.Object({
            code: t.String({ pattern: '^[1-9][0-9]{7}$' })
          }),
          detail: {
            summary: 'Milk a cow',
            tags: ['Milk']
          }
        }
      )
      // Get milk production report
      .get(
        '/report',
        async ({ MilkProduction, Cow }) => {
          const report = await MilkProduction.getReport()
          const cows = await Cow.findMany()
          const cowReport = cows.map(cow => ({
            code: cow.code,
            color: cow.color,
            milkCount: cow.milkCount,
            isBSOD: cow.isBSOD
          }))
          return CowView.renderMilkReport(report, cowReport)
        },
        {
          detail: {
            summary: 'Get milk production report',
            tags: ['Milk']
          }
        }
      )
  )
