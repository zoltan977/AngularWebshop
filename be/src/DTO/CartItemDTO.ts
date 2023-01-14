import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';
import { ItemModelInterface } from '../models/cart/cart';
import { ProductDTO } from './ProductDTO';

export class CartItemDTO implements ItemModelInterface {
    
    @ValidateNested()
    @Type(() => ProductDTO)
    public product!: ProductDTO;

    @IsNumber()
    public quantity!: number;
}
