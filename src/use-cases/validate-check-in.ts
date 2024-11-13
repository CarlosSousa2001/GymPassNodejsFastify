import { CheckIn, User } from "@prisma/client";
import { ResourceNotFoundError } from "./erros/resource-not-found-error";
import { CheckInRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordenates";
import { MaxNumberOffCheckInError } from "./erros/max-number-off-check-ins-error";
import { MaxDistanceError } from "./erros/max-distance-error";
import { LateCheckInValidationError } from "./erros/LateCheckInValidationError";
import dayjs from "dayjs";

interface ValidateCheckInUseCaseRequest {
    checkInId: string
}

interface ValidateCheckInUseCaseResponse {
    checkIn: CheckIn
}

export class ValidateCheckInUseCase {
    
    constructor(
        private checkInRepository: CheckInRepository,
    ) {}

    async execute({ checkInId }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {

        const checkIn = await this.checkInRepository.findById(checkInId)

        if(!checkIn){
            throw new ResourceNotFoundError()
        }

        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.created_at,
            'minutes',
          )
          if (distanceInMinutesFromCheckInCreation > 20) {
            throw new LateCheckInValidationError()
          }

        checkIn.validated_at = new Date()

        await this.checkInRepository.save(checkIn)

        return {
            checkIn
        }
    }
}