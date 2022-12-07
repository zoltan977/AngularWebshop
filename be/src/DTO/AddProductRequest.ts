import { IsNumber, IsString, IsUrl } from 'class-validator';
import { ErrorMessage } from '../constants/enum/ErrorMessage';
import { IsCategoryInProductCategories } from '../utils/validationDecorator/isCategoryInProductCategories';
import { IsProductTitleAlreadyExist } from '../utils/validationDecorator/isProductTitleAlreadyExist';

export interface AddProductRequestInterface {
    title: string;
    price: number;
    category: string;
    imageURL: string;
}

export class AddProductRequest implements AddProductRequestInterface {
    @IsString()
    @IsProductTitleAlreadyExist({ message: ErrorMessage.PRODUCT_TITLE_ALREADY_EXISTS })
    public title!: string;

    @IsNumber(undefined, {message: ErrorMessage.INVALID_NUMBER})
    public price!: number;

    @IsString()
    @IsCategoryInProductCategories({ message: ErrorMessage.NOT_A_VALID_CATEGORY})
    public category!: string;

    @IsUrl(undefined, {message: ErrorMessage.INVALID_URL})
    public imageURL!: string;
}
