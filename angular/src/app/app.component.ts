import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  scanData: string;
  isScanning = true;

  scanResult(data: string) {
    this.scanData = data;
    // try to get the data
    const obj = this.getObject(data);
    // stop the scanner if we got json
    if (obj) {
      this.isScanning = false;
    }
  }

  /**
   * assume that data is JSON object and return that object or undefined otherwise
   *
   * @param data the string representation of object
   */
  getObject(data: string) {
    try {
      // try to parse the data
      const o = JSON.parse(data);
      // make sure what comes out is an object
      if (o && typeof o === 'object') {
        return o;
      }
    } catch (err) { /* error means bad data */}
    // return undefined by default
    return undefined;
  }
}
