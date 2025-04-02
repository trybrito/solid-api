import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { usersRoutes } from './http/controllers/users/routes'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { checkInsRoutes } from './http/controllers/check-ins/routes'

export const app = fastify()

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: 'refreshToken',
		signed: false,
	},
	sign: {
		expiresIn: '10m',
	},
})
app.register(fastifyCookie)

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((err, _, res) => {
	if (err instanceof ZodError) {
		return res
			.status(400)
			.send({ message: 'Validation error.', issues: err.format() })
	}

	if (env.NODE_ENV !== 'production') {
		console.error(err)
	} else {
		// TODO: here we should log to an external tool for observability (like Datadog/NewRelic/Sentry)
	}

	return res.status(500).send({ message: 'Internal server error.' })
})
