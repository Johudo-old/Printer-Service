var formElement = document.getElementById("file-form");
var fileInputElement = document.getElementById("file-input");
var labelElement = document.getElementById("file-input-label");
var labeTextElement = labelElement.getElementsByTagName("span")[0];
var submitButtonElement = labelElement.getElementsByTagName("button")[0];

var droppedFile: File;

var acceptedFileTypes = ["application/pdf"];

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
    var currentDroppedFile = event.dataTransfer.files[0];

    if (!currentDroppedFile) return;

    // Разрешен ли тип файла
    var isAcceptedType = false;

    for (var i = 0; i < acceptedFileTypes.length; i++) {
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
    console.log(droppedFile);
});
