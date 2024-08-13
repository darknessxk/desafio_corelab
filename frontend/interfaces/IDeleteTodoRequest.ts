import {IRequestBase} from "@/interfaces/IRequestBase";
import ITodo from "@/interfaces/ITodo";

export interface IDeleteTodoRequest extends IRequestBase {
    params: Pick<ITodo, "id">
}