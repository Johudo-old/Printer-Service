import { exec } from "child_process";
import path, { join } from "path";
import { baseFolder } from "src/common/constants/folderConstants.const";

export class PrinterWorker {
    constructor() {}

    async printFile(filePath: string) {
        try {
            console.log("lp -d cowork " + filePath);
            exec("lp -d cowork " + filePath);
        } catch (e) {
            console.log("Failed to print file", e);
        }
    }
}
