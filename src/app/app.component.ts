import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pothole-front-end';

  constructor(private auth: AuthService) {
    this.auth.login('keshav', 'pass').subscribe(
      (res) => {
        console.log('Login Success', res);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  whoami(): void {
    this.auth.whoami().subscribe(
      (res) => {
        console.log(res);
        this.title = JSON.stringify(res, null, 2);
      },
      (error) => {
        console.log('Fetch Error ', error);
      }
    );
  }
}
