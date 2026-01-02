import { z } from 'zod'
import { t, authedProcedure, adminProcedure } from '../trpc.js'

export const clinicRouter = t.router({
  list: authedProcedure.query(async ({ ctx }) => {
    return ctx.db.clinic.findMany({
      orderBy: { name: 'asc' },
    })
  }),

  byId: authedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.clinic.findUnique({
        where: { id: input.id },
      })
    }),

  byCode: authedProcedure
    .input(z.object({ code: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.clinic.findUnique({
        where: { code: input.code },
      })
    }),

  create: adminProcedure
    .input(
      z.object({
        name: z.string().min(1),
        code: z.string().min(1).max(20),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.clinic.create({
        data: input,
      })
    }),

  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        code: z.string().min(1).max(20).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input
      return ctx.db.clinic.update({
        where: { id },
        data,
      })
    }),

  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.clinic.delete({
        where: { id: input.id },
      })
    }),
})
