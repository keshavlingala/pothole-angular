import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { PotholeRecord } from '../../../models/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit, AfterViewInit {
  WIDTH = 320;
  HEIGHT = 240;

  @ViewChild('video')
  public video: ElementRef | undefined;

  @ViewChild('canvas')
  public canvas: ElementRef | undefined;

  captures = '';
  isCaptured = false;
  image: any;
  error: any;
  form: FormGroup;
  file: File | null = null;
  clickOrUpload = true;

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
      file: [null],
      description: ['', Validators.required],
    });
  }

  async ngAfterViewInit(): Promise<void> {
    await this.setupDevices();
  }

  async setupDevices(): Promise<void> {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (stream) {
          if (this.video) {
            this.video.nativeElement.srcObject = stream;
            this.video.nativeElement.play();
          }
          this.error = null;
        } else {
          this.error = 'You have no output video device';
        }
      } catch (e) {
        this.error = e;
      }
    }
  }

  capture(): void {
    this.drawImageToCanvas(this.video?.nativeElement);
    this.captures = this.canvas?.nativeElement.toDataURL('image/png');
    this.isCaptured = true;
    this.file = this.dataURLtoFile(this.captures, 'filename.png');
  }

  removeCurrent(): void {
    this.isCaptured = false;
  }

  drawImageToCanvas(image: any): void {
    this.canvas?.nativeElement
      .getContext('2d')
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }

  dataURLtoFile(dataurl: any, filename: string): File {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  submit(): void {
    console.log(this.file);
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
        this.snack.open('Pothole Reported Successfully!', 'Dismiss', {
          duration: 1000,
        });
      },
      (error) => {
        console.log('Errror', error);
      }
    );
  }

  toggle(value: boolean): void {
    this.clickOrUpload = value;
    if (value === true) {
      this.setupDevices();
      this.isCaptured = false;
    }
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
