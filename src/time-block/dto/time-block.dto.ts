import { IsNumber, IsOptional, IsString } from "class-validator"

export class TimeBlockDto {
    @IsString()
    title:string

    @IsString()
    @IsOptional()
    color?:string

    @IsString()
    duration:string

    @IsNumber()
    @IsOptional()
    order?:number

}
