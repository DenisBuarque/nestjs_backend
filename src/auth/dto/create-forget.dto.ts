import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateForgetDto {

    @IsNotEmpty()
    @IsEmail()
    readonly email: string
}
