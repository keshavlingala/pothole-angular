import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Cluster} from '../../../models/models';
import {AdminService} from '../admin.service';
import {ThemePalette} from '@angular/material/core';
import {ContractorProfileComponent} from '../bids/bids.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-approved-contracts',
  templateUrl: './approved-contracts.component.html',
  styleUrls: ['./approved-contracts.component.scss'],
})
export class ApprovedContractsComponent implements OnInit {
  contracts: Observable<Cluster[]> = of([]);

  constructor(private adminService: AdminService, private dialog: MatDialog) {
    this.contracts = adminService.$clusters;
  }

  ngOnInit(): void {
  }

  getColor(status: string): ThemePalette {
    if (status === 'FINISHED') {
      return 'accent';
    }
    if (status === 'UNASSIGNED') {
      return 'warn';
    }
    return 'primary';
  }

  getSorted(items: Cluster[]): Cluster[] {
    return items.sort((item, item2) => -item.records.length + item2.records.length);
  }

  showContractorDetails(contractorId: string): void {
    if (!contractorId) {
      return;
    }
    this.dialog.open(ContractorProfileComponent, {
      width: '500px',
      data: contractorId,
    });
  }
}
