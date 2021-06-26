import axios, { AxiosError, AxiosResponse } from "axios";

export function createOrderRequest(
    data: FormData,
    successCallback = (res: AxiosResponse<any>) => {},
    errorCallback = (err: AxiosError<any>) => {},
) {
    axios
        .post("/api/orders", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => successCallback(res))
        .catch((err) => errorCallback(err));
}
