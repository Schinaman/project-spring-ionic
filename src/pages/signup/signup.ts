import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeService } from '../../services/domain/cidade.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { EstadoService } from '../../services/domain/estado.service';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController) {

    this.formGroup=this.formBuilder.group({
      name: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      type : ['1', [Validators.required]],
      cpfOuCnpj : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha : ['123', [Validators.required]],
      logradouro : ['Rua Via', [Validators.required]],
      number : ['25', [Validators.required]],
      complement : ['Apto 3', []],
      bairro : ['Copacabana', []],
      cep : ['10828333', [Validators.required]],
      telephone1 : ['977261827', [Validators.required]],
      telefone2 : ['', []],
      telefone3 : ['', []],
      stateId : [null, [Validators.required]],
      cityId : [null, [Validators.required]]      
    });
  }

  ionViewDidLoad(){
    this.estadoService.findAll()
      .subscribe(response=>{
        this.estados=response;
        this.formGroup.controls.stateId.setValue(this.estados[0].id);
        this.updateCidades();
      },
      error => {});
  }

  updateCidades(){
    let estado_id = this.formGroup.value.stateId; //pega o cod do estado selecionado na lista do html do formulario
    this.cidadeService.findAll(estado_id)
      .subscribe(response =>{
        this.cidades = response;
        this.formGroup.controls.cityId.setValue(null);
      },
      error => {});
  }

  signupUser(){
    this.clienteService.insert(this.formGroup.value) //formGroup é qm contem os dados do formulario
      .subscribe(response =>{
        this.showInsertOk();
      },
      error => {});
  }

  showInsertOk(){
    let alert =this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cdastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons:[
        {
          text:'OK',
          handler: () => {
             this.navCtrl.pop(); //desempilha a pagina
          }
        }
      ]
    });
    alert.present();
  }

}
