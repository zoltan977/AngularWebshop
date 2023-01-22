import { IsString } from "class-validator";

interface CustomerNameDTOInterface {
    name: string;
}

export class CustomerNameDTO implements CustomerNameDTOInterface {
    
    @IsString()
    public name!: string;
}
