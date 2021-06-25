import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const foundUser = await this.usersRepository.findOne({
            username: createUserDto.username,
        });

        if (foundUser)
            throw new HttpException(
                { message: "Username has already used" },
                HttpStatus.BAD_REQUEST,
            );

        const newUser = await this.usersRepository.save(createUserDto);
        return newUser;
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.usersRepository.find();
        return users;
    }

    async getUserById(userId: number): Promise<User> {
        const user = await this.usersRepository.findOne(userId);

        if (!user)
            throw new HttpException(
                { message: "This user was not found" },
                HttpStatus.NO_CONTENT,
            );

        return user;
    }
}
