import { IsEmail, IsString } from 'class-validator';
import { IsEmailAlreadyRegistered } from '../utils/validationDecorator/isEmailAlreadyRegistered';
import { ErrorMessage } from '../constants/enum/ErrorMessage'

export interface RegisterUserRequestInterface {
    email: string;
    username: string;
    password: string;
}

export class RegisterUserRequest implements RegisterUserRequestInterface {
    @IsEmail()
    @IsEmailAlreadyRegistered({ message: ErrorMessage.USER_EMAIL_ALREADY_EXISTS })
    public email!: string;

    @IsString()
    public username!: string;

    @IsString()
    public password!: string;
}
