import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { GetUserMetricsService } from '../get-user-metrics'

export function makeCheckInService() {
	const checksInsRepository = new PrismaCheckInsRepository()
	const getUserMetricsService = new GetUserMetricsService(checksInsRepository)

	return getUserMetricsService
}
