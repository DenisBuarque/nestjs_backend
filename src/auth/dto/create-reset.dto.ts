import { IsJWT, IsStrongPassword } from "class-validator"

export class CreateResetDto {

    @IsStrongPassword({
        minLength: 6,
        minNumbers: 1,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
    })
    readonly password: string

    @IsJWT()
    token: string
}
