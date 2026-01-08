import { clinicRouter } from "./routers/clinic";
import { patientRouter } from "./routers/patient";
import { treatmentRouter } from "./routers/treatment";
import { treatmentsByClinicRouter } from "./routers/treatments-by-clinic";
import { t } from "./trpc";

export const appRouter = t.router({
    clinic: clinicRouter,
    patient: patientRouter,
    treatment: treatmentRouter,
    treatmentsByClinic: treatmentsByClinicRouter,
});

export type AppRouter = typeof appRouter;
