import 'reflect-metadata';

import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';

import { ProductModelInterface } from '../models/product/product';
import { IsInt, IsPositive, IsString } from '../utils/myClassValidator';
import { ProductDTO } from './ProductDTO';

export interface RemoveCartItemRequestInterface {
    cartId: string;
    product: ProductModelInterface;
    quantity: number;
}

export class RemoveCartItemRequest implements RemoveCartItemRequestInterface {
    @IsString()
    public cartId!: string;

    @IsDefined()
    @ValidateNested()
    @Type(() => ProductDTO)
    public product!: ProductDTO;

    @IsInt()
    @IsPositive()
    public quantity!: number;
}
