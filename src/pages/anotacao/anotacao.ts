import { Component } from '@angular/core';
import {Anotacao} from '../../models/anotacao';
import { IonicPage, NavController, NavParams ,ToastController ,Platform,AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { LembretePage } from '../lembrete/lembrete';
import {AnotacaoProvider} from '../../providers/anotacao/anotacao';
import { HomePage } from '../home/home';
import { ShareDataServiceProvider } from '../../providers/share-data-service/share-data-service';


/**
 * Generated class for the AnotacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-anotacao',
  templateUrl: 'anotacao.html',
})
export class AnotacaoPage {
  rootPage = 'AnotacaoPage';
  nota : Anotacao;
  private anotacao: FormGroup ;
  dataService:ShareDataServiceProvider;

  constructor(public navCtrl: NavController,  private toast: ToastController,public navParams: NavParams,
    private formBuilder: FormBuilder,private anotacaoProvider: AnotacaoProvider,
    public alertCtrl: AlertController,
    public platform: Platform) {
      this.anotacao = this.formBuilder.group({
        titulo: ['', Validators.required],
        conteudo: [''],
      });
      this.nota = new Anotacao;
      if (this.navParams.data.id) {
        this.anotacaoProvider.get(this.navParams.data.id)
          .then((result: any) => {
            this.nota = result;
            this.setform();
          })
      }
    }
    logForm() {
    let { titulo, conteudo } = this.anotacao.controls;
    this.nota.titulo=titulo.value;
    this.nota.conteudo= conteudo.value;

    this.saveAnotacao().then(() => {
        if(!this.nota.id){
          this.anotacaoProvider.getLastInsertRowId().then((result:number)=>{
            this.nota.id=result;  
            this.saveLembrete();
          });
        }else{
          this.saveLembrete();
        }
       
        this.toast.create({ message: 'Anotação salva.', duration: 3000, position: 'botton' }).present();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar anotação.', duration: 3000, position: 'botton' }).present();
      });
      
      this.navCtrl.popTo(HomePage);
    }
  addLembrete() {
    let { titulo, conteudo } = this.anotacao.controls;
    this.dataService= ShareDataServiceProvider.Instance;
    this.dataService.setAnotacao(this.nota.id,titulo,conteudo);
    this.navCtrl.push('LembretePage');
  }
  saveLembrete(){
    if(this.dataService){
      this.anotacaoProvider.insertLembrete(this.nota.id,this.dataService.lembrete.id);
      this.saveNotification();
    }
  }
  private saveAnotacao() {
    if (this.nota.id ) {
     return this.anotacaoProvider.update(this.nota);
    } else {
     return this.anotacaoProvider.insert(this.nota);
    }
  }
  setform(){
    let { titulo, conteudo } = this.anotacao.controls;
    titulo.setValue( this.nota.titulo);
    conteudo.setValue(this.nota.conteudo);
  }
  saveNotification(){}
  
}
