import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./erros/user-already-exists.-error";
import { User } from "@prisma/client";

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

interface RegisterUseCaseResponse {
    user: User
}

// SOLID
// D - Dependency inversion principle

export class RegisterUseCase {

    private usersRepository: UsersRepository

    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository
    }

    async execute({ name, email, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {

        const password_hash = await hash(password, 4)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        const user = await this.usersRepository.create({
            name,
            email,
            password_hash
        })

        return {
            user
        }
    }
}
