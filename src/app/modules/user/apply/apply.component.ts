import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss'],
})
export class ApplyComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snack: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      licence: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  async apply(): Promise<any> {
    const res = await this.dialog
      .open(ConfirmationDialogComponent, {
        width: '300px',
        data: this.form.get('licence')?.value,
      })
      .afterClosed()
      .toPromise();
    if (res) {
      const { licence } = this.form.value;
      this.userService.applyContractor(licence).subscribe((res) => {
        if (res) {
          this.snack.open('Application Sent Successfully', 'Dismiss', {
            duration: 1000,
          });
          this.form.reset();
        }
      });
    }
  }
}

@Component({
  template: ` <h1 mat-dialog-title>Confirmation</h1>
    <div mat-dialog-content>
      <p>Is this the correct Licence number?</p>
      {{ data }}
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true" (click)="onNoClick()">
        No
      </button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>
        Yes,Confirm
      </button>
    </div>`,
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
