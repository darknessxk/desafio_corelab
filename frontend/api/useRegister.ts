import {useMutation} from "@tanstack/react-query";
import IMutationOptionsBase from "@/interfaces/IMutationOptionsBase";
import backend from "@/api/backend";
import {IAuthOkResponse} from "@/interfaces/IAuthOkResponse";
import {useUser} from "@/helpers/useUser";
import {IRegisterRequest} from "@/interfaces/IRegisterRequest";

const useRegister = (props: IMutationOptionsBase) => {
    const { setData } = useUser();

    const {
        mutate,
        status
    } = useMutation<IAuthOkResponse, Error, IRegisterRequest["body"]>({
        mutationFn: async (data) =>
            backend.auth.register({ body: data }),
        onError: (error) => {
            if (props.errorCallback) {
                props.errorCallback(error);
            }
        },
        onSuccess: (data) => {
            if (props.successCallback) {
                props.successCallback(data);
            }

            setData(data);
        }
    })

    return {
        mutate,
        status
    }
}

export default useRegister;