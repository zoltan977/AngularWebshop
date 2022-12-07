import { FormGroup, NgForm } from "@angular/forms";
import { FormError } from "../errors/formError";

const setFormErrors = (error: FormError, form: NgForm | FormGroup | undefined) => {
    error.originalError.forEach((e: any) => {
        let errorConstraints = {}
        e.constraints.forEach((c: Object) => {
          errorConstraints = Object.assign(errorConstraints, c)
        });
        form?.controls[e.property].setErrors(errorConstraints)
    });
}

export default setFormErrors;