import { FastifyReply, FastifyRequest } from "fastify";
import { MakeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-use-metrics-use-case";

export async function metric(request: FastifyRequest, reply: FastifyReply) {


    const getUserMetricUseCase = MakeGetUserMetricsUseCase() // factories pattern - funções que criam entidades com dependias coplexas ou maiores - sem regra de negocio, apenas instancias

    const { checkInsCount } = await getUserMetricUseCase.execute({
        userId: request.user.sub,
    })


    return reply.status(200).send({
        checkInsCount
    })
}