import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "../common/entities/user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";

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

    async updateUser(
        userID: number,
        updateUserDto: UpdateUserDto,
    ): Promise<any> {
        const updatedUser = await this.usersRepository.update(
            {
                id: userID,
            },
            updateUserDto,
        );

        return await this.getUserById(userID);
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

    async getUserByUsername(username: string): Promise<User> {
        const user = await this.usersRepository.findOne({
            username,
        });

        if (!user)
            throw new HttpException(
                { message: "This user was not found" },
                HttpStatus.NO_CONTENT,
            );

        return user;
    }
}
