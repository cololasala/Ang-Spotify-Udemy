import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorSession = false;
  form: FormGroup = new FormGroup({});
  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
      ]),
    });
    this.clearCookies();
  }

  clearCookies(): void {
    this.cookieService.delete('token', '/'); // borro cookie del token
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.authService
        .sendCredentials(this.email.value, this.password.value)
        .subscribe({
          next: () => {
            this.router.navigate(['/home']);
          },
          error: (err) => {
            this.errorSession = true;
            console.log(err);
          },
        });
    }
  }

  /* Getters */
  get email(): AbstractControl {
    return this.form.get('email')!;
  }
  get password(): AbstractControl {
    return this.form.get('password')!;
  }
}
