import { FormGroup, NgForm } from '@angular/forms';

import { FormError } from '../errors/formError';

const getControl = (e: any, form: NgForm | FormGroup | undefined) => {
  const propArray = e.property.split('.');
  let control: any;
  let prop = propArray.shift();
  control = form?.controls[prop];
  while(propArray.length) {
    prop = propArray.shift();
    control = control?.controls[prop];
  }

  return control;
}

const setFormErrors = (error: FormError, form1: NgForm | FormGroup | undefined, form2?: NgForm | FormGroup | undefined) => {
    error.originalError.forEach((e: any) => {
        const control1 = getControl(e, form1);
        control1?.setErrors(e.constraints);
        const control2 = getControl(e, form2);
        control2?.setErrors(e.constraints);
    });
}

export default setFormErrors;