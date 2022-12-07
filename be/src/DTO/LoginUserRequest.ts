import { IsEmail, IsString } from 'class-validator';
import { ErrorMessage } from '../constants/enum/ErrorMessage';

export interface LoginUserRequestInterface {
    email: string;
    password: string;
}

export class LoginUserRequest implements LoginUserRequestInterface {
    @IsEmail(undefined, {message: ErrorMessage.INVALID_EMAIL})
    public email!: string;

    @IsString()
    public password!: string;
}
