import { Component, OnInit } from '@angular/core';
import { ContractorService } from '../contractor.service';
import { Observable, of } from 'rxjs';
import { Bid } from '../../../models/models';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-mybids',
  templateUrl: './mybids.component.html',
  styleUrls: ['./mybids.component.scss'],
})
export class MybidsComponent implements OnInit {
  $bids: Observable<Bid[]> = of([]);

  constructor(private contractorService: ContractorService) {
    this.$bids = contractorService.getMyBids();
  }

  ngOnInit(): void {}

  getColor(status: string): ThemePalette {
    if (status === 'APPROVED') {
      return 'accent';
    }
    if (status === 'REJECTED') {
      return 'warn';
    }
    return 'primary';
  }
}
