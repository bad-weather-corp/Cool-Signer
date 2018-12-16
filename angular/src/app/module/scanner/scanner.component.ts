import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { CordovaService } from 'src/app/services/cordova.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit, OnDestroy {
  // emitter for the result of the scanning
  @Output() scanResult = new EventEmitter<string>();
  // currently selected camera device
  selectedDevice: MediaDeviceInfo;

  private ANDROID_PERMISSIONS = ['android.permission.CAMERA'];

  private _scanning = false;
  private availableDevices: MediaDeviceInfo[];

  constructor(private permissions: PermissionsService) { }

  ngOnInit() {
    this.permissions.requestPermissions(this.ANDROID_PERMISSIONS).subscribe((result) => {
      console.log('Permission request done: ' + JSON.stringify(result));
    });
  }

  ngOnDestroy() {
    // make sure we disable the scanner when leaving component
    this.selectedDevice = undefined;
  }

  @Input()
  set scanning(scanning: boolean) {
    this._scanning = scanning;
    if (scanning) {
      this.selectCamera();
    } else {
      this.selectedDevice = undefined;
    }
  }
  get scanning(): boolean {
    return this._scanning;
  }

  /**
   * callback invoked when cameras are recognized
   *
   * @param devices array of recognized media devices
   */
  camerasFound(devices: MediaDeviceInfo[]) {
    this.availableDevices = devices;
    // auto-select the camera
    this.selectCamera();
  }

  /**
   * callback invoked when QR code is scanned
   */
  scanSuccess(result) {
    // mark down the scan result
    this.scanResult.emit(result);
  }

  /**
   * try to pick the back camera or take the first one in the list
   */
  selectCamera() {
    const devices = this.availableDevices;
    // if devices were not loaded yet then do nothing
    if (!devices || devices.length === 0) {
      return;
    }
    // selects the devices's back camera by default
    for (const device of devices) {
      if (/back|rear|environment/gi.test(device.label)) {
        this.selectedDevice = device;
        break;
      }
    }
    // if back camera was not found then simply use the first in the list
    if (!this.selectedDevice) {
      this.selectedDevice = devices[0];
    }
  }
}
