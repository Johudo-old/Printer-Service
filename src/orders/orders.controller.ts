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
import { OrdersService } from "./orders.service";
import { diskStorage } from "multer";
import { editFileName, pdfFileFilter } from "src/utils/fileUpload.util";
import { PrinterWorker } from "src/utils/printerWorker.util";
import { AuthenticatedGuard } from "src/common/guards/authenticated.guard";
import { filesFolder } from "src/common/constants/folderConstants.const";
import { ActiveUserGuard } from "src/common/guards/activeUser.guard";
import { FindByIdParams } from "src/utils/findByIdParams";
import { Response } from "express";

@Controller("api/orders")
export class OrdersController {
    constructor(
        private readonly orderService: OrdersService,
        private readonly printerWorker: PrinterWorker,
    ) {}

    // @Get()
    // @HttpCode(HttpStatus.OK)
    // findAll(): Promise<User[]> {
    //     return this.userService.getAllUsers();
    // }

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
    createOrder(@UploadedFile() file, @Request() req) {
        console.log(file);
        // console.log(req.user);
        this.orderService.createOrder(file, req.user);
        this.printerWorker.printFile(file.path);
        return {};
    }

    @Get(":id/download")
    @HttpCode(HttpStatus.OK)
    async downloadFile(
        @Res() res: Response,
        @Param() { id }: FindByIdParams,
    ): Promise<void> {
        if (isNaN(Number(id))) return;
        const order = await this.orderService.getOrderById(Number(id));
        if (!order) throw new NotFoundException();

        try {
            res.download(order.path, order.originalName);
        } catch {
            throw new NotFoundException();
        }

        return;
    }
}
