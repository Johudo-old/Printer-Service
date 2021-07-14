import { exec } from "child_process";
import { promisify } from "util";

const asyncExec = promisify(exec);

export async function printFile(
    filePath: string,
    printerName: string,
): Promise<string> {
    console.log("lp -d " + printerName + " " + filePath);

    try {
        const { stdout, stderr } = await asyncExec(
            "lp -d " + printerName + " " + filePath,
        );

        return stdout || stderr;
    } catch (e) {
        return e.stderr;
    }
}

export async function cancelPrintFile(
    taskId: string,
    printerName: string,
): Promise<string> {
    console.log("lprm -P " + printerName + " " + taskId);

    try {
        const { stdout, stderr } = await asyncExec(
            "lprm -P " + printerName + " " + taskId,
        );

        return stdout || stderr;
    } catch (e) {
        return e.stderr;
    }
}

export async function listPrintingFiles(): Promise<string> {
    console.log("lpstat");

    try {
        const { stdout, stderr } = await asyncExec("lpstat");

        return stdout || stderr;
    } catch (e) {
        return e.stderr;
    }
}
