import {IRequestBase} from "@/interfaces/IRequestBase";

export type IMutation<RequestT extends IRequestBase, ResponseT, RequiresAuth extends boolean = false> =
    (request: RequestT, authToken?: RequiresAuth extends true ? string : null)
        => Promise<ResponseT>;

export type IAuthMutation<RequestT extends IRequestBase, ResponseT> = IMutation<RequestT, ResponseT, true>;
