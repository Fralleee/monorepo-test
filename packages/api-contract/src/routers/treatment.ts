import Decimal from "decimal.js";
import { z } from "zod";
import { adminProcedure, authedProcedure, t } from "../trpc";

export const treatmentRouter = t.router({
	list: authedProcedure.query(async ({ ctx }) => {
		return ctx.db.treatment.findMany({
			orderBy: { name: "asc" },
		});
	}),

	byId: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
		return ctx.db.treatment.findUnique({
			where: { id: input.id },
		});
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
					name: input.name,
					description: input.description,
					price: new Decimal(input.price),
					maintenanceIntervalMonths: input.maintenanceIntervalMonths,
				},
			});
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
			const { id, price, ...rest } = input;
			return ctx.db.treatment.update({
				where: { id },
				data: {
					...rest,
					...(price !== undefined && { price: new Decimal(price) }),
				},
			});
		}),

	delete: adminProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
		return ctx.db.treatment.delete({
			where: { id: input.id },
		});
	}),
});
