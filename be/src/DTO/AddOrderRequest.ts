import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { ErrorMessage } from '../constants/enum/ErrorMessage';
import { IsUserEmailInUserCollection } from '../utils/validationDecorator/isUserEmailInUserCollection';
import { CartDTO } from './CartDTO';

export interface AddOrderRequestInterface {
    name: string;
    address: string;
    city: string;
    cart: CartDTO;
    userEmail: string;
}

export class AddOrderRequest implements AddOrderRequestInterface {
    @IsString()
    public name!: string;

    @IsString()
    public address!: string;

    @IsString()
    public city!: string;

    @ValidateNested()
    @Type(() => CartDTO)
    public cart!: CartDTO;

    @IsString()
    @IsUserEmailInUserCollection({ message: ErrorMessage.NOT_A_VALID_USER})
    public userEmail!: string;
}
