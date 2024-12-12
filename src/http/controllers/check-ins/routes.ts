import { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { create } from "./create";
import { validate } from "./validate";
import { history } from "./history";
import { metric } from "./metrict";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";


export async function checkInsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt)

    app.get('/check-ins/history', history)
    app.get('/check-ins/metrics', metric)

    app.post('/gyms/:gymId/check-ins',  create)
    app.patch('/check-ins/:checkInId/validate', {onRequest: [verifyUserRole('ADMIN')]}, validate )
}