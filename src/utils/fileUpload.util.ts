import { extname } from "path";

export const pdfFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(pdf)$/)) {
        return callback(new Error("Only PDF files are allowed!"), false);
    }
    callback(null, true);
};

export const editFileName = (req, file, callback) => {
    const fileExtName = extname(file.originalname);
    callback(null, "file-" + new Date().getTime() + fileExtName);
};
