import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGyms } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymsService() {
	const gymsRepository = new PrismaGymsRepository()
	const fetchNearbyGymsFetch = new FetchNearbyGyms(gymsRepository)

	return fetchNearbyGymsFetch
}
