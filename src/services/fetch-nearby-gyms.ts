import type { GymsRepository } from '@/repositories/gyms-repository'
import type { Gym } from '@prisma/client'

interface FetchNearbyGymsRequest {
	userLatitude: number
	userLongitude: number
}

type FetchNearbyGymsResponse = {
	gyms: Gym[]
}

export class FetchNearbyGyms {
	constructor(private gymsRepository: GymsRepository) {}

	async execute({
		userLatitude,
		userLongitude,
	}: FetchNearbyGymsRequest): Promise<FetchNearbyGymsResponse> {
		const gyms = await this.gymsRepository.findManyNearby({
			latitude: userLatitude,
			longitude: userLongitude,
		})

		return { gyms }
	}
}
