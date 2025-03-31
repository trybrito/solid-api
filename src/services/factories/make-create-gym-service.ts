import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymService } from '../create-gym'

export function makeCheckInService() {
	const gymsRepository = new PrismaGymsRepository()
	const createGymService = new CreateGymService(gymsRepository)

	return createGymService
}
