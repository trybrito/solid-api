import { describe, it, beforeEach, expect } from 'vitest'
import { CreateGymService } from './create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('Register Service', () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository()
		sut = new CreateGymService(gymsRepository)
	})

	it('should be able to register', async () => {
		const { gym } = await sut.execute({
			title: 'Test Gym',
			description: null,
			phone: null,
			latitude: -22.8076349,
			longitude: -47.2158256,
		})

		expect(gym.id).toEqual(expect.any(String))
	})
})
