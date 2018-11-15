import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';

export interface PageInterface {
  title: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  rootPage = 'HomePage';
  platform;
  pages: PageInterface[] = [
    { title: 'Início',  tabComponent: 'HomePage', index: 0, icon: 'home' },
    { title: 'Anotação',  tabComponent: 'AnotacaoPage', index: 1, icon: 'organize-nota' },
  ];

  constructor(public navCtrl: NavController,platform: Platform) {
    this.platform = platform;
  }
  openPage(page: PageInterface) {  
    this.rootPage = page.tabComponent;
 
  }
  isActive(page: PageInterface){
    if (page.tabComponent == this.rootPage){
      return "primary";
    }return ;
  }
  exitApp(){
    this.platform.exitApp();
 }
  
}

