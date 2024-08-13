import {useMutation} from "@tanstack/react-query";
import IMutationOptionsBase from "@/interfaces/IMutationOptionsBase";
import backend from "@/api/backend";
import {IStatsTodoResponse} from "@/interfaces/IStatsTodoResponse";
import {IRequestEmpty} from "@/interfaces/IRequestEmpty";

const useStats = (props: IMutationOptionsBase) => {
    const {
        mutate,
        status
    } = useMutation<IStatsTodoResponse, Error, IRequestEmpty>({
        mutationFn: async (data) =>
            backend.todos.stats({}, props.authToken),
        onError: (error) => {
            if (props.errorCallback) {
                props.errorCallback(error);
            }
        },
        onSuccess: (data) => {
            if (props.successCallback) {
                props.successCallback(data);
            }
        },
    })

    return {
        mutate,
        status
    }
}

export default useStats;