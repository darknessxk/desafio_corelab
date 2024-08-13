import {IRequestBase} from "@/interfaces/IRequestBase";

export interface IRegisterRequest extends IRequestBase {
    body: {
        email: string;
        password: string;
        password_confirmation: string;
        name: string;
    }
}