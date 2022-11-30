import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import UserModel from '../../models/user/user';

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyRegisteredConstraint implements ValidatorConstraintInterface {

    async validate(email: string, args: ValidationArguments): Promise<boolean> {
        const user = await UserModel.findOne({ email });

        if (user) {
            return Promise.resolve(false);
        }
        return Promise.resolve(true);
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
