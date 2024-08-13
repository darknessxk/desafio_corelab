import {useQuery} from "@tanstack/react-query";
import IMutationOptionsBase from "@/interfaces/IMutationOptionsBase";
import backend from "@/api/backend";

const useTodoList = (props: IMutationOptionsBase) => {
    const {
        data,
        status
    } = useQuery({
        queryKey: [ "todos" ],
        queryFn: async () => await backend.todos.list({}, props.authToken),
        enabled: !!props.authToken
    })

    return {
        data,
        status
    }
}

export default useTodoList;