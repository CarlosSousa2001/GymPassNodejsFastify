import { UsersRepository } from '@/repositories/users-repository'
import { User, Prisma, Gym } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { GymsRepository } from '../gyms-repository'

export class inMemoryGymsRepository implements GymsRepository {

    
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)
    if (!gym) {
      return null
    }
    return gym
  }


}