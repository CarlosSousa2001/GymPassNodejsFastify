import { z } from "zod"
import { FastifyReply, FastifyRequest } from "fastify";
import { MakeCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case";
import { MakeValidateCheckInUseCase } from "@/use-cases/factories/make-validate-check-in-use-case";

export async function validate(request: FastifyRequest, reply: FastifyReply) {

    const validateCheckInParamsSchema = z.object({
        checkInId: z.string().uuid()
    })

    const { checkInId } = validateCheckInParamsSchema.parse(request.params)

    const validateCheckInUseCase = MakeValidateCheckInUseCase() // factories pattern - funções que criam entidades com dependias coplexas ou maiores - sem regra de negocio, apenas instancias

    await validateCheckInUseCase.execute({
        checkInId
    })

    return reply.status(204).send()
}