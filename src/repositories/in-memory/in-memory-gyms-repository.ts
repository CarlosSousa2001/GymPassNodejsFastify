import { UsersRepository } from '@/repositories/users-repository'
import { User, Prisma, Gym } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { GymsRepository } from '../gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

export class inMemoryGymsRepository implements GymsRepository {


  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)
    if (!gym) {
      return null
    }
    return gym
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString())
    }
    this.items.push(gym)
    return gym
  }


}