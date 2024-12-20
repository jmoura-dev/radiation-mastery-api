import { EmailAlreadyExistsError } from '@/use-cases/errors/email-already-exists-error'
import { makeRegisterUsers } from '@/use-cases/factories/make-register-users'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerUsersController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerUserBodySchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string(),
  })

  const { name, email, password } = registerUserBodySchema.parse(request.body)

  try {
    await makeRegisterUsers().execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
