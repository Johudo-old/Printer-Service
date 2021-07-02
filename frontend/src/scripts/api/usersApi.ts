import axios, { AxiosError, AxiosResponse } from "axios";

export function createUserRequest(
    data: {
        username: string;
        firstName: string;
        lastName: string;
        password: string;
    },
    successCallback = (res: AxiosResponse<any>) => {},
    errorCallback = (err: AxiosError<any>) => {},
) {
    axios
        .post("/api/users", data)
        .then((res) => successCallback(res))
        .catch((err) => errorCallback(err));
}

export function updateUserRequest(
    userId: string,
    data: {
        username: string;
        firstName: string;
        lastName: string;
        isActive: boolean;
        isAdmin: boolean;
    },
    successCallback = (res: AxiosResponse<any>) => {},
    errorCallback = (err: AxiosError<any>) => {},
) {
    axios
        .patch("/api/users/" + userId, data)
        .then((res) => successCallback(res))
        .catch((err) => errorCallback(err));
}
