import { describe, it, expect } from 'vitest'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register service', () => {
	it('should be able to register', async () => {
		const usersRepository = new InMemoryUsersRepository()
		const registerService = new RegisterService(usersRepository)

		const { user } = await registerService.execute({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		})

		expect(user.id).toEqual(expect.any(String))
	})

	it('should hash user password upon registration', async () => {
		const usersRepository = new InMemoryUsersRepository()
		const registerService = new RegisterService(usersRepository)

		const password = '123456'

		const { user } = await registerService.execute({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password,
		})

		const isPasswordCorrectlyHashed = await compare(
			password,
			user.password_hash,
		)

		expect(isPasswordCorrectlyHashed).toBe(true)
	})

	it('should not be able to register a user with same email', async () => {
		const usersRepository = new InMemoryUsersRepository()
		const registerService = new RegisterService(usersRepository)

		const email = 'johndoe@example.com'

		await registerService.execute({
			name: 'John Doe',
			email,
			password: '123456',
		})

		await expect(() =>
			registerService.execute({
				name: 'John Doe',
				email,
				password: '123456',
			}),
		).rejects.toBeInstanceOf(UserAlreadyExistsError)
	})
})
