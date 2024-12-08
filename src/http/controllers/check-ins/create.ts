import { z } from "zod"
import { FastifyReply, FastifyRequest } from "fastify";
import { MakeCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {

    const createCheckInsParamsSchema = z.object({
        gymId: z.string().uuid()
    })

    const createCheckInBodySchema = z.object({
        latitude: z.number().refine(value => {
            return value >= -90 && value <= 90
        }),
        longitude: z.number().refine(value => {
            return value >= -180 && value <= 180
        }),
    })

    const { gymId } = createCheckInsParamsSchema.parse(request.params)
    const { latitude, longitude } = createCheckInBodySchema.parse(request.body)



    const checkInUseCase = MakeCheckInUseCase() // factories pattern - funções que criam entidades com dependias coplexas ou maiores - sem regra de negocio, apenas instancias

    await checkInUseCase.execute({
        userId: request.user.sub,
        gymId,
        userLatitude: latitude,
        userLongitude: longitude,
    })



    return reply.status(201).send()
}