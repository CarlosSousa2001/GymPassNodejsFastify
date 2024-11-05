import { expect, test, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkIns-repository'
import { FetchUserCheckInHistoryUseCase } from './fetch-user-check-ins-history'

// sut = principal variavel testada

let checkInRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInHistoryUseCase

describe('Fetch user check-in history Use Case', () => {

    beforeEach(async () => { // usando dessa forma eu nao repito o codigo da instanciação das classes e isolo o contexto para cada um antes de cada teste
        checkInRepository = new InMemoryCheckInsRepository()
        sut = new FetchUserCheckInHistoryUseCase(checkInRepository)

    })
    it("should be able to check in", async () => {

        await checkInRepository.create({
            gym_id: "01",
            user_id: "01"
        })

        await checkInRepository.create({
            gym_id: "02",
            user_id: "01"
        })

        const { checkIns } = await sut.execute({
            userId: "01",
            page: 1
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: "01" }),
            expect.objectContaining({ gym_id: "02" })
        ])

    })

    it('should be able to fetch paginated check-in history', async () => {
        for (let i = 1; i <= 22; i++) {
            await checkInRepository.create({
                gym_id: `0${i}`,
                user_id: '01',
            })
        }
        const { checkIns } = await sut.execute({
            userId: '01',
            page: 2,
        })
        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: '021' }),
            expect.objectContaining({ gym_id: '022' }),
        ])
    })




})

