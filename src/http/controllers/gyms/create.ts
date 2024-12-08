import { z } from "zod"
import { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExistsError } from "@/use-cases/erros/user-already-exists.-error";
import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {

    const createGymBodySchema = z.object({
        title: z.string(),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.number().refine(value => {
            return value >= -90 && value <= 90
        }),
        longitude: z.number().refine(value =>{
            return value >= -180 && value <= 180
        }),
    })

    const { title, description, phone, latitude, longitude } = createGymBodySchema.parse(request.body)


    try {

        const createGymUseCase = makeCreateGymUseCase() // factories pattern - funções que criam entidades com dependias coplexas ou maiores - sem regra de negocio, apenas instancias

        await createGymUseCase.execute({title, description, phone, latitude, longitude })

    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({
                message: err.message
            })
        }

        throw err
    }

    return reply.status(201).send()
}