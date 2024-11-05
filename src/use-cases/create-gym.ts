import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./erros/user-already-exists.-error";
import { Gym, User } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface CreateGymUseCaseRequest {
    title: string;
    description: string | null;
    phone: string | null;
    latitude: number;
    longitude: number;
}

interface CreateGymUseCaseResponse {
    gym: Gym
}

// SOLID
// D - Dependency inversion principle

export class CreateGymUseCase {

    private gymsRepository: GymsRepository

    constructor(gymsRepository: GymsRepository) {
        this.gymsRepository = gymsRepository
    }

    async execute({ title, description, phone, latitude, longitude}: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {


        const gym = await this.gymsRepository.create({
           title,
           description,
           phone,
           latitude,
           longitude
        })

        return {
            gym
        }
    }
}
