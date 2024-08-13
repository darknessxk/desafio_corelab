export type IRequestBase = {
    body?: { [key: string]: any; },
    query?: { [key: string]: any; },
    params?: { [key: string]: any; },
    headers?: { [key: string]: any; },
}