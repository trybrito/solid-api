import { describe, it, beforeEach, expect, vi, afterAll } from 'vitest'
import { CheckInService } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let usersRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInService

describe('Check-in Service', () => {
	beforeEach(() => {
		usersRepository = new InMemoryCheckInsRepository()
		gymsRepository = new InMemoryGymsRepository()
		sut = new CheckInService(usersRepository, gymsRepository)

		gymsRepository.database.push({
			id: 'gym-01',
			title: 'Test Gym',
			description: '',
			phone: '',
			latitude: new Decimal(-22.8076349),
			longitude: new Decimal(-47.2158256),
		})

		vi.useFakeTimers()
	})

	afterAll(() => {
		vi.useRealTimers()
	})

	it('should be able to check-in', async () => {
		const { checkIn } = await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: -22.8076349,
			userLongitude: -47.2158256,
		})

		expect(checkIn.id).toEqual(expect.any(String))
	})

	/** TDD -> Test-driven Development
	 * Red (error on test);
	 * Green (writes the minimum amount of code to make test pass); and
	 * Refactor (implements the feature refactoring the code)
	 * **/

	it('should not be able to check-in twice on the same day', async () => {
		vi.setSystemTime(new Date(2025, 2, 29, 20, 0, 0))

		await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: -22.8076349,
			userLongitude: -47.2158256,
		})

		await expect(() =>
			sut.execute({
				gymId: 'gym-01',
				userId: 'user-01',
				userLatitude: -22.8076349,
				userLongitude: -47.2158256,
			}),
		).rejects.toBeInstanceOf(Error)
	})

	it('should be able to check-in twice on the different days', async () => {
		vi.setSystemTime(new Date(2025, 2, 29, 20, 0, 0))

		await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: -22.8076349,
			userLongitude: -47.2158256,
		})

		vi.setSystemTime(new Date(2025, 2, 30, 20, 0, 0))

		const { checkIn } = await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: -22.8076349,
			userLongitude: -47.2158256,
		})

		expect(checkIn.id).toEqual(expect.any(String))
	})

	it('should not be able to check-in on a distant gym', async () => {
		gymsRepository.database.push({
			id: 'gym-02',
			title: 'Test Gym',
			description: '',
			phone: '',
			latitude: new Decimal(-22.8374597),
			longitude: new Decimal(-47.1625247),
		})

		await expect(() =>
			sut.execute({
				gymId: 'gym-02',
				userId: 'user-01',
				userLatitude: -22.8076349,
				userLongitude: -47.2158256,
			}),
		).rejects.toBeInstanceOf(Error)
	})
})
