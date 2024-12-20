import type { UsersRepository } from '@/repositories/users-repository'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'
import { hash } from 'bcryptjs'

interface RegisterUsersUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterUsersUseCaseResponse = void

export class RegisterUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUsersUseCaseRequest): Promise<RegisterUsersUseCaseResponse> {
    const doesUserWithSameEmailExists =
      await this.usersRepository.findByEmail(email)

    if (doesUserWithSameEmailExists) {
      throw new EmailAlreadyExistsError()
    }

    const password_hash = await hash(password, 8)

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
