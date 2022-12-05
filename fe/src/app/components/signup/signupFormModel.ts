import { compare, email, password, required } from "@rxweb/reactive-form-validators"

export class SignUpFormModel {
    @required()
    username: string = ""

    @required()
    @email()
    email: string = ""

    @required()
    @password({validation:{minLength: 8,digit: true} })
    password: string = ""

    @required()
    @compare({ fieldName: "password" })
    confirmPassword: string = ""
}