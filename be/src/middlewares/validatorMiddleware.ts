import { RequestHandler } from 'express';
import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { StatusCodes } from 'http-status-codes';
import HttpException from '../exceptions/HttpException';
import { DTOValidationException } from '../exceptions/DTOValidationException';

const mapDTOPropsToFrontendErrorProps: Record<string, string> = {
    isString: "required",
    isEmail: "email",
    IsEmailAlreadyRegisteredConstraint: "isEmailAlreadyRegistered"
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
                console.log("Validation errors:", errors)
                const message = errors.map((error: ValidationError) => Object.values(error.constraints || {}).join(", ")).join(', ');
                const data = errors.map((error: ValidationError) => ({
                    property: error.property, 
                    constraints: Object.entries(error.constraints || {}).map(e => ({[mapDTOPropsToFrontendErrorProps[e[0]]]: e[1]}))
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

export default validationMiddleware;
