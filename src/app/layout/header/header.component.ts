import { Component, OnInit } from '@angular/core';
import { AuthService, AlertService } from '../../_services';
import { Router } from '@angular/router';
import { User } from '../../_models'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.user = this.authService.userValue;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
