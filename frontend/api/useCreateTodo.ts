import {useMutation} from "@tanstack/react-query";
import IMutationOptionsBase from "@/interfaces/IMutationOptionsBase";
import backend from "@/api/backend";
import {ICreateTodoRequest} from "@/interfaces/ICreateTodoRequest";
import ITodo from "@/interfaces/ITodo";

const useCreateTodo = (props: IMutationOptionsBase) => {
    const {
        mutate,
        status
    } = useMutation<ITodo, Error, ICreateTodoRequest["body"]>({
        mutationFn: async (data) =>
            backend.todos.create({ body: data }, props.authToken),
        onError: (error) => {
            if (props.errorCallback) {
                props.errorCallback(error);
            }
        },
        onSuccess: (data) => {
            if (props.successCallback) {
                props.successCallback(data);
            }
        }
    })

    return {
        mutate,
        status
    }
}

export default useCreateTodo;