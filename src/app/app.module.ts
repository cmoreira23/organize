import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule,LOCALE_ID  } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { MenuPage } from '../pages/menu/menu';

import { SQLite } from '@ionic-native/sqlite'
import { DatabaseProvider } from '../providers/database/database';
import { AnotacaoProvider } from '../providers/anotacao/anotacao';
import { LembreteProvider } from '../providers/lembrete/lembrete';
import {  } from '../providers/share-data-service/share-data-service';

@NgModule({
  declarations: [
    MyApp,
    MenuPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MenuPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    DatabaseProvider,
    AnotacaoProvider,
    LembreteProvider,
    
  ]
})
export class AppModule {}
