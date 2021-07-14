import { IsBoolean, IsNotEmpty, IsString, Length } from "class-validator";
import { OrderStatus } from "src/common/enums/orderStatuses.enum";

export class UpdateOrderDto {
    @IsBoolean()
    @IsNotEmpty()
    readonly status: OrderStatus;
}
