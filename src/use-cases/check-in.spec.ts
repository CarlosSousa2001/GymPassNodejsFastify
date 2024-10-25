import { expect, test, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckInProfileUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkIns-repository'

// sut = principal variavel testada

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInProfileUseCase

describe('Check-in Use Case', () => {

    beforeEach(() => { // usando dessa forma eu nao repito o codigo da instanciação das classes e isolo o contexto para cada um antes de cada teste
        checkInRepository = new InMemoryCheckInsRepository()
        sut = new CheckInProfileUseCase(checkInRepository)

        vi.useFakeTimers() // mocks de data
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it("should be able to check in", async () => {

        vi.setSystemTime(new Date(2024, 0, 12, 8, 0, 0))

        const { checkIn } = await sut.execute({
            userId: "01",
            gymId: "01"
        })

        expect(checkIn.id).toEqual(expect.any(String))

    })


    it("should not be able to check in twice in the same day", async () => {


        vi.setSystemTime(new Date(2024, 0, 12, 8, 0, 0))

        await sut.execute({
            userId: "01",
            gymId: "01"
        })


        await expect(() => sut.execute({
            userId: "01",
            gymId: "01"
        })).rejects.toBeInstanceOf(Error)

    })


    it("should be able to check in twice but in different days", async () => {


        vi.setSystemTime(new Date(2024, 0, 12, 8, 0, 0))

        await sut.execute({
            userId: "01",
            gymId: "01"
        })

        vi.setSystemTime(new Date(2024, 0, 14, 8, 0, 0))

        const { checkIn } = await sut.execute({
            userId: "01",
            gymId: "01"
        })


        expect(checkIn.id).toEqual(expect.any(String))
    })




})

