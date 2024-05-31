import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator"

export class CreateAuthDto {

    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @IsStrongPassword({
        minLength: 6,
        minNumbers: 1,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
    })
    readonly password: string
}
