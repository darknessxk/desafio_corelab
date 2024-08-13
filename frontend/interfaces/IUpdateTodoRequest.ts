import {IRequestBase} from "@/interfaces/IRequestBase";
import ITodo from "@/interfaces/ITodo";

export interface IUpdateTodoRequest extends IRequestBase {
    params: Pick<ITodo, "id">,
    body: Omit<Partial<ITodo>, "id">
}