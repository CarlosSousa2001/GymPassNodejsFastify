import { FetchUserCheckInHistoryUseCase } from "../fetch-user-check-ins-history"
import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { ValidateCheckInUseCase } from "../validate-check-in"

export function MakeValidateCheckInUseCase() {
    const checkInsRepository = new PrismaCheckInRepository()

    const useCase = new ValidateCheckInUseCase(checkInsRepository)

    return useCase
} 