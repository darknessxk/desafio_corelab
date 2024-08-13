import {useMutation} from "@tanstack/react-query";
import IMutationOptionsBase from "@/interfaces/IMutationOptionsBase";
import {ILoginRequest} from "@/interfaces/ILoginRequest";
import backend from "@/api/backend";
import {IAuthOkResponse} from "@/interfaces/IAuthOkResponse";
import {useUser} from "@/helpers/useUser";

const useLogin = (props: IMutationOptionsBase) => {
    const { setData } = useUser();

    const {
        mutate,
        status
    } = useMutation<IAuthOkResponse, Error, ILoginRequest["body"]>({
        mutationFn: async (data) =>
            backend.auth.login({
                body: {
                    ...data
                }
            }),
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

export default useLogin;