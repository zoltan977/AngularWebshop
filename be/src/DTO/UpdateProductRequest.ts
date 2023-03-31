import { ProductModelInterface } from '../models/product/product';
import { IsInt, IsPositive, IsString, IsUrl } from '../utils/myClassValidator';
import { IsCategoryInProductCategories } from '../utils/validationDecorator/isCategoryInProductCategories';

export class UpdateProductRequest implements ProductModelInterface {
    @IsString()
    public _id!: string;
    
    @IsString()
    public title!: string;

    @IsInt()
    @IsPositive()
    public price!: number;

    @IsString()
    @IsCategoryInProductCategories()
    public category!: string;

    @IsUrl()
    public imageURL!: string;
}
