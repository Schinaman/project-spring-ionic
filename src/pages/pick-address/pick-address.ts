import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];
  pedido: PedidoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public cartService: CartService ) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['addresses']; //nesta sintaxe ['enderecos'] o compilador não reclama se o objeto tem enderecos ou nao. em vez de buscar do DTO busca da BD ("addresses").
          
          let cart = this.cartService.getCart();
          this.pedido = {
            client: {id:response['id']},
            addressDelivery: null,
            payment: {numberOfParcels: 1, '@type': "pagamentoComCartao"}, //não estava conseguindo atribuir valor enquanto era null, então padrao de compra passou a ser este com instanciacao
            items: cart.items.map(x => {return {quantity: x.quantity, product: {id: x.produto.id}}})
          }
        },
        error => {
          if (error.status==403){
            this.navCtrl.setRoot('HomePage');
          }
        });   
    }
    else{
      this.navCtrl.setRoot('HomePage');
    }
  }

  nextPage(item: EnderecoDTO) {
    this.pedido.addressDelivery = {id: item.id};
    console.log('PEDIDO PICK ADDRESS: ');
    console.log(this.pedido);
    console.log({pedido: this.pedido});
    this.navCtrl.push('PaymentPage', {pedido: this.pedido});
  }
}
