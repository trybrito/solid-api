import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymsService } from '../search-gyms'

export function makeRegisterService() {
	const gymsRepository = new PrismaGymsRepository()
	const searchGymsService = new SearchGymsService(gymsRepository)

	return searchGymsService
}
