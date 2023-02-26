import { HttpErrorResponse } from "@angular/common/http";
import { StatusCodes } from "http-status-codes";
import { Observable, throwError } from "rxjs";
import { AppError } from "../errors/appError";
import { CredentialsError } from "../errors/credentialsError";
import { FormError } from "../errors/formError";

const serviceErrorHandler = (error: HttpErrorResponse): Observable<AppError | FormError | CredentialsError> => {
    console.log("service error: ", error)
    if (error.error?.data?.errorsInPostedData && error.status === StatusCodes.BAD_REQUEST) {
      return throwError(() => new FormError(error.error.data.errorsInPostedData));
    } else if (error.status === StatusCodes.UNAUTHORIZED) {
      return throwError(() => new CredentialsError(error.error))
    }
    return throwError(() => new AppError(error.error));
}

export default serviceErrorHandler;