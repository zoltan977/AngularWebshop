import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import ProductModel from "../../models/product/product";

@ValidatorConstraint({ async: true })
export class IsProductTitleAlreadyExistConstraint implements ValidatorConstraintInterface {

    async validate(title: string, args: ValidationArguments): Promise<boolean> {
        const product = await ProductModel.findOne({ title });

        if (product) {
            return Promise.resolve(false);
        }
        return Promise.resolve(true);
    }
}

export const IsProductTitleAlreadyExist = (validationOptions?: ValidationOptions) => {
    return (object: Object, propertyName: string): void => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsProductTitleAlreadyExistConstraint,
        });
    };
};
