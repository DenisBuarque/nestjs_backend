import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateFileDto {
    @IsString()
    @IsNotEmpty()
    readonly fileName: string

    @IsNumber()
    @IsNotEmpty()
    readonly contentLength: number

    @IsString()
    @IsNotEmpty()
    readonly url: string

    @IsOptional()
    @IsDate()
    readonly createdAt?: Date

    @IsOptional()
    @IsDate()
    updatedAt?: Date
}
