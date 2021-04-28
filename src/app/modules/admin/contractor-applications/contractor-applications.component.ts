import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../models/models';
import { AdminService } from '../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-contractor-applications',
  templateUrl: './contractor-applications.component.html',
  styleUrls: ['./contractor-applications.component.scss'],
})
export class ContractorApplicationsComponent implements OnInit {
  contractors: User[] = [];
  @ViewChild('list') items: MatSelectionList | undefined;

  constructor(private adminService: AdminService, private snack: MatSnackBar) {
    this.adminService.getContractorApplications().subscribe((res) => {
      this.contractors = res;
    });
  }

  ngOnInit(): void {}

  copyLicence(): void {
    this.snack.open('License ID Copied to Clipboard', 'Dismiss', {
      duration: 1000,
    });
  }

  approveSelected(): void {
    const users = this.items?.selectedOptions.selected.map((u) => u.value);
    if (users) {
      this.adminService.approveContractors(users).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
