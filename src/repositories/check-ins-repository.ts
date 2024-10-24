import { CheckIn, Prisma, User } from "@prisma/client";

// CheckInUncheckedCreateInput esse type tras so relacionamentos 
// CheckInCreateInput tras a entidade, no caso devo usar quando apartir de uma entidade eu queria criar outra
export interface CheckInRepository {
    create(data:Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}