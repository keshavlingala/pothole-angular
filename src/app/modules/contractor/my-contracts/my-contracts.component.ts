import { Component, OnInit } from '@angular/core';
import { ContractorService } from '../contractor.service';
import { Observable } from 'rxjs';
import { Cluster } from '../../../models/models';

@Component({
  selector: 'app-my-contracts',
  templateUrl: './my-contracts.component.html',
  styleUrls: ['./my-contracts.component.scss'],
})
export class MyContractsComponent implements OnInit {
  $contracts: Observable<Cluster>;

  constructor(private contractorService: ContractorService) {
    this.$contracts = contractorService.getMyContracts();
  }

  ngOnInit(): void {}
}
