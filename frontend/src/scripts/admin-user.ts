import * as api from "./api/usersApi";
import * as myLib from "./lib";

(() => {
    const updateButtonElement = document.getElementById("update-button");
    const deleteButtonElement = document.getElementById("delete-button");
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
    const isAdminInputElement = (formElement.getElementsByTagName(
        "input",
    ) as any).isAdmin;
    const isActiveInputElement = (formElement.getElementsByTagName(
        "input",
    ) as any).isActive;

    updateButtonElement.addEventListener("click", function (event) {
        event.preventDefault();

        const username = usernameInputElement.value;
        const firstName = firstNameInputElement.value;
        const lastName = lastNameInputElement.value;
        const isActive = Boolean(isActiveInputElement.checked);
        const isAdmin = Boolean(isAdminInputElement.checked);

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

        console.log({
            username,
            firstName,
            lastName,
            isActive,
            isAdmin,
        });

        api.updateUserRequest(
            myLib
                .trimCharacter(window.location.pathname, "/")
                .split("/")
                .reverse()[0],
            { username, firstName, lastName, isActive, isAdmin },
            (resposnse) => {
                if (resposnse.status === 200) window.location.reload();
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

    // deleteButtonElement.addEventListener("click", function (event) {
    //     event.preventDefault();

    //     const username = usernameInputElement.value;
    //     const firstName = firstNameInputElement.value;
    //     const lastName = lastNameInputElement.value;
    //     const isActive = Boolean(isActiveInputElement.checked);
    //     const isAdmin = Boolean(isAdminInputElement.checked);

    //     console.log({
    //         username,
    //         firstName,
    //         lastName,
    //         isActive,
    //         isAdmin,
    //     });
    // });

    [usernameInputElement, firstNameInputElement, lastNameInputElement].forEach(
        (elem) =>
            elem.addEventListener("input", function (event: any) {
                myLib.removeClass(event.target, "text-input__error");
            }),
    );
})();
