import { OrderStatusType } from '../constants/enum/OrderStatusType';
import { IsIn, IsString } from '../utils/myClassValidator';

export interface UpdateOrderStatusRequestInterface {
    _id: string;
    newStatus: OrderStatusType;
}

export class UpdateOrderStatusRequest implements UpdateOrderStatusRequestInterface {
    @IsString()
    public _id!: string;
    
    @IsIn([
        OrderStatusType.NEW, 
        OrderStatusType.PICKING, 
        OrderStatusType.PACKED, 
        OrderStatusType.COMPLETED, 
        OrderStatusType.RETURNED, 
        OrderStatusType.CANCELLED
    ])
    public newStatus!: OrderStatusType.NEW | 
    OrderStatusType.PICKING | OrderStatusType.PACKED | 
    OrderStatusType.COMPLETED | OrderStatusType.RETURNED | OrderStatusType.CANCELLED;
}
