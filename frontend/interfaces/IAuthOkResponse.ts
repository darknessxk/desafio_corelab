import IUser from "@/interfaces/IUser";

export interface IAuthOkResponse {
    token: string;
    user: IUser;
}