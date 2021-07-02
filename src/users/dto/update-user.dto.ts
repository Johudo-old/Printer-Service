import { IsBoolean, IsNotEmpty, IsString, Length } from "class-validator";

export class UpdateUserDto {
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

    @IsBoolean()
    @IsNotEmpty()
    readonly isActive: boolean;

    @IsBoolean()
    @IsNotEmpty()
    readonly isAdmin: boolean;
}
