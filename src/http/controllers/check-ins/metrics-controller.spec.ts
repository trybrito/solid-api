import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Check-in Metrics Controller (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to get the total check-ins count', async () => {
		const { token } = await createAndAuthenticateUser(app)

		const user = await prisma.user.findFirstOrThrow()

		const gym = await prisma.gym.create({
			data: {
				title: 'TypeScript Gym',
				latitude: -22.8076349,
				longitude: -47.2158256,
			},
		})

		await prisma.checkIn.createMany({
			data: [
				{
					gym_id: gym.id,
					user_id: user.id,
				},
				{
					gym_id: gym.id,
					user_id: user.id,
				},
			],
		})

		const response = await request(app.server)
			.get('/check-ins/metrics')
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.statusCode).toEqual(200)
		expect(response.body.checkInsCount).toEqual(2)
	})
})
