import axios, { AxiosError, AxiosResponse } from "axios";

export function loginRequest(
    data: {
        username: string;
        password: string;
    },
    successCallback = (res: AxiosResponse<any>) => {},
    errorCallback = (err: AxiosError<any>) => {},
) {
    axios
        .post("/auth/login", data)
        .then((res) => successCallback(res))
        .catch((err) => errorCallback(err));
}
