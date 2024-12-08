import { z } from "zod"
import { FastifyReply, FastifyRequest } from "fastify";
import { MakeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";
import { makeFertchNearByGymsUseCase } from "@/use-cases/factories/make-fetch-nearby-gyms-use-case";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {

    const nearbyGymsQuerySchema = z.object({
        latitude: z.number().refine(value => {
            return value >= -90 && value <= 90
        }),
        longitude: z.number().refine(value =>{
            return value >= -180 && value <= 180
        }),
    })

    const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.body)



    const FertchNearByGymsUseCase = makeFertchNearByGymsUseCase() // factories pattern - funções que criam entidades com dependias coplexas ou maiores - sem regra de negocio, apenas instancias

    const { gyms } = await FertchNearByGymsUseCase.execute({ userLatitude: latitude, userLongitude: longitude })


    return reply.status(200).send({
        gyms
    })
}