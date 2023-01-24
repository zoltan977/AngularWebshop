import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { ToastService } from "angular-toastify";

@Injectable()
export class AppErrorHandler implements ErrorHandler {
    constructor(private _toastService: ToastService, private zone: NgZone) { }

    handleError(error: any): void {
        console.log("Global ErrorHandler: Unexpected error occurred", error);

        this.zone.run(() => this._toastService.error(`Global ErrorHandler: Unexpected error occurred: 
        ${error?.originalError?.message || error?.originalError?.text}`));
    }
}