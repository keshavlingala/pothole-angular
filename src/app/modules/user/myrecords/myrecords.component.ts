import { Component, OnInit } from '@angular/core';
import { PotholeRecord } from '../../../models/models';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-myrecords',
  templateUrl: './myrecords.component.html',
  styleUrls: ['./myrecords.component.scss'],
})
export class MyrecordsComponent implements OnInit {
  records: PotholeRecord[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getMyRecords().subscribe((records) => {
      console.log(records);
      this.records = records;
    });
  }
}
