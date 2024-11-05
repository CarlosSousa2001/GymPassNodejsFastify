import { expect, test, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

// sut = principal variavel testada

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get Use Profile Use Case', () => {

    beforeEach(() => { // usando dessa forma eu nao repito o codigo da instanciação das classes e isolo o contexto para cada um antes de cada teste
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileUseCase(usersRepository)
    })


    it("should be able to authenticate", async () => {

        const createdUser = await usersRepository.create({
            name: "John Doe",
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 4)
        })

        const { user } = await sut.execute({
            userId:createdUser.id
        })

        expect(user.id).toEqual(expect.any(String))
        expect(user.name).toEqual("John Doe")

    })

    it("should not be able to get user profile with wrong id", async () => {

        await usersRepository.create({
            name: "John Doe",
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 4)
        })

        await expect(() => sut.execute({
            userId: "non-existing-id"
        })).rejects.toBeInstanceOf(ResourceNotFoundError)

    })


})

