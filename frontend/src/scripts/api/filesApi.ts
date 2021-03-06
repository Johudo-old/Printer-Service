import axios, { AxiosError, AxiosResponse } from "axios";

export function createFileRequest(
    data: FormData,
    successCallback = (res: AxiosResponse<any>) => {},
    errorCallback = (err: AxiosError<any>) => {},
) {
    axios
        .post("/api/files", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => successCallback(res))
        .catch((err) => errorCallback(err));
}

export function printFileRequest(
    fileId: number,
    successCallback = (res: AxiosResponse<any>) => {},
    errorCallback = (err: AxiosError<any>) => {},
) {
    axios
        .get("/api/files/" + fileId + "/print")
        .then((res) => successCallback(res))
        .catch((err) => errorCallback(err));
}
