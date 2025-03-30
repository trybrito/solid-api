import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsService } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsService

describe('Search Gyms Service', () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository()
		sut = new SearchGymsService(gymsRepository)
	})

	it('should be able to search for gyms', async () => {
		await gymsRepository.create({
			title: 'Test Gym',
			description: null,
			phone: null,
			latitude: -22.8076349,
			longitude: -47.2158256,
		})

		await gymsRepository.create({
			title: 'Test Gymnastics',
			description: null,
			phone: null,
			latitude: -22.8076349,
			longitude: -47.2158256,
		})

		const { gyms } = await sut.execute({
			query: 'Test Gym',
			page: 1,
		})

		expect(gyms).toHaveLength(2)
		expect(gyms).toEqual([
			expect.objectContaining({ title: 'Test Gym' }),
			expect.objectContaining({ title: 'Test Gymnastics' }),
		])
	})

	it('should be able to paginate the amount of returned gyms', async () => {
		for (let i = 1; i <= 22; i++) {
			await gymsRepository.create({
				title: `Test Gym ${i}`,
				description: null,
				phone: null,
				latitude: -22.8076349,
				longitude: -47.2158256,
			})
		}

		const { gyms } = await sut.execute({
			query: 'Test Gym',
			page: 2,
		})

		expect(gyms).toHaveLength(2)
		expect(gyms).toEqual([
			expect.objectContaining({ title: 'Test Gym 21' }),
			expect.objectContaining({ title: 'Test Gym 22' }),
		])
	})
})
