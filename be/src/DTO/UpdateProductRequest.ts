import { IsNumber, IsString, IsUrl } from 'class-validator';
import { ErrorMessage } from '../constants/enum/ErrorMessage';
import { IsCategoryInProductCategories } from '../utils/validationDecorator/isCategoryInProductCategories';
import { ProductModelInterface } from '../models/product/product';
export class UpdateProductRequest implements ProductModelInterface {
    @IsString()
    public _id!: string;
    
    @IsString()
    public title!: string;

    @IsNumber(undefined, {message: ErrorMessage.INVALID_NUMBER})
    public price!: number;

    @IsString()
    @IsCategoryInProductCategories({ message: ErrorMessage.NOT_A_VALID_CATEGORY})
    public category!: string;

    @IsUrl(undefined, {message: ErrorMessage.INVALID_URL})
    public imageURL!: string;
}
