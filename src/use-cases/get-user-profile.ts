import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./erros/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./erros/resource-not-found-error";

interface GetUserUseCaseRequest {
    userId: string
}

interface GetUserUseCaseResponse {
    user: User
}


export class GetUserProfileUseCase {
    constructor(private usersRepository: UsersRepository) {

    }

    async execute({ userId }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {

        const user = await this.usersRepository.findById(userId)

        if (!user) {
            throw new ResourceNotFoundError()
        }

        return {
            user
        }
    }
}