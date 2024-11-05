import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkIns-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

// sut = principal variavel testada

let checkInRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get user metrics Use Case', () => {

    beforeEach(async () => { // usando dessa forma eu nao repito o codigo da instanciação das classes e isolo o contexto para cada um antes de cada teste
        checkInRepository = new InMemoryCheckInsRepository()
        sut = new GetUserMetricsUseCase(checkInRepository)

    })
    it("should be able to get check-ins user metrics", async () => {

        await checkInRepository.create({
            gym_id: "01",
            user_id: "01"
        })

        await checkInRepository.create({
            gym_id: "02",
            user_id: "01"
        })

        const {checkInsCount} = await sut.execute({
            userId: "01",
        })

        expect(checkInsCount).toEqual(2)


    })

})

