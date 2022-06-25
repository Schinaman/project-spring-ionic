import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';


@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  pedido: PedidoDTO;
  parcelas: number[] = [1,2,3,4,5,6,7,8,9,10];
  formGroup: FormGroup;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

      console.log("NAV PARAMS: ");
      console.log(this.navParams.get('pedido'));
    this.pedido = this.navParams.get('pedido'); //recupera pedido do push em pickaddress.nextPage
    console.log(this.pedido);
    this.formGroup = this.formBuilder.group({
      numberOfParcels: [1, Validators.required],
      "@type": ["pagamentoComCartao", Validators.required]
    })
  }

  nextPage(){
    console.log("formGroup.value: ");
    console.log(this.formGroup.controls['@type'].value);
    console.log(this.formGroup.controls['numberOfParcels'].value);
    this.pedido.payment['@type'] = this.formGroup.controls['@type'].value;
    this.pedido.payment['numberOfParcels'] = this.formGroup.controls['numberOfParcels'].value;
    //this.pedido = this.formGroup.value;
    console.log("PEDIDO PAYMENT: ");
    console.log(this.pedido);
    this.navCtrl.setRoot('OrderConfirmationPage', {pedido: this.pedido});
  }

}
