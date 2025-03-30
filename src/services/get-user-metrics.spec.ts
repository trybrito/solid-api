import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsService } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsService

describe('Get User Metrics Service', () => {
	beforeEach(() => {
		checkInsRepository = new InMemoryCheckInsRepository()
		sut = new GetUserMetricsService(checkInsRepository)
	})

	it('should be able to get check-ins count from metrics', async () => {
		const userId = 'user-01'

		await checkInsRepository.create({
			gym_id: 'gym-01',
			user_id: userId,
		})

		await checkInsRepository.create({
			gym_id: 'gym-01',
			user_id: userId,
		})

		const { checkInsCount } = await sut.execute({
			userId,
		})

		expect(checkInsCount).toEqual(2)
	})
})
