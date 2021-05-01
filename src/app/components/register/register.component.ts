import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snack: MatSnackBar
  ) {
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirm_password : ['' , [Validators.required]]
    }, {
      validator: this.MustMatch('password', 'confirm_password')
  });
  }

  ngOnInit(): void {}

  submit(): void {
    const { username, password, email } = this.form.value;
    this.auth.register(username, password, email).subscribe((user) => {
      this.snack.open('Registered Successfully!', 'Dismiss', {
        duration: 1000,
      });
      this.router.navigateByUrl('/login');
      this.form.reset();
    },
    (error) => {
      this.snack.open('Username already exists!', 'Dismiss', {
        duration: 1000,
      });
    });
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }
}
