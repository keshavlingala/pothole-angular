import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/models';
import { AdminService } from '../admin.service';
import { Observable, of } from 'rxjs';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ContractorProfileComponent } from '../bids/bids.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  contractors: User[] = [];
  $users: Observable<User[]> = of([]);
  displayedColumns = ['username', 'email', 'authorities'];

  constructor(private adminService: AdminService, private dialog: MatDialog) {
    this.$users = adminService.getAllUsers();
  }

  ngOnInit(): void {
    this.$users.subscribe((users) => {
      // console.log(users);
      this.users = users;
    });
  }

  getColor(authority: string): ThemePalette {
    if (authority === 'ADMIN') {
      return 'accent';
    } else {
      return 'primary';
    }
  }

  clickedRow(row: any): void {
    this.dialog.open(ContractorProfileComponent, {
      data: row.userId,
    });
  }
}
