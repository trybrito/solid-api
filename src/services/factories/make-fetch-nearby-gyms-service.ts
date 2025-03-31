import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGyms } from '../fetch-nearby-gyms'

export function makeCheckInService() {
	const gymsRepository = new PrismaGymsRepository()
	const fetchNearbyGymsFetch = new FetchNearbyGyms(gymsRepository)

	return fetchNearbyGymsFetch
}
