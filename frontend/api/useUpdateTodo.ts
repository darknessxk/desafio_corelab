import {useMutation} from "@tanstack/react-query";
import IMutationOptionsBase from "@/interfaces/IMutationOptionsBase";
import backend from "@/api/backend";
import {IUpdateTodoRequest} from "@/interfaces/IUpdateTodoRequest";
import ITodo from "@/interfaces/ITodo";

const useUpdateTodo = (props: IMutationOptionsBase) => {
    const {
        mutate,
        status
    } = useMutation<ITodo, Error, Pick<IUpdateTodoRequest, "params" | "body">>({
        mutationFn: async (data) =>
            backend.todos.update({ params: data.params, body: data.body }, props.authToken),
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

export default useUpdateTodo;