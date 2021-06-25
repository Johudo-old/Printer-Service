import axios from "axios";

const SERVER_HOST = "/api";

const fileInput: HTMLInputElement = document.getElementById(
    "file-to-print",
) as HTMLInputElement;
const submitButton = document.getElementById("submit-button");
const uploadedFileName = document.getElementById("file-to-print-label");

// Отображаем название загруженного файла
fileInput.addEventListener("change", (event) => {
    const target = event.target as HTMLInputElement;
    if (target.files.length > 0) {
        if (target.files[0].name.length > 20)
            uploadedFileName.innerText =
                target.files[0].name.substr(0, 17) + "...";
        else uploadedFileName.innerText = target.files[0].name;
    } else {
        uploadedFileName.innerText = "Выберете файл";
    }
});

// Слушатель на кнопку "Отправить файл"
submitButton.onclick = function () {
    if (fileInput.files.length > 0) {
        // Создаем форму с загруженным файлом
        const formData = new FormData();
        formData.append("file", fileInput.files[0]);

        axios
            .post(SERVER_HOST + "/files", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((req) => {
                if (req.status == 201) {
                    document.getElementById("right-content").innerHTML =
                        '<h2 class="right-content_part right-content__title title">Файл отправлен</h2>\n' +
                        '<p class="right-content_part">' +
                        req.data.text +
                        "</p>\n" +
                        '<a class="right-content_part right-content_part__back-to-main-button button" href="">На главную</a>';
                }
            });
    }
};
