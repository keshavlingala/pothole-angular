import {Component, OnDestroy, OnInit} from '@angular/core';
import {Bid, Cluster, PotholeRecord} from '../../../../models/models';
import {ActivatedRoute} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ContractorService} from '../../contractor.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.scss'],
})
export class ContractDetailComponent implements OnInit, OnDestroy {
  $cluster: Observable<Cluster | undefined> = of(undefined);
  sub;
  bidForm: FormGroup;
  $bid: Observable<Bid | undefined> = of(undefined);

  constructor(
    private activeRoute: ActivatedRoute,
    private contractorService: ContractorService,
    private snack: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.bidForm = this.fb.group({
      bidAmount: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.sub = this.activeRoute.paramMap.subscribe((res) => {
      const zipcode = res.get('id');
      this.$cluster = contractorService.getContractById(zipcode);
      this.bidForm.reset();
      this.$bid = this.contractorService.checkBid(zipcode);
    });
  }

  ngOnInit(): void {
    console.log('Contract Detail Inited');
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  copyCoordinates(record: PotholeRecord): void {
    this.snack.open('Coordinates Copied to Clipboard', 'Dismiss', {
      duration: 1000,
    });
    window.open(`https://www.google.com/maps/place/${record.lat},${record.lng}/,17z`, '_blank');
  }

  submitBid(zipcode: string): void {
    const {bidAmount, description} = this.bidForm.value;
    this.contractorService
      .postBid(bidAmount, description, zipcode)
      .subscribe((bid) => {
        console.log('Bid Application Success', bid);
        this.snack.open('Bid Application Sent Successfully!', 'Dismiss', {
          duration: 1000,
        });
        this.bidForm.reset();
      });
  }
}
