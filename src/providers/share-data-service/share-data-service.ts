import { Injectable } from '@angular/core';
import {Anotacao} from '../../models/anotacao';
import {Lembrete} from '../../models/lembrete';

/*
  Generated class for the ShareDataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShareDataServiceProvider {
  anotacao : Anotacao;
  lembrete :Lembrete;
  private static _instance;
  
  public static get Instance(){
     return this._instance || (this._instance = new this());
  }

  private constructor() {
      this.anotacao = new Anotacao;
      this.lembrete = new Lembrete;
     
  }
  setAnotacao(id,titulo, conteudo) {
    this.anotacao.id = id;
    this.anotacao.titulo = titulo;
    this.anotacao.conteudo = conteudo;       
  }

   setLembrete(lembrete){
    this.lembrete= lembrete;

  }
 setLembreteId(id){
   this.lembrete.id= id;
 }
 

}

