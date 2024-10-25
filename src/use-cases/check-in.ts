import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./erros/invalid-credentials-error";
import { compare } from "bcryptjs";
import { CheckIn, User } from "@prisma/client";
import { ResourceNotFoundError } from "./erros/resource-not-found-error";
import { CheckInRepository } from "@/repositories/check-ins-repository";

interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInProfileUseCase {
    
    constructor(private checkInRepository: CheckInRepository) {}

    async execute({ userId, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

        const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
            userId,
            new Date()
        )

        if(checkInOnSameDay){
            throw new Error()
        }

        const checkIn = await this.checkInRepository.create({
            user_id: userId,
            gym_id: gymId
        })

        return {
            checkIn
        }
    }
}