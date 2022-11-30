import HttpException from '../exceptions/HttpException';
import { StatusCodes } from 'http-status-codes';
import { ErrorMessage } from '../constants/enum/ErrorMessage';

export class DTOValidationException extends HttpException {
    constructor() {
        super(StatusCodes.BAD_REQUEST, ErrorMessage.DTO_VALIDATION_ERROR);
    }
}
