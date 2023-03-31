import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import UserModel from '../../models/user/user';
import { ErrorMessage } from "../../constants/object/ErrorMessage";

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyRegisteredConstraint implements ValidatorConstraintInterface {

    async validate(email: string, args: ValidationArguments): Promise<boolean> {
        const user = await UserModel.findOne({ email });

        if (user) {
            return Promise.resolve(false);
        }
        return Promise.resolve(true);
    }

    defaultMessage(validationArguments: ValidationArguments): string {
        return ErrorMessage.USER_EMAIL_ALREADY_EXISTS;
    }
}

export const IsEmailAlreadyRegistered = (validationOptions?: ValidationOptions) => {
    return (object: Object, propertyName: string): void => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailAlreadyRegisteredConstraint,
        });
    };
};
