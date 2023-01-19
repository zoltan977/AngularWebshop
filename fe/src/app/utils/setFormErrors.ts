import { FormGroup, NgForm } from "@angular/forms";
import { FormError } from "../errors/formError";

const setFormErrors = (error: FormError, form1: NgForm | FormGroup | undefined, form2?: NgForm | FormGroup | undefined) => {
    error.originalError.forEach((e: any) => {
        let errorConstraints = {}
        e.constraints.forEach((c: Object) => {
          errorConstraints = Object.assign(errorConstraints, c)
        });
        form1?.controls[e.property]?.setErrors(errorConstraints);
        form2?.controls[e.property]?.setErrors(errorConstraints);
    });
}

export default setFormErrors;