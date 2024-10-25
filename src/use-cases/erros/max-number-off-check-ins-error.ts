export class MaxNumberOffCheckInError extends Error {
    constructor() {
        super('Max number of check-ins reached')
    }
}