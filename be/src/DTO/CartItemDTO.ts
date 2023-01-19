import { Type } from 'class-transformer';
import { IsDefined, IsNumber, ValidateNested } from 'class-validator';
import { ItemModelInterface } from '../models/cart/cart';
import { ProductDTO } from './ProductDTO';

export class CartItemDTO implements ItemModelInterface {
    
    @IsDefined()
    @ValidateNested()
    @Type(() => ProductDTO)
    public product!: ProductDTO;

    @IsNumber()
    public quantity!: number;
}
