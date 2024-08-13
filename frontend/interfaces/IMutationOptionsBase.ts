export default interface IMutationOptionsBase {
    successCallback?: <T>(data: T) => void;
    errorCallback?: <E extends Error>(err: E) => void;
    authToken?: string;
}