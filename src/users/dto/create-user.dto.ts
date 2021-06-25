import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsString()
    @Length(4, 32)
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @IsString()
    @Length(8)
    @IsNotEmpty()
    readonly password: string;
}
