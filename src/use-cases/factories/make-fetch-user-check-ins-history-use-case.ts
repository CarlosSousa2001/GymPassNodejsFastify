import { FetchUserCheckInHistoryUseCase } from "../fetch-user-check-ins-history"
import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-ins-repository"

export function MakeFetchUserCheckinHistoryUseCase() {
    const checkInsRepository = new PrismaCheckInRepository()

    const useCase = new FetchUserCheckInHistoryUseCase(checkInsRepository)

    return useCase
} 