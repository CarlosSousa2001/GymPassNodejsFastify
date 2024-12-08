import { z } from "zod"
import { FastifyReply, FastifyRequest } from "fastify";
import { MakeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";

export async function search(request: FastifyRequest, reply: FastifyReply) {

    const searchgymsQuerySchema = z.object({
        q: z.string(),
        page: z.coerce.number().min(1).default(1),
    })

    const { q, page } = searchgymsQuerySchema.parse(request.body)



    const makeSearchUseCase = MakeSearchGymsUseCase() // factories pattern - funções que criam entidades com dependias coplexas ou maiores - sem regra de negocio, apenas instancias

    const { gyms } = await makeSearchUseCase.execute({ query: q, page })


    return reply.status(200).send({
        gyms
    })
}