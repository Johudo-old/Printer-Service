var notificationElement = document.getElementById("notification");

export function addClass(element: Element, className: string) {
    if (!className) return;
    element.className += " " + className;
}

export function removeClass(element: Element, className: string) {
    if (!className) return;
    element.className = element.className.replace(" " + className, "");
}

export function showNotification(message: string = "", type = "success") {
    if (!message) return;

    notificationElement.className =
        "notification-block notification-block__shown";
    notificationElement.innerText = message;

    switch (type) {
        case "error":
            addClass(notificationElement, "notification-block__error");
        default:
    }

    setTimeout(() => {
        removeClass(notificationElement, "notification-block__shown");
    }, 3000);
}

export function checkInputIsNotEmpty(
    inputElement: HTMLInputElement,
    errorMessage = "",
) {
    if (inputElement.value) return true;

    showNotification(errorMessage, "error");
    addClass(inputElement, "text-input__error");
    return false;
}

export function checkInputRegExp(
    inputElement: HTMLInputElement,
    regexp = / /,
    errorMessage = "",
) {
    if (regexp.test(inputElement.value)) return true;

    showNotification(errorMessage, "error");
    addClass(inputElement, "text-input__error");
    return false;
}

export function checkInputLength(
    inputElement: HTMLInputElement,
    [min, max]: Array<number | undefined> = [],
    errorMessage = "",
) {
    if (
        !(min && inputElement.value.length < min) &&
        !(max && inputElement.value.length > max)
    )
        return true;

    showNotification(errorMessage, "error");
    addClass(inputElement, "text-input__error");
    return false;
}

export function checkInputErrors(inputElement: any, checkObject = {}) {
    // if (
    //     checkObject.notEmpty &&
    //     !checkInputIsNotEmpty(
    //         inputElement,
    //         checkObject.notEmpty || "Error: input is empty!",
    //     )
    // )
    //     return false;
    // if (
    //     checkObject.regexp &&
    //     checkObject.regexp.value &&
    //     !checkInputRegExp(
    //         inputElement,
    //         checkObject.regexp.value,
    //         checkObject.regexp.message || "Error: error regexp!",
    //     )
    // )
    //     return false;
    // if (
    //     checkObject.length &&
    //     !checkInputLength(
    //         inputElement,
    //         [checkObject.length.min, checkObject.length.max],
    //         checkObject.length.message || "Error: error length!",
    //     )
    // )
    //     return false;
    // return true;
}
