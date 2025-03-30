import { describe, it, expect } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate service', () => {
	it('should be able to authenticate', async () => {
		const usersRepository = new InMemoryUsersRepository()
		const sut = new AuthenticateService(usersRepository) // system under test

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
		const usersRepository = new InMemoryUsersRepository()
		const sut = new AuthenticateService(usersRepository)

		await expect(() =>
			sut.execute({
				email: 'johndoe@example.com',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

	it('should not authenticate with wrong password', async () => {
		const usersRepository = new InMemoryUsersRepository()
		const sut = new AuthenticateService(usersRepository)

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
