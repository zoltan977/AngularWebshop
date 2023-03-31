import { IsString } from "../utils/myClassValidator";

interface DeliveryAddressDTOInterface {
    address: string;
    city: string;
}

export class DeliveryAddressDTO implements DeliveryAddressDTOInterface {
    
    @IsString()
    public address!: string;

    @IsString()
    public city!: string;
}
