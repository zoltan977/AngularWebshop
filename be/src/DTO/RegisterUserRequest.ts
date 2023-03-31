import { RegularExpressions } from '../constants/object/regularExpressions';
import { IsEmail, IsString, Matches, MinLength } from '../utils/myClassValidator';
import { IsEmailAlreadyRegistered } from '../utils/validationDecorator/isEmailAlreadyRegistered';

export interface RegisterUserRequestInterface {
    email: string;
    username: string;
    password: string;
}

export class RegisterUserRequest implements RegisterUserRequestInterface {
    @IsEmail()
    @IsEmailAlreadyRegistered()
    public email!: string;

    @IsString()
    public username!: string;

    @IsString()
    @MinLength(8)
    @Matches(RegularExpressions.AT_LEAST_ONE_NUMBER)
    public password!: string;
}
