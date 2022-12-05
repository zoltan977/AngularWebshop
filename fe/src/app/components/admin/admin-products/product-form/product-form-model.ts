import { minNumber, required, url } from "@rxweb/reactive-form-validators";

export class ProductFormModel {
    @required()
    title: string = "";

    @required()
    @minNumber({ value: 0 })
    price: string = "";

    @required()
    category: string = "";

    @required()
    @url()
    imageURL: string = "";
}