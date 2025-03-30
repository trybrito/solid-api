import type { Gym, Prisma } from '@prisma/client'

export interface findManyNearbyParams {
	latitude: number
	longitude: number
}

export interface GymsRepository {
	findById(id: string): Promise<Gym | null>
	findManyNearby(params: findManyNearbyParams): Promise<Gym[]>
	searchManyByTitle(query: string, page: number): Promise<Gym[]>
	create(data: Prisma.GymCreateInput): Promise<Gym>
}
