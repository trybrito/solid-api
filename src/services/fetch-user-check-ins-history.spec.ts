import { describe, beforeEach, it, expect } from 'vitest'
import { FetchUserCheckInsHistoryService } from './fetch-user-check-ins-history'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryService

describe('Fetch User Check-ins History Service', () => {
	beforeEach(() => {
		checkInsRepository = new InMemoryCheckInsRepository()
		sut = new FetchUserCheckInsHistoryService(checkInsRepository)
	})

	it('should be able to fetch user check-ins history', async () => {
		await checkInsRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01',
		})

		await checkInsRepository.create({
			gym_id: 'gym-02',
			user_id: 'user-01',
		})

		const { checkIns } = await sut.execute({
			userId: 'user-01',
		})

		expect(checkIns).toHaveLength(2)
		expect(checkIns).toEqual([
			expect.objectContaining({ gym_id: 'gym-01' }),
			expect.objectContaining({ gym_id: 'gym-02' }),
		])
	})
})
