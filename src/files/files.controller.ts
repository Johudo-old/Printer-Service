import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Request,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editFileName, pdfFileFilter } from "src/utils/fileUpload.util";
import { AuthenticatedGuard } from "src/common/guards/authenticated.guard";
import { filesFolder } from "src/common/constants/folderConstants.const";
import { ActiveUserGuard } from "src/common/guards/activeUser.guard";
import { FindByIdParams } from "src/utils/findByIdParams";
import { Response } from "express";
import { FilesService } from "./files.service";
import { OrdersService } from "src/orders/orders.service";
import { Order } from "src/common/entities/order.entity";

@Controller("api/files")
export class FilesController {
    constructor(
        private readonly fileService: FilesService,
        private readonly orderService: OrdersService,
    ) {}

    @UseGuards(AuthenticatedGuard, ActiveUserGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: filesFolder,
                filename: editFileName,
            }),
            fileFilter: pdfFileFilter,
        }),
    )
    async createFile(@UploadedFile() file, @Request() req) {
        const resultFile = await this.fileService.createFile(file, req.user);
        return resultFile;
    }

    @UseGuards(AuthenticatedGuard)
    @Get(":id/download")
    async downloadFile(
        @Res() res: Response,
        @Param() { id }: FindByIdParams,
        @Request() req,
    ): Promise<void> {
        if (isNaN(Number(id))) return;

        const file = await this.fileService.getFileById(Number(id));

        if (!file || !(req.user.id === file.user.id || req.user.isAdmin))
            throw new NotFoundException();

        try {
            res.download(file.path, file.originalName);
        } catch {
            throw new NotFoundException();
        }

        return;
    }

    @UseGuards(AuthenticatedGuard)
    @Get(":id/print")
    @HttpCode(HttpStatus.OK)
    async printFile(
        @Param() { id }: FindByIdParams,
        @Request() req,
    ): Promise<Order> {
        if (isNaN(Number(id))) return;

        const file = await this.fileService.getFileById(Number(id));

        if (!file || !(req.user.id === file.user.id || req.user.isAdmin))
            throw new NotFoundException();

        return await this.orderService.createOrder(file);
    }
}
