import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  validSignup = true;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([a-zA-ZñÑ]+)(\D+)$/)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([a-zA-ZñÑ]+)(\D+)$/)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/.{8,}/)
      ]),
      terms: new FormControl(false, [
          Validators.requiredTrue
        ]
      )
    });
  }

  get firstName(): any {
    return this.signupForm.get('firstName');
  }

  get lastName(): any {
    return this.signupForm.get('lastName');
  }

  get email(): any {
    return this.signupForm.get('email');
  }

  get password(): any {
    return this.signupForm.get('password');
  }

  signup(): void {
    if (!this.signupForm.invalid) {
      this.isLoading = true;
      console.log(this.signupForm.value);
      this.authService.signup(this.signupForm.value)
        .then(() => this.router.navigate(['/login'], {queryParams: {created: true}}))
        .catch(() => this.validSignup = false)
        .finally(() => this.isLoading = false);
    }
  }
}
