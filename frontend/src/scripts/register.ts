import * as api from "./api/usersApi";
import * as myLib from "./lib";

(() => {
    const submitButtonElement = document.getElementById("submit-button");
    const formElement = document.getElementById("form");

    const usernameInputElement = (formElement.getElementsByTagName(
        "input",
    ) as any).username;
    const firstNameInputElement = (formElement.getElementsByTagName(
        "input",
    ) as any).firstName;
    const lastNameInputElement = (formElement.getElementsByTagName(
        "input",
    ) as any).lastName;
    const passwordInputElement = (formElement.getElementsByTagName(
        "input",
    ) as any).password;
    const rePasswordInputElement = (formElement.getElementsByTagName(
        "input",
    ) as any).rePassword;

    submitButtonElement.addEventListener("click", function (event) {
        event.preventDefault();

        const username = usernameInputElement.value;
        const firstName = firstNameInputElement.value;
        const lastName = lastNameInputElement.value;
        const password = passwordInputElement.value;
        const rePassword = rePasswordInputElement.value;

        if (
            !myLib.checkInputErrors(usernameInputElement, {
                notEmpty: "Ошибка: имя пользователя - обязательное поле!",
                regexp: {
                    value: /^[a-zA-Z0-9]+$/,
                    message:
                        "Ошибка: имя пользователя может содержать только a-z, A-Z, 0-9!",
                },
                length: {
                    min: 4,
                    message:
                        "Ошибка: имя пользователя должно содержать минимум 4 символа!",
                },
            })
        )
            return;

        if (
            !myLib.checkInputErrors(firstNameInputElement, {
                notEmpty: "Ошибка: имя - обязательное поле!",
                regexp: {
                    value: /^[а-яА-Я]+$/,
                    message: "Ошибка: имя может содержать только а-я, А-Я!",
                },
            })
        )
            return;

        if (
            !myLib.checkInputErrors(lastNameInputElement, {
                notEmpty: "Ошибка: фамилия - обязательное поле!",
                regexp: {
                    value: /^[а-яА-Я]+$/,
                    message: "Ошибка: фамилия может содержать только а-я, А-Я!",
                },
            })
        )
            return;

        if (
            !myLib.checkInputErrors(passwordInputElement, {
                notEmpty: "Ошибка: пароль - обязательное поле!",
                regexp: {
                    value: /^[a-zA-Z0-9\*\.\!\@\$\%\^\&\(\)\{\}\[\]\:\;\<\>\,\.\?\/\~\_\+\-\=\|\#\\]+$/,
                    message:
                        "Ошибка: пароль может содержать только латинские буквы и спецсимволы!",
                },
                length: {
                    min: 8,
                    message:
                        "Ошибка: пароль должен содержать минимум 8 символов!",
                },
            })
        )
            return;

        if (password !== rePassword) {
            myLib.showNotification("Ошибка: пароли не совпадают!", "error");
            myLib.addClass(rePasswordInputElement, "text-input__error");
            return;
        }

        console.log({
            username,
            firstName,
            lastName,
            password,
        });

        api.createUserRequest(
            { username, firstName, lastName, password },
            (resposnse) => {
                if (resposnse.status === 201)
                    window.location.pathname = "/login";
            },
            (error) => {
                if (
                    error.response.status === 400 &&
                    error.response.data.message === "Username has already used"
                ) {
                    myLib.showNotification(
                        "Ошибка: имя пользователя уже используется!",
                        "error",
                    );
                    myLib.addClass(usernameInputElement, "text-input__error");
                    return;
                }

                console.log(error.response);
            },
        );
    });

    [
        usernameInputElement,
        firstNameInputElement,
        lastNameInputElement,
        passwordInputElement,
        rePasswordInputElement,
    ].forEach((elem) =>
        elem.addEventListener("input", function (event: any) {
            myLib.removeClass(event.target, "text-input__error");
        }),
    );
})();
