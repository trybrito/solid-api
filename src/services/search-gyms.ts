import type { GymsRepository } from '@/repositories/gyms-repository'
import type { Gym } from '@prisma/client'

interface SearchGymsServiceRequest {
	query: string
	page: number
}

type SearchGymsServiceResponse = {
	gyms: Gym[]
}

export class SearchGymsService {
	constructor(private gymsRepository: GymsRepository) {}

	async execute({
		query,
		page,
	}: SearchGymsServiceRequest): Promise<SearchGymsServiceResponse> {
		const gyms = await this.gymsRepository.searchManyByTitle(query, page)

		return { gyms }
	}
}
