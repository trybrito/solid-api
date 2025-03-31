import type { Environment } from 'vitest/environments'

export default {
	name: 'prisma',
	transformMode: 'ssr',
	async setup() {
		console.log('Setup')

		return {
			async teardown() {
				console.log('Teardown')
			},
		}
	},
} as Environment
