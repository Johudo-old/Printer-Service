var myLib = require("./lib");
var api = require("./api");

var submitButtonElement = document.getElementById("submit-button");
var formElement = document.getElementById("form");

var usernameInputElement = formElement.getElementsByTagName("input").username;
var firstNameInputElement = formElement.getElementsByTagName("input").firstName;
var lastNameInputElement = formElement.getElementsByTagName("input").lastName;
var passwordInputElement = formElement.getElementsByTagName("input").password;
var rePasswordInputElement = formElement.getElementsByTagName("input")
    .rePassword;

submitButtonElement.addEventListener("click", function (event) {
    event.preventDefault();

    var username = usernameInputElement.value;
    var firstName = firstNameInputElement.value;
    var lastName = lastNameInputElement.value;
    var password = passwordInputElement.value;
    var rePassword = rePasswordInputElement.value;

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
                message: "Ошибка: пароль должен содержать минимум 8 символов!",
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
            if (resposnse.status === 201) location.reload();
            console.log(resposnse);
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
    elem.addEventListener("input", function (event) {
        myLib.removeClass(event.target, "text-input__error");
    }),
);
