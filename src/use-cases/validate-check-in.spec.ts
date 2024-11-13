import { expect, test, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkIns-repository'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

// sut = principal variavel testada

let checkInRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('validate Check-in Use Case', () => {

    beforeEach(async () => { // usando dessa forma eu nao repito o codigo da instanciação das classes e isolo o contexto para cada um antes de cada teste
        checkInRepository = new InMemoryCheckInsRepository()
        sut = new ValidateCheckInUseCase(checkInRepository)

        // await gymsRepository.create({
        //     id: "01",
        //     title: "JS gym",
        //     description: "Acedemia legal",
        //     phone: '',
        //     latitude: -2.555035,
        //     longitude: -44.184913
        // })

        vi.useFakeTimers() // mocks de data
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it("should be able to validare the check-in", async () => {

        const createdCheckIn = await checkInRepository.create({
            user_id: "01",
            gym_id: "01",
        })

        const { checkIn } = await sut.execute({
            checkInId: createdCheckIn.id
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))

    })


    it('should not be able to validate an inexistent check-in', async () => {

        await expect(() =>
            sut.execute({
                checkInId: 'inexistent-check-in-id',
            }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

    it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
        vi.setSystemTime(new Date(2023, 0, 1, 13, 40))
        const createdCheckIn = await checkInRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        })
        const twentyOneMinutesInMs = 1000 * 60 * 21
        vi.advanceTimersByTime(twentyOneMinutesInMs)
        await expect(() =>
            sut.execute({
                checkInId: createdCheckIn.id,
            }),
        ).rejects.toBeInstanceOf(Error)
    })

})

