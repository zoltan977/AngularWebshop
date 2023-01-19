import { RequestHandler } from 'express';
import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { StatusCodes } from 'http-status-codes';
import HttpException from '../exceptions/HttpException';
import { DTOValidationException } from '../exceptions/DTOValidationException';

const mapErrorConstraintsPropsToFrontendErrorProps: Record<string, string> = {
    isString: "required",
    isEmail: "email",
    isNumber: "number",
    isUrl: "url",
    isArray: "isArray",
    isIn: "isIn",
    isDefined: "isDefined",
    nestedValidation: "nestedValidation",
    objectPropertyError: "objectPropertyError",
    IsEmailAlreadyRegisteredConstraint: "isEmailAlreadyRegistered",
    IsCategoryInProductCategoriesConstraint: "isCategoryInProductCategories",
    IsProductTitleAlreadyExistConstraint: "isProductTitleAlreadyExist",
    IsUserEmailInUserCollectionConstraint: "isUserEmailInUserCollection"
};

const validationMiddleware = (type: any, skipMissingProperties = false, otherValidatorOptions?: Partial<ValidatorOptions>): RequestHandler => {
    return async (req, res, next): Promise<any> => {
        try {
            const errors: ValidationError[] = await validate(plainToInstance(type, req.body), {
                skipMissingProperties,
                forbidUnknownValues: true,
                ...otherValidatorOptions,
            });
            if (errors.length > 0) {
                console.log("Validation errorsArray:", errors)
                const flatErrorsArray = createFlatArrayFromChildErrors(errors);
                console.log("Validation flatErrorsArray: ", flatErrorsArray);

                const message = flatErrorsArray.map((error: ValidationError) => Object.values(error.constraints || {objectPropertyError: `${error.property} error`}).join(", ")).join(', ');
                const data = flatErrorsArray.map((error: ValidationError) => ({
                    property: error.property, 
                    constraints: Object.entries(error.constraints || {objectPropertyError: `${error.property} error`}).map(e => ({[mapErrorConstraintsPropsToFrontendErrorProps[e[0]]]: e[1]})),
                }))

                next(new HttpException(StatusCodes.BAD_REQUEST, message, {errorsInPostedData: data}));
            } else {
                next();
            }
        } catch (e) {
            console.error("DTO validation Error: ", e);
            next(new DTOValidationException());
        }

    };
};

const createFlatArrayFromChildErrors = (errors: ValidationError[]): ValidationError[] => {
    const errorsArray: ValidationError[] = [];

    for (const error of errors) {
        errorsArray.push(error);
        let currentError = error;
        while (currentError.children?.length) {
            currentError = currentError.children.pop() as ValidationError;
            errorsArray.push(currentError as ValidationError);
        }
    }

    return errorsArray;
}

export default validationMiddleware;
