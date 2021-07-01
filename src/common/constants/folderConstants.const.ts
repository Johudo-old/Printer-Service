import { join } from "path";

export const baseFolder = join(__dirname, "..", "..", "..", "..");
export const mediaFolder = join(baseFolder, "media");
export const staticFolder = join(baseFolder, "static");
export const viewFolder = join(baseFolder, "views");
export const filesFolder = join(mediaFolder, "uploaded-files");
