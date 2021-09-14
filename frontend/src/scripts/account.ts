import { createFileRequest, printFileRequest } from "./api/filesApi";
import { cancelPrintingOrderRequest } from "./api/ordersApi";
import { showNotification } from "./lib";

const formElement = document.getElementById("file-form");
const fileInputElement = document.getElementById("file-input");
const labelElement = document.getElementById("file-input-label");
const labeTextElement = labelElement.getElementsByTagName("span")[0];
const submitButtonElement = labelElement.getElementsByTagName("button")[0];
const startPrintingButtons = Array.from(
    document.getElementsByClassName("start-printing-button"),
);
const cancelPrintingButtons = Array.from(
    document.getElementsByClassName("cancel-printing-button"),
);

let droppedFile: File;

const acceptedFileTypes = ["application/pdf"];

[
    "drag",
    "dragstart",
    "dragend",
    "dragover",
    "dragenter",
    "dragleave",
    "drop",
].forEach((elem) => {
    labelElement.addEventListener(elem, function (event) {
        event.preventDefault();
        event.stopPropagation();
    });
});

labelElement.addEventListener("dragenter", function (event) {
    labelElement.className = labelElement.className + " dragged-label";
});

labelElement.addEventListener("dragleave", function (event) {
    labelElement.className = labelElement.className.replace(
        " dragged-label",
        "",
    );
});

labelElement.addEventListener("drop", function (event) {
    labelElement.className = labelElement.className.replace(
        " dragged-label",
        "",
    );

    // Есть ли файл
    const currentDroppedFile = event.dataTransfer.files[0];
    if (!currentDroppedFile) return;

    // Разрешен ли тип файла
    let isAcceptedType = false;

    for (let i = 0; i < acceptedFileTypes.length; i++) {
        if (currentDroppedFile.type === acceptedFileTypes[i]) {
            isAcceptedType = true;
            break;
        }
    }

    if (!isAcceptedType) return;

    droppedFile = event.dataTransfer.files[0];
    labelElement.className = "uploaded-label";
    labeTextElement.innerText = droppedFile.name;

    // console.log(droppedFile);
});

fileInputElement.addEventListener("change", function (event) {
    const target = event.target as HTMLInputElement;
    if (target.files.length > 0) {
        droppedFile = target.files[0];
        labelElement.className = "uploaded-label";
        labeTextElement.innerText = droppedFile.name;
    }
});

submitButtonElement.addEventListener("click", function (event: any) {
    event.preventDefault();

    const fd = new FormData();
    fd.append("file", droppedFile);

    createFileRequest(
        fd,
        (res) => {
            if (res.status === 201) {
                location.reload();
                return;
            }

            console.log(res);
            showNotification("Непредвиденная ошибка!", "error");
        },
        (err) => {
            if (err.response.status === 401) {
                showNotification(
                    "Ошибка: необходимо перезагрузить страницу и авторизироваться снова!",
                    "error",
                );
                return;
            }

            if (err.response.status === 403) {
                showNotification(
                    "Ошибка: у вас нет прав на печать! Напишите @Johudo в телеграмме.",
                    "error",
                );
                return;
            }

            console.log(err.response);
        },
    );
});

if (startPrintingButtons.length > 0) {
    startPrintingButtons.forEach((item) => {
        item.addEventListener("click", async function (event: MouseEvent) {
            const id = Number((event.target as HTMLButtonElement).dataset.id);

            if (isNaN(id)) return;

            printFileRequest(
                id,
                (res) => {
                    console.log(res);
                    location.search = "?is_queue=true";
                },
                (err) => console.log(err),
            );
        });
    });
}

if (cancelPrintingButtons.length > 0) {
    cancelPrintingButtons.map((item) => {
        item.addEventListener("click", function (event: MouseEvent) {
            const id = Number((event.target as HTMLButtonElement).dataset.id);

            if (isNaN(id)) return;

            cancelPrintingOrderRequest(
                id,
                (res) => {
                    console.log(res);
                    location.reload();
                },
                (err) => console.log(err),
            );
        });
    });
}
