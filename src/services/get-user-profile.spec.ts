import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { GetUserProfileService } from './get-user-profile'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('Get User Profile Service', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new GetUserProfileService(usersRepository)
	})

	it('should be able to get user profile', async () => {
		const name = 'John Doe'

		const createdUser = await usersRepository.create({
			name,
			email: 'johndoe@example.com',
			password_hash: await hash('123456', 6),
		})

		const { user } = await sut.execute({ userId: createdUser.id })

		expect(user.name).toEqual(name)
	})

	it('should not be able to get a user profile if user if wrong id', async () => {
		await expect(() =>
			sut.execute({ userId: 'non-existing-id' }),
		).rejects.toBeInstanceOf(ResourceNotFoundError)
	})
})
