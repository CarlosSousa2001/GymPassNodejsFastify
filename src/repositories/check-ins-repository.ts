import { CheckIn, Prisma } from "@prisma/client";

// CheckInUncheckedCreateInput esse type tras so relacionamentos 
// CheckInCreateInput tras a entidade, no caso devo usar quando apartir de uma entidade eu queria criar outra
export interface CheckInRepository {
    create(data:Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    
    findByUserIdOnDate(userId:string, date: Date): Promise<CheckIn | null>

    findManyByUserId(userId: string, page: number): Promise<CheckIn[]>

    countByUserId(userId: string): Promise<number>

    findById(id:string): Promise<CheckIn | null>

    save(checkIn: CheckIn): Promise<CheckIn>
}