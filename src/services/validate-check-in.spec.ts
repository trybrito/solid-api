import { describe, it, beforeEach, expect, afterAll, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckInService } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInService

describe('Check-in Service', () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInsRepository()
		sut = new ValidateCheckInService(checkInsRepository)

		vi.useFakeTimers()
	})

	afterAll(() => {
		vi.useRealTimers()
	})

	it('should be able to validate check-in', async () => {
		const createdCheckIn = await checkInsRepository.create({
			user_id: 'user-01',
			gym_id: 'gym-01',
		})

		const { checkIn } = await sut.execute({ checkInId: createdCheckIn.id })

		expect(checkIn.validated_at).toEqual(expect.any(Date))
		expect(checkInsRepository.database[0].validated_at).toEqual(
			expect.any(Date),
		)
	})

	it('should not be able to validate an inexistent check-in', async () => {
		await expect(() =>
			sut.execute({
				checkInId: 'inexistent check-in id',
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError)
	})

	it('should not be able to validate a check-in created more than 20 minutes ago', async () => {
		vi.setSystemTime(new Date(2025, 2, 29, 20, 0, 0))

		const createdCheckIn = await checkInsRepository.create({
			user_id: 'user-01',
			gym_id: 'gym-01',
		})

		const TwentyOneMinutesInMs = 1000 * 60 * 21

		vi.advanceTimersByTime(TwentyOneMinutesInMs)

		await expect(() =>
			sut.execute({
				checkInId: createdCheckIn.id,
			}),
		).rejects.toBeInstanceOf(LateCheckInValidationError)
	})
})
