import { IsEmail, IsString } from 'class-validator';

export interface LoginUserRequestInterface {
    email: string;
    password: string;
}

export class LoginUserRequest implements LoginUserRequestInterface {
    @IsEmail()
    public email!: string;

    @IsString()
    public password!: string;
}
