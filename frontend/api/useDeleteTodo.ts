import {useMutation} from "@tanstack/react-query";
import IMutationOptionsBase from "@/interfaces/IMutationOptionsBase";
import backend from "@/api/backend";
import {IDeleteTodoRequest} from "@/interfaces/IDeleteTodoRequest";

const useDeleteTodo = (props: IMutationOptionsBase) => {
    const {
        mutate,
        status
    } = useMutation<{}, Error, IDeleteTodoRequest["params"]>({
        mutationFn: async (data) =>
            backend.todos.delete({ params: data }, props.authToken),
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

export default useDeleteTodo;