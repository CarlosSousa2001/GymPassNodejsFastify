import { Prisma, CheckIn } from "@prisma/client";
import { CheckInRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements CheckInRepository {

    public items: CheckIn[] = []


    async findByUserIdOnDate(userId: string, date: Date) {

        const startOfTheDay = dayjs(date).startOf("date")
        const endOfTheDat = dayjs(date).endOf("date")

        const checkInOnSameDate = this.items.find((checkIn) => {

            const checkInDate = dayjs(checkIn.created_at)
            // aqui eu aoenas quero saber se o checkin foi feito entre o inicio do dia ate o final do dias ex das 00:01 ate as 23:59
            const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDat)

            return checkIn.user_id === userId && isOnSameDate
        })
        if (!checkInOnSameDate) {
            return null
        }
        return checkInOnSameDate
    }

    async findManyByUserId(userId: string, page: number) {
        return this.items
            .filter((checkIn) => checkIn.user_id === userId)
            .slice((page - 1) * 20, page * 20)
    }
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date()
        }
        this.items.push(checkIn)
        return checkIn
    }

    async countByUserId(userId: string) {
        return this.items
            .filter((checkIn) => checkIn.user_id === userId)
            .length
    }


    async findById(id: string) {
        const checkIn = this.items.find(item => item.id === id)
        if (!checkIn) {
            return null
        }
        return checkIn
    }

    async save(checkIn: CheckIn) {
        const checkInIndex = this.items.findIndex(item => item.id === checkIn.id)

        if(checkInIndex >= 0){
           this.items[checkInIndex] = checkIn
        }
        
        return checkIn
    }

}