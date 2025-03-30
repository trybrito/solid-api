import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

// sut stands for 'system under test'
let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('Authenticate service', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new AuthenticateService(usersRepository)
	})

	it('should be able to authenticate', async () => {
		const password = '123456'

		await usersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password_hash: await hash(password, 6),
		})

		const { user } = await sut.execute({
			email: 'johndoe@example.com',
			password,
		})

		expect(user.id).toEqual(expect.any(String))
	})

	it('should not authenticate if email is invalid', async () => {
		await expect(() =>
			sut.execute({
				email: 'johndoe@example.com',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

	it('should not authenticate with wrong password', async () => {
		await usersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password_hash: await hash('123456', 6),
		})

		await expect(() =>
			sut.execute({
				email: 'johndoe@example.com',
				password: '123123',
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})
