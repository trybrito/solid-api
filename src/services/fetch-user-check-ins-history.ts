import type { CheckInsRepository } from '@/repositories/check-ins-repository'
import type { CheckIn } from '@prisma/client'

interface FetchUserCheckInsHistoryServiceRequest {
	userId: string
	page: number
}

interface FetchUserCheckInsHistoryServiceResponse {
	checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryService {
	constructor(private checkInsRepository: CheckInsRepository) {}

	async execute({
		userId,
		page,
	}: FetchUserCheckInsHistoryServiceRequest): Promise<FetchUserCheckInsHistoryServiceResponse> {
		const checkIns = await this.checkInsRepository.findManyByUserId(
			userId,
			page,
		)

		return { checkIns }
	}
}
