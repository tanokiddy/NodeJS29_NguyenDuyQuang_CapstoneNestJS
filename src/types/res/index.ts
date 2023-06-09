export class ResModelWithData<T> {
    statusCode: number
    message: string
    data?: T
}

export class ResModel {
    statusCode: number
    message: string
}