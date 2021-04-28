import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { PotholeRecord } from '../../../models/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  form: FormGroup;
  file: File | null = null;

  constructor(
    private fb: FormBuilder,
    private uService: UserService,
    private snack: MatSnackBar
  ) {
    this.form = fb.group({
      zipcode: [
        '',
        [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')],
      ],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
      file: [null, [Validators.required]],
      description: ['', Validators.required],
    });
  }

  submit(): void {
    const { lat, lng, zipcode, description } = this.form.value;
    const pothole: PotholeRecord = {
      lat,
      lng,
      zipcode,
      description,
      file: this.file as File,
    };
    this.uService.uploadPothole(pothole).subscribe(
      (res) => {
        this.form.reset();
        console.log('Upload Success');
      },
      (error) => {
        console.log('Errror', error);
      }
    );
  }

  ngOnInit(): void {}

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.form.get('lat')?.setValue(position.coords.latitude);
        this.form.get('lng')?.setValue(position.coords.longitude);
      });
    } else {
      console.log('No support for geolocation');
      this.snack.open('Geo Location Not supported', 'Dismiss', {
        duration: 2000,
      });
    }
  }

  change(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
    }
  }

  async pasteLocation(): Promise<any> {
    const clipboard = await navigator.clipboard.readText();
    const match = clipboard.match(
      '^(-?\\d+(\\.\\d+)?),\\s*(-?\\d+(\\.\\d+)?)$'
    );
    if (match) {
      this.form.get('lat')?.setValue(match[1]);
      this.form.get('lng')?.setValue(match[3]);
    } else {
      this.snack.open('Clipboard text is not GPS coordinates', 'Dismiss', {
        duration: 2000,
      });
    }
  }
}
