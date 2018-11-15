import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { timer } from 'rxjs/observable/timer';
import { DatabaseProvider } from '../providers/database/database';

import { MenuPage } from '../pages/menu/menu';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = MenuPage;
  showSplash = true;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, dbProvider: DatabaseProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      dbProvider.createDatabase();
      statusBar.styleBlackOpaque();
       splashScreen.hide();
      timer(3000).subscribe(() => this.showSplash = false)
    });
  }
}

