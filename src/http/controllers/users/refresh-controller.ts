import type { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(req: FastifyRequest, res: FastifyReply) {
	await req.jwtVerify({ onlyCookie: true })

	const token = await res.jwtSign(
		{
			role: req.user.role,
		},
		{
			sign: {
				sub: req.user.sub,
			},
		},
	)

	const refreshToken = await res.jwtSign(
		{
			role: req.user.role,
		},
		{
			sign: {
				sub: req.user.sub,
				expiresIn: '7d',
			},
		},
	)

	return res
		.setCookie('refreshToken', refreshToken, {
			path: '/',
			secure: true,
			sameSite: true,
			httpOnly: true,
		})
		.send({ token })
}
