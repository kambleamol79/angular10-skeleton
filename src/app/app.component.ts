import { Component } from '@angular/core';
import { AuthService } from './_services';
import { User } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'covlc-admin';
  user: User;

  constructor(private authService: AuthService){
    //sessionStorage.setItem('auth_token', 'login_token');
    //sessionStorage.removeItem('auth_token');
    this.authService.user.subscribe(x => this.user = x);
  }

  logout() {
    this.authService.logout();
}


}
