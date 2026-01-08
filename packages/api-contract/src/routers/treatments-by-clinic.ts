import Decimal from "decimal.js";
import { z } from "zod";
import { adminProcedure, authedProcedure, t } from "../trpc";

export const treatmentsByClinicRouter = t.router({
	list: authedProcedure
		.input(
			z
				.object({
					clinicId: z.string().optional(),
					treatmentId: z.string().optional(),
				})
				.optional(),
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
				orderBy: [{ clinic: { name: "asc" } }, { treatment: { name: "asc" } }],
			});
		}),

	byId: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
		return ctx.db.treatmentsByClinic.findUnique({
			where: { id: input.id },
			include: {
				clinic: true,
				treatment: true,
			},
		});
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
				data: {
					clinicId: input.clinicId,
					treatmentId: input.treatmentId,
					priceOverride: input.priceOverride !== undefined ? new Decimal(input.priceOverride) : undefined,
					notes: input.notes,
				},
				include: {
					clinic: true,
					treatment: true,
				},
			});
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
			const { id, priceOverride, ...rest } = input;
			return ctx.db.treatmentsByClinic.update({
				where: { id },
				data: {
					...rest,
					...(priceOverride !== undefined && {
						priceOverride: priceOverride === null ? null : new Decimal(priceOverride),
					}),
				},
				include: {
					clinic: true,
					treatment: true,
				},
			});
		}),

	delete: adminProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
		return ctx.db.treatmentsByClinic.delete({
			where: { id: input.id },
		});
	}),
});
