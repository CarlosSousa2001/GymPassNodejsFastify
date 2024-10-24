export class ResourceNotFoundError extends Error {
    constructor() {
        super('Entity not found')
    }
}