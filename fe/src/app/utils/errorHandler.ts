import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { ToastService } from "angular-toastify";
import { CredentialsError } from "../errors/credentialsError";

@Injectable()
export class AppErrorHandler implements ErrorHandler {
    constructor(private toastService: ToastService, private zone: NgZone, private router: Router) { }

    handleError(error: any): void {
        console.log("Global ErrorHandler: Unexpected error occurred", error);
        
        this.zone.run(() => {
            if (error instanceof CredentialsError) {
                this.router.navigate(['/login'], { queryParams: {returnUrl: this.router.routerState.snapshot.url}});
            }
            this.toastService.error(`Global ErrorHandler: Unexpected error occurred: 
            ${error?.originalError?.message || error?.originalError?.text}`)
        });
    }
}