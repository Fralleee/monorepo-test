import { z } from 'zod'
import { t, authedProcedure, adminProcedure } from '../trpc'

export const treatmentRouter = t.router({
  list: authedProcedure.query(async ({ ctx }) => {
    return ctx.db.treatment.findMany({
      orderBy: { name: 'asc' },
    })
  }),

  byId: authedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.treatment.findUnique({
        where: { id: input.id },
      })
    }),

  create: adminProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        price: z.number().positive(),
        maintenanceIntervalMonths: z.number().int().positive().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.treatment.create({
        data: {
          ...input,
          price: input.price,
        },
      })
    }),

  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        description: z.string().optional(),
        price: z.number().positive().optional(),
        maintenanceIntervalMonths: z.number().int().positive().optional().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input
      return ctx.db.treatment.update({
        where: { id },
        data,
      })
    }),

  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.treatment.delete({
        where: { id: input.id },
      })
    }),
})
