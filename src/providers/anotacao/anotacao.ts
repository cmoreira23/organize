import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { Anotacao } from '../../models/anotacao';
/*
  Generated class for the AnotacaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AnotacaoProvider {
  constructor(private dbProvider: DatabaseProvider) {
  
  }
  public insert( anotacao: Anotacao) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into anotacao ( titulo, conteudo) values (?, ?)';
        let data = [anotacao.titulo, anotacao.conteudo];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  public update( anotacao: Anotacao) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update anotacao set titulo = ?, conteudo = ?  where id = ?';
        let data = [anotacao.titulo, anotacao.conteudo, anotacao.id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from anotacao where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from anotacao where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let anotacao = new Anotacao();
              anotacao = item;
              return anotacao;
            }
         })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  public getAll() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT  *  FROM anotacao';
          return db.executeSql(sql,null)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let anotacoes: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var anotacao= new Anotacao();
                 anotacao= data.rows.item(i);
                 anotacoes.push(anotacao);
                }
              return anotacoes;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  public insertLembrete(id: number, lembrete_id:number){    
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'update anotacao set lembrete_id = ?  where id = ?';
      let data = [lembrete_id,id];

      return db.executeSql(sql, data)
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }
  public getLastInsertRowId(){
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from anotacao order by id desc ';
        
        return db.executeSql(sql, null)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let anotacao = new Anotacao();
              anotacao = item;
              return anotacao.id;
            }
         })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}
