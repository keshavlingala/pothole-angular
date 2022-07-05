import {Component, Inject, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';
import {Bid, User} from '../../../models/models';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef,} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.scss'],
})
export class BidsComponent implements OnInit {
  bidsByCluster: Observable<{ [clusterId: string]: Bid[] }> = of({});
  selectedBid: Bid | undefined;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {
    this.bidsByCluster = this.adminService.getAllBids().pipe(
      map((bids) => {
        console.log(bids);
        const bidsByCluster: { [clusterId: string]: Bid[] } = {};
        bids.forEach((bid) => {
          if (bidsByCluster[bid.clusterId]) {
            bidsByCluster[bid.clusterId].push(bid);
          } else {
            bidsByCluster[bid.clusterId] = [bid];
          }
        });
        return bidsByCluster;
      })
    );
  }

  ngOnInit(): void {
  }

  getKeys(obj: { [p: string]: Bid[] }): string[] {
    return Object.keys(obj);
  }

  newExpansion(): void {
    this.selectedBid = undefined;
  }

  approveContract(): void {
    if (this.selectedBid) {
      this.adminService.approveBid(this.selectedBid.bidId).subscribe(
        (bid) => {
          if (bid) {
            this.snack.open('Bid Approved', 'Dismiss', {
              duration: 1000,
            });
          } else {
            this.snack.open('Failed to Approve Bid', 'Dismiss', {
              duration: 1000,
            });
          }
          console.log(bid);
        },
        (error) => {
          this.snack.open('Failed to Approve Bid', 'Dismiss', {
            duration: 1000,
          });
          console.log(error);
        }
      );
    }
  }

  showContractorDetails(contractorId: string): void {
    this.dialog.open(ContractorProfileComponent, {
      width: '500px',
      data: contractorId,
    });
  }
}

@Component({
  template: ` <h1 mat-dialog-title>Contractor Details</h1>
  <div *ngIf="$contractor | async as contractor" mat-dialog-content>
    Username: {{ contractor.username }} <br/>
    Email: {{ contractor.email }} <br/>
    Licence: {{ contractor.licence }} <br/>
    ID: {{ contractor.userId }}
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">Close</button>
  </div>`,
})
export class ContractorProfileComponent {
  $contractor: Observable<User>;

  constructor(
    public dialogRef: MatDialogRef<ContractorProfileComponent>,
    private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.$contractor = adminService.getContractorFromId(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
