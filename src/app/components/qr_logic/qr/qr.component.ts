import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import QRCode from 'qrcode';

@Component({
  selector: 'app-qr',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './qr.component.html',
  styleUrl: './qr.component.css',
})
export class QrComponent {
  @ViewChild('canv') canvas!: ElementRef;
  url: string = '';
  qrActive: boolean = false;
  generate() {
    this.qrActive = true;
    setTimeout(() => {
      console.log(this.canvas);
      QRCode.toCanvas(this.canvas.nativeElement, this.url, function (error) {
        if (error) console.error(error);
        console.log('success!');
      });
      // this.url = ''
    }, 0);
  }
  download() {
    let canvas = this.canvas.nativeElement;
    let image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
    let link = document.createElement('a');
    link.download = "qr-code.png";
    link.href = image;
    link.click();
  }
  handleClear() {
    this.url = '';
    this.qrActive = false;
  }
}
