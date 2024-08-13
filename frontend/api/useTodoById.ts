import {useQuery} from "@tanstack/react-query";
import IMutationOptionsBase from "@/interfaces/IMutationOptionsBase";
import backend from "@/api/backend";
import {IRequestEmpty} from "@/interfaces/IRequestEmpty";
import ITodo from "@/interfaces/ITodo";

const useTodoById = (props: IMutationOptionsBase & { id: string }) => {
    const {
        data,
        status
    } = useQuery<ITodo, Error, IRequestEmpty>({
        queryKey: [ "todos" ],
        queryFn: async () => backend.todos.get({
            params: { id: Number.parseInt(props.id) }
        }, props.authToken),
    })

    return {
        data,
        status
    }
}

export default useTodoById;