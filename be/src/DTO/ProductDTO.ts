import { IsNumber, IsString } from 'class-validator';

export class ProductDTO {
    @IsString()
    public _id!: string;

    @IsString()
    public title!: string;

    @IsNumber()
    public price!: number;

    @IsString()
    public category!: string;

    @IsString()
    public imageURL!: string;
}
