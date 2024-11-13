import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./erros/user-already-exists.-error";
import { Gym, User } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface FetchNearByGymsUseCaseRequest {
    userLatitude: number;
    userLongitude: number;
}

interface FetchNearByGymsUseCaseResponse {
    gyms: Gym[]
}

// SOLID
// D - Dependency inversion principle

export class FetchNearByGymsUseCase {

    private gymsRepository: GymsRepository

    constructor(gymsRepository: GymsRepository) {
        this.gymsRepository = gymsRepository
    }

    async execute({ userLatitude, userLongitude}: FetchNearByGymsUseCaseRequest): Promise<FetchNearByGymsUseCaseResponse> {


        const gyms = await this.gymsRepository.findManyNearby({latitude: userLatitude, longitude: userLongitude})

        return {
            gyms
        }
    }
}
