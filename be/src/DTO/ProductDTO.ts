import { IsNumber, IsString, IsUrl } from 'class-validator';
import { ErrorMessage } from '../constants/enum/ErrorMessage';
import { ProductModelInterface } from '../models/product/product';

export class ProductDTO implements ProductModelInterface {
    @IsString()
    public _id!: string;

    @IsString()
    public title!: string;

    @IsNumber()
    public price!: number;

    @IsString()
    public category!: string;

    @IsUrl(undefined, {message: ErrorMessage.INVALID_URL})
    public imageURL!: string;
}
