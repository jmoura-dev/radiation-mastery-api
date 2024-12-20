export class EmailAlreadyExistsError extends Error {
  constructor() {
    super('This email already registered on database.')
  }
}
