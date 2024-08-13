import {IRequestBase} from "@/interfaces/IRequestBase";
import ITodo from "@/interfaces/ITodo";

export interface ICreateTodoRequest extends IRequestBase {
    body: Pick<ITodo, "title" | "description" | "completed" | "color">
}