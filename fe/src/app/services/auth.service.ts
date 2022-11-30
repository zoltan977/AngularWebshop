import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AppError } from '../errors/appError';
import { FormError } from '../errors/formError';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CredentialsError } from '../errors/credentialsError';
import { StatusCodes } from 'http-status-codes';

interface ITokenResponse {
  token: string;
}

interface ICurrentUser {
  user: {
    username: string;
    email: string;
    photo: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly PATH = "http://localhost:5000/auth"

  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) { 
  }
  
  get userLoggedIn(): boolean {
    return !this.jwtHelper.isTokenExpired();
  }
  
  get currentUser(): ICurrentUser | undefined {
    return this.jwtHelper.decodeToken();
  }

  login(loginData: any): Observable<AppError | FormError | ITokenResponse> {
    const response = this.httpClient.post<ITokenResponse>(this.PATH + "/login", loginData);

    return response.pipe(
      tap((data: ITokenResponse) => {
        console.log("logged in: ", data.token);
        this.setToken(data.token);
      }),
      catchError(this.authErrorHandler)
    );
  }

  signUp(signUpData: any): Observable<AppError | FormError | ITokenResponse> {
    const response = this.httpClient.post<ITokenResponse>(this.PATH + "/signup", signUpData);

    return response.pipe(
      tap((data: ITokenResponse) => {
        console.log("signed up: ", data.token);
        this.setToken(data.token)
      }),
      catchError(this.authErrorHandler)
    );
  }

  logout() {
    this.deleteToken()
  }

  private setToken(token: string): void {
    localStorage.setItem("token", token)
  }

  private deleteToken(): void {
    localStorage.removeItem("token")
  }

  private authErrorHandler(error: HttpErrorResponse) {
    console.log("service error: ", error)
    if (error.error?.data?.errorsInPostedData && error.status === StatusCodes.BAD_REQUEST) {
      return throwError(() => new FormError(error.error.data.errorsInPostedData));
    } else if (error.status === StatusCodes.UNAUTHORIZED) {
      return throwError(() => new CredentialsError(error.error))
    }
    return throwError(() => new AppError(error.error));
  }

}
