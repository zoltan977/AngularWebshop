import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { ItemModelInterface } from '../models/cart/cart';
import { ProductDTO } from './ProductDTO';
import { IsInt, IsNumber, IsPositive } from '../utils/myClassValidator';

export class CartItemDTO implements ItemModelInterface {
    
    @IsDefined()
    @ValidateNested()
    @Type(() => ProductDTO)
    public product!: ProductDTO;

    @IsInt()
    @IsPositive()
    public quantity!: number;
}
