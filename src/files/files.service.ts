import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/common/entities/user.entity";
import { Repository } from "typeorm";
import { join } from "path";
import { getFilePagesCount } from "src/utils/fileUpload.util";
import { File } from "src/common/entities/file.entity";
import { OrdersService } from "src/orders/orders.service";
import { formatDatabaseDate } from "src/utils/formatDatabaseDate";

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(File)
        private readonly filesRepository: Repository<File>,
        private readonly ordersService: OrdersService,
    ) {}

    async createFile(file: any, user: User): Promise<File> {
        const newFile = await this.filesRepository.save({
            originalName: file.originalname,
            path: file.destination + "/" + file.filename,
            createDate: new Date(),
            user: user,
            pages: getFilePagesCount(join(file.destination, file.filename)),
        });

        this.ordersService.createOrder(newFile);
        return newFile;
    }

    async getFilesByUserId(
        user: User,
        formatDate: boolean = false,
    ): Promise<File[]> {
        const filesList = await this.filesRepository.find({ user });

        if (!formatDate) return filesList;

        return this.formatFilesDate(filesList) as any;
    }

    async getAllFiles(formatDate: boolean = false): Promise<File[]> {
        const filesList = await this.filesRepository.find({
            relations: ["user"],
        });

        if (!formatDate) return filesList;

        return this.formatFilesDate(filesList) as any;
    }

    async getFileById(fileID: number): Promise<File> {
        const file = await this.filesRepository.findOne(fileID, {
            relations: ["user"],
        });

        if (!file)
            throw new HttpException(
                { message: "This file was not found" },
                HttpStatus.NO_CONTENT,
            );

        return file;
    }

    formatFilesDate(filesList: File[]) {
        return filesList.map((file) => {
            return {
                ...file,
                createDate: formatDatabaseDate(file.createDate),
            };
        });
    }
}
