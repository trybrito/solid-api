import type { CheckInsRepository } from '@/repositories/check-ins-repository'
import type { CheckIn } from '@prisma/client'

interface FetchUserCheckInsHistoryServiceRequest {
	userId: string
}

interface FetchUserCheckInsHistoryServiceResponse {
	checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryService {
	constructor(private checkInsRepository: CheckInsRepository) {}

	async execute({
		userId,
	}: FetchUserCheckInsHistoryServiceRequest): Promise<FetchUserCheckInsHistoryServiceResponse> {
		const checkIns = await this.checkInsRepository.findManyById(userId)

		return { checkIns }
	}
}
