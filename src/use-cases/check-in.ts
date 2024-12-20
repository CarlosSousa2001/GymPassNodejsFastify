import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./erros/invalid-credentials-error";
import { compare } from "bcryptjs";
import { CheckIn, User } from "@prisma/client";
import { ResourceNotFoundError } from "./erros/resource-not-found-error";
import { CheckInRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordenates";
import { MaxNumberOffCheckInError } from "./erros/max-number-off-check-ins-error";
import { MaxDistanceError } from "./erros/max-distance-error";

interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
    userLatitude: number;
    userLongitude: number;
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase {
    
    constructor(
        private checkInRepository: CheckInRepository,
        private gymsRepository: GymsRepository
    ) {}

    async execute({ userId, gymId, userLatitude, userLongitude }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

        const gym = await this.gymsRepository.findById(gymId)

        if(!gym){
            throw new ResourceNotFoundError()
        }

        const distance = getDistanceBetweenCoordinates(
            {latitude: userLatitude, longitude: userLongitude},
            {latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()},
        )

        const MAX_DISTANCE_IN_KILOMETERS = 0.1

        if(distance > MAX_DISTANCE_IN_KILOMETERS) {
            throw new MaxDistanceError()
        }
        
        const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
            userId,
            new Date()
        )

        if(checkInOnSameDay){
            throw new MaxNumberOffCheckInError()
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