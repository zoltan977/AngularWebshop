import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import UserModel from "../../models/user/user";
import { ErrorMessage } from "../../constants/object/ErrorMessage";

@ValidatorConstraint({ async: true })
export class IsUserEmailInUserCollectionConstraint implements ValidatorConstraintInterface {

    async validate(userEmail: string, args: ValidationArguments): Promise<boolean> {
        const userItem = await UserModel.findOne({email: userEmail});

        if (!userItem) {
            return Promise.resolve(false);
        }
        return Promise.resolve(true);
    }

    defaultMessage(validationArguments: ValidationArguments): string {
        return ErrorMessage.NOT_A_VALID_USER;
    }
}

export const IsUserEmailInUserCollection = (validationOptions?: ValidationOptions) => {
    return (object: Object, propertyName: string): void => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUserEmailInUserCollectionConstraint,
        });
    };
};
