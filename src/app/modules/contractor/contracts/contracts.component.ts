import {Component, OnInit} from '@angular/core';
import {ContractorService} from '../contractor.service';
import {Cluster} from '../../../models/models';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss'],
})
export class ContractsComponent implements OnInit {
  clusters: Cluster[] = [];
  selectedCluster: Cluster | undefined;

  constructor(private contractorService: ContractorService) {
    contractorService
      .getOpenContracts()
      .subscribe((clusters) => (this.clusters = clusters));
  }

  ngOnInit(): void {
  }

  selectCluster(cluster: Cluster): void {
    this.selectedCluster = cluster;
  }

  getSorted(clusters: Cluster[]): Cluster[] {
    return clusters.sort((a, b) => -a.records.length + b.records.length)
  }
}
