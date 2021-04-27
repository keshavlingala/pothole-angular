import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/models';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  showFiller = false;
  user: User | null = null;

  constructor(private auth: AuthService) {
    auth.getUser().subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {}
}
