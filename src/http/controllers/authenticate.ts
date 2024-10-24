import { z } from "zod"
import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/use-cases/erros/user-already-exists.-error";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredentialsError } from "@/use-cases/erros/invalid-credentials-error";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {

    const authenticateBodySchema = z.object({
        email: z.string(),
        password: z.string().min(6)
    })

    const { email, password } = authenticateBodySchema.parse(request.body)


    try {
        const prismaUsersRepository = new PrismaUsersRepository()

        const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

        await authenticateUseCase.execute({email, password })

    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({
                message: err.message
            })
        }

        throw err
    }

    return reply.status(200).send()
}