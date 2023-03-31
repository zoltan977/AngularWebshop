import { Type } from 'class-transformer';
import { IsDefined, IsOptional, ValidateNested } from 'class-validator';
import { ProductModelInterface } from '../models/product/product';
import { ProductDTO } from './ProductDTO';
import 'reflect-metadata';
import { IsNumber, IsString } from '../utils/myClassValidator';

export interface AddCartItemRequestInterface {
    cartId?: string;
    product: ProductModelInterface;
    quantity: number;
}

export class AddCartItemRequest implements AddCartItemRequestInterface {
    @IsString()
    @IsOptional()
    public cartId!: string;

    @IsDefined()
    @ValidateNested()
    @Type(() => ProductDTO)
    public product!: ProductDTO;

    @IsNumber()
    public quantity!: number;
}
