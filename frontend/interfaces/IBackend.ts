import {IAuthMutation, IMutation} from "@/interfaces/IMutation";
import ITodo from "@/interfaces/ITodo";
import {ILoginRequest} from "@/interfaces/ILoginRequest";
import {IRegisterRequest} from "@/interfaces/IRegisterRequest";
import {IAuthOkResponse} from "@/interfaces/IAuthOkResponse";
import {IRequestEmpty} from "@/interfaces/IRequestEmpty";
import {IProfileResponse} from "@/interfaces/IProfileResponse";
import {IGetTodoRequest} from "@/interfaces/IGetTodoRequest";
import {ICreateTodoRequest} from "@/interfaces/ICreateTodoRequest";
import {IUpdateTodoRequest} from "@/interfaces/IUpdateTodoRequest";
import {IDeleteTodoRequest} from "@/interfaces/IDeleteTodoRequest";
import {IStatsTodoResponse} from "@/interfaces/IStatsTodoResponse";

export default interface IBackend {
    auth: {
        login: IMutation<ILoginRequest, IAuthOkResponse>;
        register: IMutation<IRegisterRequest, IAuthOkResponse>;
        profile: IAuthMutation<IRequestEmpty, IProfileResponse>;
    }

    todos: {
        list: IAuthMutation<IRequestEmpty, Array<ITodo>>;
        get: IAuthMutation<IGetTodoRequest, ITodo>;
        create: IAuthMutation<ICreateTodoRequest, ITodo>;
        update: IAuthMutation<IUpdateTodoRequest, ITodo>;
        delete: IAuthMutation<IDeleteTodoRequest, {}>;
        stats: IAuthMutation<IRequestEmpty, IStatsTodoResponse>;
    }
}
