import { minNumber, required, url, prop } from "@rxweb/reactive-form-validators";

export class Product {
    @prop()
    _id?: string;

    @required()
    title!: string;

    @required()
    @minNumber({ value: 0 })
    price!: number;

    @required()
    category!: string;

    @required()
    @url()
    imageURL!: string;
}