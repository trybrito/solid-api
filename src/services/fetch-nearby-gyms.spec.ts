import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGyms } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGyms

describe('Search Gyms Service', () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository()
		sut = new FetchNearbyGyms(gymsRepository)
	})

	it('should be able to fetch nearby gyms', async () => {
		await gymsRepository.create({
			title: 'Near Gym',
			description: null,
			phone: null,
			latitude: -22.8076349,
			longitude: -47.2158256,
		})

		await gymsRepository.create({
			title: 'Far Gym',
			description: null,
			phone: null,
			latitude: -22.9011896,
			longitude: -47.0565863,
		})

		const { gyms } = await sut.execute({
			userLatitude: -22.8076349,
			userLongitude: -47.2158256,
		})

		expect(gyms).toHaveLength(1)
		expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
	})
})
