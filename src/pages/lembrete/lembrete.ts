import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, DateTime } from 'ionic-angular';
import { ShareDataServiceProvider } from '../../providers/share-data-service/share-data-service';
import { LembreteProvider } from '../../providers/lembrete/lembrete';
import { Lembrete } from '../../models/lembrete';


/**
 * Generated class for the LembretePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lembrete',
  templateUrl: 'lembrete.html',
})
export class LembretePage {
  lembrete: FormGroup ;
  dataService:ShareDataServiceProvider;
  oldLembrete:Lembrete;

  constructor(public navCtrl: NavController,private toast: ToastController,private lembreteProvider:LembreteProvider, public navParams: NavParams,private formBuilder: FormBuilder) {
    this.lembrete = this.formBuilder.group({
      data: ['', Validators.required],
      horario: ['', Validators.required]
    });
    this.findOldLembrete();
  }
   findOldLembrete(){
    this.dataService=  ShareDataServiceProvider.Instance;
    this.oldLembrete = new Lembrete();
    this.lembreteProvider.getAll();
    if(this.dataService.anotacao.id){
      this.lembreteProvider.get(this.dataService.anotacao.id)
      .then((result: Lembrete) => {
        this.oldLembrete = result;
        this.setform();
      }).catch((e) => console.error(e));
    }
  }
  logForm() {
    let { data, horario } = this.lembrete.controls;
    this.oldLembrete.data = data.value;
    this.oldLembrete.horario = horario.value;
    this.dataService.setLembrete(this.oldLembrete);
    console.log(horario.value);
    this.saveLembrete().then(() => {
      if(!this.dataService.lembrete.id){
        this.lembreteProvider.getLastInsertRowId().then((result:number)=>{
          this.dataService.setLembreteId(result); 
        });
      }
      this.toast.create({ message: 'Lembrete salvo.', duration: 3000, position: 'botton' }).present();
     })
    .catch(() => {
      this.toast.create({ message: 'Erro ao salvar o lembrete.', duration: 3000, position: 'botton' }).present();
    });
    this.navCtrl.pop();
  }
  setform(){
    let { data, horario } = this.lembrete.controls;
    data.setValue( this.oldLembrete.data);
    horario.setValue(this.oldLembrete.horario);
    
  }
 
  saveLembrete(){
    if(this.oldLembrete.id){
      return  this.lembreteProvider.update(this.dataService.lembrete);
    }else{
      return this.lembreteProvider.insert(this.dataService.lembrete);
    }

  }

}
