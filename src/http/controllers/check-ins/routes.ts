import { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { create } from "./create";
import { validate } from "./validate";
import { history } from "./history";
import { metric } from "./metrict";


export async function checkInsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt)

    app.get('/check-ins/history', history)
    app.get('/check-ins/metrics', metric)

    app.post('/gyms/:gymId/check-ins',  create)
    app.patch('/check-ins/:checkInId/validate', validate )
}