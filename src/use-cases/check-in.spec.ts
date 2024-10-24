import { expect, test, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './erros/resource-not-found-error'
import { CheckInProfileUseCase } from './checking'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkIns-repository'

// sut = principal variavel testada

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInProfileUseCase

describe('Check-in Use Case', () => {

    beforeEach(() => { // usando dessa forma eu nao repito o codigo da instanciação das classes e isolo o contexto para cada um antes de cada teste
        checkInRepository = new InMemoryCheckInsRepository()
        sut = new CheckInProfileUseCase(checkInRepository)
    })


    it("should be able to check in", async () => {

        const {checkIn} = await sut.execute({
            userId: "01",
            gymId: "01"
        })


        expect(checkIn.id).toEqual(expect.any(String))

    })


})

