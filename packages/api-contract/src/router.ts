import { t } from './trpc.js'
import { clinicRouter } from './routers/clinic.js'
import { treatmentRouter } from './routers/treatment.js'
import { treatmentsByClinicRouter } from './routers/treatments-by-clinic.js'

export const appRouter = t.router({
  clinic: clinicRouter,
  treatment: treatmentRouter,
  treatmentsByClinic: treatmentsByClinicRouter,
})

export type AppRouter = typeof appRouter
