import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import CategoryModel from "../../models/category/category";

@ValidatorConstraint({ async: true })
export class IsCategoryInProductCategoriesConstraint implements ValidatorConstraintInterface {

    async validate(category: string, args: ValidationArguments): Promise<boolean> {
        const categoryItem = await CategoryModel.findOne({ name: category });

        if (!categoryItem) {
            return Promise.resolve(false);
        }
        return Promise.resolve(true);
    }
}

export const IsCategoryInProductCategories = (validationOptions?: ValidationOptions) => {
    return (object: Object, propertyName: string): void => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCategoryInProductCategoriesConstraint,
        });
    };
};
