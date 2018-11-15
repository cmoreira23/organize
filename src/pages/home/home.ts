import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, AlertController } from 'ionic-angular';
import {AnotacaoProvider} from '../../providers/anotacao/anotacao';
import {Anotacao} from '../../models/anotacao';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  rootPage = 'HomePage';
  anotacoes: Anotacao[] = []; 
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl : AlertController, private toast: ToastController,private anotacaoProvider: AnotacaoProvider) {
    this.getAllProducts() ;
  }
  ionViewWillEnter(){
   this.getAllProducts();
  }
  getAllProducts() {
    this.anotacaoProvider.getAll()
      .then((result: Anotacao[]) => {
        this.anotacoes = result;
      }).catch((e) => console.error(e));
  }
  create( tipo : any) {
    this.navCtrl.push(tipo);
  }
  editAnotacao(id: number){
     this.navCtrl.push('AnotacaoPage', { id: id });
  }
  remove(anotacao:Anotacao){
    let alert = this.alertCtrl.create({
      title: 'Deletar',
      message: 'Você tem certerza que deseja deletar ?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.anotacaoProvider.remove(anotacao.id)
            .then(() => {
              var index = this.anotacoes.indexOf(anotacao);
              this.anotacoes.splice(index, 1);
              this.toast.create({ message: 'Anotação removida.', duration: 3000, position: 'botton' }).present();
            })
          }
        }
      ]
    });
    alert.present();
 
  }
}
