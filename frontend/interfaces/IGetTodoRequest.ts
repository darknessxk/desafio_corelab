import {IRequestBase} from "@/interfaces/IRequestBase";
import ITodo from "@/interfaces/ITodo";

export interface IGetTodoRequest extends IRequestBase {
    params: Pick<ITodo, "id">
}