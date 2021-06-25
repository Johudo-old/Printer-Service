export function createUserRequest(
    { username, firstName, lastName, password },
    successCallback = () => {},
    errorCallback = () => {},
) {
    axios
        .post("/api/users", {
            username,
            firstName,
            lastName,
            password,
        })
        .then(successCallback())
        .catch(errorCallback());
}
