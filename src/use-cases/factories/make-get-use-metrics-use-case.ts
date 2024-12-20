import { GetUserMetricsUseCase } from "../get-user-metrics"
import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-ins-repository"

export function MakeGetUserMetricsUseCase() {
    const checkInsRepository = new PrismaCheckInRepository()

    const useCase = new GetUserMetricsUseCase(checkInsRepository)

    return useCase
} 