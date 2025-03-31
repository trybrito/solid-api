import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate Controller (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to authenticate', async () => {
		const token = await createAndAuthenticateUser()

		const profileResponse = await request(app.server)
			.get('/me')
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(profileResponse.statusCode).toEqual(200)
		expect(profileResponse.body.user).toEqual(
			expect.objectContaining({
				email: 'johndoe@example.com',
			}),
		)
	})
})
