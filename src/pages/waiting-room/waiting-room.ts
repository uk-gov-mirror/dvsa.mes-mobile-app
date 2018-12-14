import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../classes/base-page';
import { AuthenticationServiceProvider } from '../../providers/authentication-service/authentication-service';

@IonicPage()
@Component({
  selector: 'page-waiting-room',
  templateUrl: 'waiting-room.html'
})
export class WaitingRoomPage extends BasePageComponent {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationService: AuthenticationServiceProvider
  ) {
    super(platform, navCtrl, authenticationService)
  }
}
