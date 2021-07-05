import { exec } from "child_process";

export function printFile(filePath: string) {
    try {
        console.log("lp -d cowork " + filePath);
        exec("lp -d cowork " + filePath);
    } catch (e) {
        console.log("Failed to print file", e);
    }
}
