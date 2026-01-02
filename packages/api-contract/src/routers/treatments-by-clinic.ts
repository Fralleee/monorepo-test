import { z } from 'zod'
import { t, authedProcedure, adminProcedure } from '../trpc.js'

export const treatmentsByClinicRouter = t.router({
  list: authedProcedure
    .input(
      z.object({
        clinicId: z.string().optional(),
        treatmentId: z.string().optional(),
      }).optional(),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.treatmentsByClinic.findMany({
        where: {
          clinicId: input?.clinicId,
          treatmentId: input?.treatmentId,
        },
        include: {
          clinic: true,
          treatment: true,
        },
        orderBy: [{ clinic: { name: 'asc' } }, { treatment: { name: 'asc' } }],
      })
    }),

  byId: authedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.treatmentsByClinic.findUnique({
        where: { id: input.id },
        include: {
          clinic: true,
          treatment: true,
        },
      })
    }),

  create: adminProcedure
    .input(
      z.object({
        clinicId: z.string(),
        treatmentId: z.string(),
        priceOverride: z.number().positive().optional(),
        notes: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.treatmentsByClinic.create({
        data: input,
        include: {
          clinic: true,
          treatment: true,
        },
      })
    }),

  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        priceOverride: z.number().positive().optional().nullable(),
        notes: z.string().optional().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input
      return ctx.db.treatmentsByClinic.update({
        where: { id },
        data,
        include: {
          clinic: true,
          treatment: true,
        },
      })
    }),

  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.treatmentsByClinic.delete({
        where: { id: input.id },
      })
    }),
})
