import { ProductModelInterface } from '../models/product/product';
import { IsInt, IsNumber, IsPositive, IsString, IsUrl } from '../utils/myClassValidator';

export class ProductDTO implements ProductModelInterface {
    @IsString()
    public _id!: string;

    @IsString()
    public title!: string;

    @IsInt()
    @IsPositive()
    public price!: number;

    @IsString()
    public category!: string;

    @IsUrl()
    public imageURL!: string;
}
