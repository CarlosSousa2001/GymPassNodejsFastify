import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./erros/user-already-exists.-error";

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}
// SOLID
// D - Dependency inversion principle

export class RegisterUseCase {

    private usersRepository:UsersRepository

    constructor(usersRepository:UsersRepository){
        this.usersRepository = usersRepository
    }

    async execute({ name, email, password }: RegisterUseCaseRequest) {

        const password_hash = await hash(password, 4)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        await this.usersRepository.create({
            name,
            email,
            password_hash
        })

    }
}
