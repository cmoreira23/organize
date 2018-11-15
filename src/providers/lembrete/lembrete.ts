import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { Lembrete } from '../../models/lembrete';
import { SQLiteObject } from '@ionic-native/sqlite';
/*
  Generated class for the LembreteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LembreteProvider {
  constructor(private dbProvider: DatabaseProvider) {
  }
  public insert( lembrete: Lembrete) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into lembrete ( data, horario) values ( ?, ?)';
        let data = [lembrete.data,lembrete.horario];
        return db.executeSql(sql, data).catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public update( lembrete: Lembrete) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update lembrete set data = ?, horario = ?  where id = ?';
        let data = [lembrete.data, lembrete.horario,  lembrete.id];
        return db.executeSql(sql, data).catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from lembrete where id = ?';
        let data = [id];
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  public getAll() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT  *  FROM lembrete';
          return db.executeSql(sql,null)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let lembretes: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                let lembrete = new Lembrete();
                lembrete = data.rows.item(i);
                lembretes.push(lembrete);
              }
              return lembretes;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  public getLastInsertRowId(){
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from lembrete order by id desc ';
        return db.executeSql(sql, null)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let lembrete = new Lembrete();
              lembrete = item;
              return lembrete.id;
            }
         })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select lembrete.* from lembrete join anotacao on lembrete.id = anotacao.lembrete_id  where anotacao.id = ?;';
        let data = [id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let lembrete = new Lembrete();
              lembrete = item;
              return lembrete;
            }else{
              return new Lembrete();
            }
         })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  
}
