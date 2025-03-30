import type { CheckInsRepository } from '@/repositories/check-ins-repository'
import type { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ValidateCheckInServiceRequest {
	checkInId: string
}

type ValidateCheckInServiceResponse = {
	checkIn: CheckIn
}

export class ValidateCheckInService {
	constructor(private checkInsRepository: CheckInsRepository) {}

	async execute({
		checkInId,
	}: ValidateCheckInServiceRequest): Promise<ValidateCheckInServiceResponse> {
		const checkIn = await this.checkInsRepository.findById(checkInId)

		if (!checkIn) {
			throw new ResourceNotFoundError()
		}

		checkIn.validated_at = new Date()

		await this.checkInsRepository.save(checkIn)

		return { checkIn }
	}
}
