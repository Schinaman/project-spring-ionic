import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService ) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    console.log(this.clienteService.findBYEmail(localUser.email));
    if (localUser && localUser.email){
      this.clienteService.findBYEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos'] //nesta sintaxe ['enderecos'] o compilador não reclama se o objeto tem enderecos ou nao
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

}
