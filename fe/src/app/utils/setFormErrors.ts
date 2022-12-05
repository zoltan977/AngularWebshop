import { FormGroup, NgForm } from "@angular/forms";
import { FormError } from "../errors/formError";

const setFormErrors = (error: FormError, form: NgForm | FormGroup | undefined) => {
    error.originalError.forEach((e: any) => {
        e.constraints.forEach((c: Object) => {
          form?.controls[e.property].setErrors(c)
        });
    });
}

export default setFormErrors;