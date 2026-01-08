import { z } from "zod";
import { adminProcedure, authedProcedure, t } from "../trpc";

export const patientRouter = t.router({
    list: authedProcedure
        .input(z.object({ clinicId: z.string().optional() }).optional())
        .query(async ({ ctx, input }) => {
            return ctx.db.patient.findMany({
                where: input?.clinicId ? { clinicId: input.clinicId } : undefined,
                include: { clinic: true },
                orderBy: { name: "asc" },
            });
        }),

    byId: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
        return ctx.db.patient.findUnique({
            where: { id: input.id },
            include: { clinic: true },
        });
    }),

    create: adminProcedure
        .input(
            z.object({
                name: z.string().min(1),
                phone: z.string().min(1),
                email: z.string().email(),
                clinicId: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            return ctx.db.patient.create({
                data: input,
                include: { clinic: true },
            });
        }),

    update: adminProcedure
        .input(
            z.object({
                id: z.string(),
                name: z.string().min(1).optional(),
                phone: z.string().min(1).optional(),
                email: z.string().email().optional(),
                clinicId: z.string().optional(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { id, ...data } = input;
            return ctx.db.patient.update({
                where: { id },
                data,
                include: { clinic: true },
            });
        }),

    delete: adminProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
        return ctx.db.patient.delete({
            where: { id: input.id },
        });
    }),
});
