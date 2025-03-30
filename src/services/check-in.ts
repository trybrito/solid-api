import type { CheckInsRepository } from '@/repositories/check-ins-repository'
import type { CheckIn } from '@prisma/client'

interface CheckInServiceRequest {
	userId: string
	gymId: string
}

type CheckInServiceResponse = {
	checkIn: CheckIn
}

export class CheckInService {
	constructor(private checkInsRepository: CheckInsRepository) {}

	async execute({
		userId,
		gymId,
	}: CheckInServiceRequest): Promise<CheckInServiceResponse> {
		const checkIn = await this.checkInsRepository.create({
			user_id: userId,
			gym_id: gymId,
		})

		return { checkIn }
	}
}
