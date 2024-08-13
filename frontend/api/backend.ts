import IBackend from "@/interfaces/IBackend";

const BaseHeaders = { "Content-Type": "application/json", "Accept": "application/json" }

const resolveResponse = async (
    response: Response,
    conditionalMappers?: { [key: number]: (data: any) => Promise<unknown> }
) => {
    if (!response.ok) {
        const { message, errors } = await response.json();

        if (conditionalMappers && conditionalMappers[response.status]) {
            return await conditionalMappers[response.status]({ message, errors });
        }

        throw new Error(message);
    }

    const data = await response.json();

    if (conditionalMappers && conditionalMappers[response.status]) {
        return await conditionalMappers[response.status](data);
    }

    return data;
}

const withAuthHeader = (authToken?: string, headers?: { [key: string]: unknown }) => ({
    "Authorization": `Bearer ${authToken!}`,
    ...BaseHeaders,
    ...headers,
})

export const createBackend = (
    baseUrl: string,
    fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>
): IBackend => ({
    auth: {
        login: async (request) => {
            const response = await fetch(`${baseUrl}/auth/login`, {
                method: "POST",
                headers: { ...BaseHeaders },
                body: JSON.stringify(request.body),
            });

            return await resolveResponse(response);
        },
        register: async (request) => {
            const response = await fetch(`${baseUrl}/auth/register`, {
                method: "POST",
                headers: { ...BaseHeaders },
                body: JSON.stringify(request.body),
            });

            return await resolveResponse(response);
        },
        profile: async (request, authToken) => {
            const response = await fetch(`${baseUrl}/auth/profile`, {
                method: "GET",
                headers: withAuthHeader(authToken),
            });

            return await resolveResponse(response);
        },
    },

    todos: {
        list: async (_request, authToken) => {
            const response = await fetch(`${baseUrl}/todo`, {
                method: "GET",
                headers: withAuthHeader(authToken),
            });

            return await resolveResponse(response, {
                204: async () => [],
            });
        },
        get: async (request, authToken) => {
            const response = await fetch(`${baseUrl}/todo/${request.params.id}`, {
                method: "GET",
                headers: withAuthHeader(authToken),
            });

            return await resolveResponse(response);
        },
        create: async (request, authToken) => {
            const response = await fetch(`${baseUrl}/todo`, {
                method: "POST",
                headers: withAuthHeader(authToken),
                body: JSON.stringify(request.body),
            });

            return await resolveResponse(response);
        },
        update: async (request, authToken) => {
            const response = await fetch(`${baseUrl}/todo/${request.params.id}`, {
                method: "PUT",
                headers: withAuthHeader(authToken),
                body: JSON.stringify(request.body),
            });

            return await resolveResponse(response);
        },
        delete: async (request, authToken) => {
            const response = await fetch(`${baseUrl}/todo/${request.params.id}`, {
                method: "DELETE",
                headers: withAuthHeader(authToken),
            });

            return await resolveResponse(response);
        },
        stats: async (_request, authToken) => {
            const response = await fetch(`${baseUrl}/todo/stats`, {
                method: "GET",
                headers: withAuthHeader(authToken),
            });

            return await resolveResponse(response);
        }
    }
});

export default createBackend(process.env.NEXT_PUBLIC_API_URL!, fetch);