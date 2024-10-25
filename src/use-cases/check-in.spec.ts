import { expect, test, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkIns-repository'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

// sut = principal variavel testada

let checkInRepository: InMemoryCheckInsRepository
let gymsRepository: inMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {

    beforeEach(() => { // usando dessa forma eu nao repito o codigo da instanciação das classes e isolo o contexto para cada um antes de cada teste
        checkInRepository = new InMemoryCheckInsRepository()
        gymsRepository = new inMemoryGymsRepository()
        sut = new CheckInUseCase(checkInRepository, gymsRepository)

        gymsRepository.items.push({
            id: "01",
            title: "JS gym",
            description: "Acedemia legal",
            phone: '',
            latitude: new Decimal(0),
            longitude: new Decimal(0)
        })

        vi.useFakeTimers() // mocks de data
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it("should be able to check in", async () => {


        vi.setSystemTime(new Date(2024, 0, 12, 8, 0, 0))

        const { checkIn } = await sut.execute({
            userId: "01",
            gymId: "01",
            userLatitude: 0,
            userLongitude: 0
        })

        expect(checkIn.id).toEqual(expect.any(String))

    })


    it("should not be able to check in twice in the same day", async () => {


        vi.setSystemTime(new Date(2024, 0, 12, 8, 0, 0))

        await sut.execute({
            userId: "01",
            gymId: "01",
            userLatitude: 0,
            userLongitude: 0
        })


        await expect(() => sut.execute({
            userId: "01",
            gymId: "01",
            userLatitude: 0,
            userLongitude: 0
        })).rejects.toBeInstanceOf(Error)

    })


    it("should be able to check in twice but in different days", async () => {


        vi.setSystemTime(new Date(2024, 0, 12, 8, 0, 0))

        await sut.execute({
            userId: "01",
            gymId: "01",
            userLatitude: 0,
            userLongitude: 0
        })

        vi.setSystemTime(new Date(2024, 0, 14, 8, 0, 0))

        const { checkIn } = await sut.execute({
            userId: "01",
            gymId: "01",
            userLatitude: 0,
            userLongitude: 0
        })


        expect(checkIn.id).toEqual(expect.any(String))
    })




})

