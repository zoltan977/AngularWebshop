import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ProductModelInterface } from '../models/product/product';
import { ProductDTO } from './ProductDTO';
import 'reflect-metadata';

export interface AddCartItemRequestInterface {
    cartId?: string;
    product: ProductModelInterface;
    quantity: number;
}

export class AddCartItemRequest implements AddCartItemRequestInterface {
    @IsString()
    @IsOptional()
    public cartId!: string;

    @ValidateNested()
    @Type(() => ProductDTO)
    public product!: ProductDTO;

    @IsNumber()
    public quantity!: number;
}
