import {
    Body,
    Controller,
    Get,
    Header,
    HttpCode,
    HttpStatus,
    Param,
    Post,
} from "@nestjs/common";
import { FindByIdParams } from "src/utils/findByIdParams";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

@Controller("api/users")
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto);
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    findOne(@Param() { id }: FindByIdParams): Promise<User> {
        return this.userService.getUserById(Number(id));
    }
}
