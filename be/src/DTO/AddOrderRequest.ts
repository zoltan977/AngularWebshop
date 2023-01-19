import { Type } from 'class-transformer';
import { IsIn, IsString, ValidateNested, IsDefined } from 'class-validator';
import { DeliveryMethodType } from '../constants/enum/DeliveryMethodType';
import { ErrorMessage } from '../constants/enum/ErrorMessage';
import { PaymentMethodType } from '../constants/enum/PaymentMethodType';
import { OrderModelInterface } from '../models/order/order';
import { IsUserEmailInUserCollection } from '../utils/validationDecorator/isUserEmailInUserCollection';
import { CartDTO } from './CartDTO';

export interface OrderModelWithoutDateInterface extends Omit<OrderModelInterface, "dateCreated" | "_id"> {
}

export class AddOrderRequest implements OrderModelWithoutDateInterface {
    @IsString()
    public name!: string;

    @IsString()
    public address!: string;

    @IsString()
    public city!: string;

    @IsDefined()
    @ValidateNested()
    @Type(() => CartDTO)
    public cart!: CartDTO;

    @IsString()
    @IsUserEmailInUserCollection({ message: ErrorMessage.NOT_A_VALID_USER})
    public userEmail!: string;

    @IsIn([DeliveryMethodType.CLICK_AND_COLLECT, DeliveryMethodType.HOME_DELIVERY, DeliveryMethodType.LOCKER_DELIVERY])
    public deliveryMethod!: DeliveryMethodType.CLICK_AND_COLLECT | DeliveryMethodType.HOME_DELIVERY | DeliveryMethodType.LOCKER_DELIVERY;

    @IsIn([PaymentMethodType.BANK_TRANSFER, PaymentMethodType.CASH, PaymentMethodType.CREDIT_CARD])
    public paymentMethod!: PaymentMethodType.BANK_TRANSFER | PaymentMethodType.CASH | PaymentMethodType.CREDIT_CARD;
}
