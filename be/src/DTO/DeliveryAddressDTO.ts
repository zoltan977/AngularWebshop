import { IsString } from "class-validator";

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
