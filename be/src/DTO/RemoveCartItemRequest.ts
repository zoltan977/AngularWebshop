import { Type } from 'class-transformer';
import { IsDefined, IsNumber, IsString, ValidateNested } from 'class-validator';
import { ProductModelInterface } from '../models/product/product';
import { ProductDTO } from './ProductDTO';
import 'reflect-metadata';

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

    @IsNumber()
    public quantity!: number;
}
