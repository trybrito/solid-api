import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchUserCheckInsHistoryService } from '../fetch-user-check-ins-history'

export function makeFetchUserCheckInsHistoryService() {
	const checksInsRepository = new PrismaCheckInsRepository()
	const fetchUserCheckInsHistoryService = new FetchUserCheckInsHistoryService(
		checksInsRepository,
	)

	return fetchUserCheckInsHistoryService
}
