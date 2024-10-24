import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { hash } from "bcryptjs"

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}
// SOLID
// D - Dependency inversion principle

export class RegisterUseCase {

    private usersRepository:any

    constructor(usersRepository:any){
        this.usersRepository = usersRepository
    }

    async execute({ name, email, password }: RegisterUseCaseRequest) {

        const password_hash = await hash(password, 4)

        const userWithSameEmail = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (userWithSameEmail) {
            throw new Error("E-mail already exists.")
        }

        await this.usersRepository.create({
            name,
            email,
            password_hash
        })

    }
}
