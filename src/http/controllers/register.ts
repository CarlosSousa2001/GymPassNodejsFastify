import { z } from "zod"
import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/use-cases/erros/user-already-exists.-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

export async function register(request: FastifyRequest, reply: FastifyReply) {

    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(6)
    })

    const { email, name, password } = registerBodySchema.parse(request.body)


    try {

        const registerUseCase = makeRegisterUseCase() // factories pattern - funções que criam entidades com dependias coplexas ou maiores - sem regra de negocio, apenas instancias

        await registerUseCase.execute({ name, email, password })

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