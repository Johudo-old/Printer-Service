import { extname } from "path";
import * as fs from "fs";

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

export const getFilePagesCount = (filePath): number => {
    const data = fs.readFileSync(filePath, "utf8");
    return data.match(/\/Type[\s]*\/Page[^s]/g).length;
};
