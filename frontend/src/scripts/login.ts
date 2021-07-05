import md5 from "md5";
import { loginRequest } from "./api/authApi";
import { checkInputErrors, removeClass, showNotification } from "./lib";

(() => {
    const submitButtonElement = document.getElementById("submit-button");
    const formElement = document.getElementById("form");

    const usernameInputElement = (formElement.getElementsByTagName(
        "input",
    ) as any).username;
    const passwordInputElement = (formElement.getElementsByTagName(
        "input",
    ) as any).password;

    submitButtonElement.addEventListener("click", function (event) {
        event.preventDefault();

        const username = usernameInputElement.value;
        const password = passwordInputElement.value;

        if (
            !checkInputErrors(usernameInputElement, {
                notEmpty: "Ошибка: имя пользователя - обязательное поле!",
            })
        )
            return;

        if (
            !checkInputErrors(passwordInputElement, {
                notEmpty: "Ошибка: пароль - обязательное поле!",
            })
        )
            return;

        console.log({
            username,
            password,
        });

        loginRequest({ username, password: md5(password) }, (res) => {
            if (res.status === 200) window.location.pathname = res.data;
            if (res.status === 204)
                showNotification(
                    "Ошибка: Пользователя с таким именем и паролем не существует!",
                    "error",
                );
        });
    });

    [usernameInputElement, passwordInputElement].forEach((elem) =>
        elem.addEventListener("input", function (event: any) {
            removeClass(event.target, "text-input__error");
        }),
    );
})();
