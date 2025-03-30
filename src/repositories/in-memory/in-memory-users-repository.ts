import type { Prisma, User } from '@prisma/client'
import type { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
	public database: User[] = []

	async findById(id: string) {
		const user = this.database.find((user) => user.id === id)

		if (!user) {
			return null
		}

		return user
	}

	async findByEmail(email: string) {
		const user = this.database.find((user) => user.email === email)

		if (!user) {
			return null
		}

		return user
	}
	async create(data: Prisma.UserCreateInput) {
		const user = {
			id: 'user-1',
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			created_at: new Date(),
		}

		this.database.push(user)

		return user
	}
}
