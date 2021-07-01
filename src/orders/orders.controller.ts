import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Order } from "src/common/entities/order.entity";
import { OrdersService } from "./orders.service";
import { diskStorage } from "multer";
import { editFileName, pdfFileFilter } from "src/utils/fileUpload.util";
import { PrinterWorker } from "src/utils/printerWorker.util";
import { AuthenticatedGuard } from "src/common/guards/authenticated.guard";
import { join } from "path";
import {
    baseFolder,
    filesFolder,
} from "src/common/constants/folderConstants.const";
import { ActiveUserGuard } from "src/common/guards/activeUser.guard";

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

    // @Get(":id")
    // @HttpCode(HttpStatus.OK)
    // findOne(@Param() { id }: FindByIdParams): Promise<User> {
    //     return this.userService.getUserById(Number(id));
    // }
}
