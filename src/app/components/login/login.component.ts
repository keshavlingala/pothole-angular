import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  submit(): void {
    const { username, password } = this.form.value;
    this.auth.login(username, password).subscribe(
      (res) => {
        this.router.navigateByUrl('/');
        console.log(res);
        this.error = '';
      },
      (error) => {
        this.error = 'Invalid Username/Password combination';
      }
    );
  }
}
