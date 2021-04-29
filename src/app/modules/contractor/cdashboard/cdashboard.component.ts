import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/models';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-cdashboard',
  templateUrl: './cdashboard.component.html',
  styleUrls: ['./cdashboard.component.scss'],
})
export class CdashboardComponent implements OnInit {
  user: User | null = null;

  constructor(private auth: AuthService) {
    auth.getUser().subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {}

  hasAuthority(role: 'CONTRACTOR' | 'ADMIN'): boolean {
    return !!this.user?.authorities?.find((a) => a.authority === role);
  }

  isSmall(): boolean {
    return !(window.innerWidth < 600);
  }
}
