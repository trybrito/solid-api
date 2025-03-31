import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Find Nearby Gyms Controller (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to find nearby gyms', async () => {
		const { token } = await createAndAuthenticateUser(app)

		// Near Gym
		await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'TypeScript Gym',
				description: 'A hard-typed gym',
				phone: '19999999999',
				latitude: -22.8076349,
				longitude: -47.2158256,
			})

		// Far Gym
		await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'JavaScript Gym',
				description: 'An objectified gym',
				phone: '19999999999',
				latitude: -22.9011896,
				longitude: -47.0565863,
			})

		const response = await request(app.server)
			.get('/gyms/nearby')
			.query({
				latitude: -22.8076349,
				longitude: -47.2158256,
			})
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.statusCode).toEqual(200)
		expect(response.body.gyms).toHaveLength(1)
		expect(response.body.gyms).toEqual([
			expect.objectContaining({
				title: 'TypeScript Gym',
			}),
		])
	})
})
