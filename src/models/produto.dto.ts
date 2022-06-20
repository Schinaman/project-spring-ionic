import { PickerController } from "ionic-angular";

export interface ProdutoDTO{
    id:string;
    name: string;
    price: number;
    imageUrl?: string;
}