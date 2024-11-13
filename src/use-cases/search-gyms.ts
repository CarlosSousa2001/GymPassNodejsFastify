import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./erros/user-already-exists.-error";
import { Gym, User } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface SearchGymsUseCaseRequest {
    query: string;
    page: number;
}

interface SearchGymsUseCaseResponse {
    gyms: Gym[]
}

// SOLID
// D - Dependency inversion principle

export class SearchGymsUseCase {

    private gymsRepository: GymsRepository

    constructor(gymsRepository: GymsRepository) {
        this.gymsRepository = gymsRepository
    }

    async execute({ query, page }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {


        const gyms = await this.gymsRepository.searchMany(query, page)

        return {
            gyms
        }
    }
}
