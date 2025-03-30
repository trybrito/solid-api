import type { Gym, Prisma } from '@prisma/client'

export interface GymsRepository {
	findById(id: string): Promise<Gym | null>
	searchManyByTitle(query: string, page: number): Promise<Gym[] | []>
	create(data: Prisma.GymCreateInput): Promise<Gym>
}
