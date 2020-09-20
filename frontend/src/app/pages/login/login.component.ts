import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  validLogin = true;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
      terms: new FormControl(false, [
          Validators.requiredTrue
        ]
      )
    });
  }

  get email(): any {
    return this.loginForm.get('email');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  get queryParams(): any {
    return this.route.snapshot.queryParamMap;
  }

  login(): void {
    if (!this.loginForm.invalid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value)
        .then(() => this.router.navigate(['/dashboard']))
        .catch(() => this.validLogin = false)
        .finally(() => this.isLoading = false);
    }
  }
}
