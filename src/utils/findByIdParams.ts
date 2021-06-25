import { IsNumberString } from "class-validator";

export class FindByIdParams {
    @IsNumberString()
    id: string;
}
