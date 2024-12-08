import { z } from "zod"
import { FastifyReply, FastifyRequest } from "fastify";
import { MakeFetchUserCheckinHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";

export async function history(request: FastifyRequest, reply: FastifyReply) {

    const checkInHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
    })

    const { page } = checkInHistoryQuerySchema.parse(request.query)



    const fetchUserCheckInHistoryUseCase = MakeFetchUserCheckinHistoryUseCase() // factories pattern - funções que criam entidades com dependias coplexas ou maiores - sem regra de negocio, apenas instancias

    const { checkIns } = await fetchUserCheckInHistoryUseCase.execute({ 
        userId: request.user.sub,
        page
     })


    return reply.status(200).send({
        checkIns
    })
}