import { IsString } from "../utils/myClassValidator";

interface CustomerNameDTOInterface {
    name: string;
}

export class CustomerNameDTO implements CustomerNameDTOInterface {
    
    @IsString()
    public name!: string;
}
