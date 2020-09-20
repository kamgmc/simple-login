import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {
    this.user = authService.user;
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.isLoading = true;
    this.authService.logout()
      .then(() => this.router.navigate(['/login']))
      .finally(() => this.isLoading = false);
  }
}
