import axios, { AxiosError, AxiosResponse } from "axios";

export function cancelPrintingOrderRequest(
    fileId: number,
    successCallback = (res: AxiosResponse<any>) => {},
    errorCallback = (err: AxiosError<any>) => {},
) {
    axios
        .get("/api/orders/" + fileId + "/cancel")
        .then((res) => successCallback(res))
        .catch((err) => errorCallback(err));
}
