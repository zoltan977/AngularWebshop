import 'reflect-metadata';

import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';

import { ProductModelInterface } from '../models/product/product';
import { IsString } from '../utils/classValidatorWithErrorMessage';
import { ProductDTO } from './ProductDTO';

export interface RemoveCartItemRequestInterface {
    cartId: string;
    product: ProductModelInterface;
}

export class RemoveCartItemRequest implements RemoveCartItemRequestInterface {
    @IsString()
    public cartId!: string;

    @IsDefined()
    @ValidateNested()
    @Type(() => ProductDTO)
    public product!: ProductDTO;
}
