import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { AppError } from '../../errors/appError';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SignUpFormModel } from '../../membership/components/signup/signupFormModel';
import serviceErrorHandler from '../../utils/serviceErrorHandler';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAccountService } from '../../membership/services/user-account.service';

interface ITokenResponse {
  token: string;
}

interface ICurrentUser {
  user: {
    username: string;
    email: string;
    photo: string;
    admin: boolean;
  }
}

@Injectable()
export class AuthService {
  private readonly PATH = "http://localhost:5000/auth"

  constructor(private httpClient: HttpClient, 
              private jwtHelper: JwtHelperService,
              private route: ActivatedRoute,
              private router: Router,
              private userAccountService: UserAccountService) { 
  }
  
  get userLoggedIn(): boolean {
    return !this.jwtHelper.isTokenExpired();
  }
  
  get currentUser(): ICurrentUser | undefined {
    return this.userLoggedIn ? this.jwtHelper.decodeToken() : undefined;
  }

  login(loginData: any): Observable<AppError | ITokenResponse> {
    const response = this.httpClient.post<ITokenResponse>(this.PATH + "/login", loginData);

    return response.pipe(
      tap((data: ITokenResponse) => {
        console.log("logged in: ", data.token);
        this.setToken(data.token);
        this.userAccountService.getByUser().subscribe({
            complete: this.navigateToTheReturnUrl
          });
      }),
      catchError(serviceErrorHandler)
    );
  }

  signUp(signUpData: SignUpFormModel): Observable<AppError | ITokenResponse> {
    const response = this.httpClient.post<ITokenResponse>(this.PATH + "/signup", signUpData);

    return response.pipe(
      tap((data: ITokenResponse) => {
        console.log("signed up: ", data.token);
        this.setToken(data.token)
        this.navigateToHomePage()
      }),
      catchError(serviceErrorHandler)
    );
  }

  logout() {
    this.deleteToken()
    this.navigateToHomePage()
  }

  private setToken(token: string): void {
    localStorage.setItem("token", token)
  }

  private deleteToken(): void {
    localStorage.removeItem("token")
  }

  private navigateToTheReturnUrl = () => {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    console.log("returnUrl: ", returnUrl)
    this.router.navigateByUrl(returnUrl)
  }

  private navigateToHomePage = () => {
    this.router.navigate(['/'])
  }
}
