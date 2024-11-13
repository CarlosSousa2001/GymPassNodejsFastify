import { Gym, Prisma} from "@prisma/client";

export interface FindManyNearByParms {
    latitude:number;
    longitude:number;
}

export interface GymsRepository {
    
    findById(gymId:string):Promise<Gym | null>

    create(data: Prisma.GymCreateInput): Promise<Gym>

    searchMany(query:string, page:number): Promise<Gym[]>

    findManyNearby(params:FindManyNearByParms): Promise<Gym[]>
}