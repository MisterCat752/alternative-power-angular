import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, MatIconModule, ReactiveFormsModule],
  templateUrl: './login.html',
})
export class LoginPage {
  private fb = inject(FormBuilder);
  hide = true;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('login', this.form.value);
  }
}
