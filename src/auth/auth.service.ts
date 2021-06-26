import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService, // private jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.getUserByUsername(username);

        if (!user || user.password !== password)
            throw new HttpException(
                { message: "This user was not found" },
                HttpStatus.NO_CONTENT,
            );

        const { password: _password, ...result } = user;
        return result;
    }
}
