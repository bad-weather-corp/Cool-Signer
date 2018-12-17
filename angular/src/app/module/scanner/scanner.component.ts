import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { PermissionsService } from 'src/app/services/permissions.service';

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
  availableDevices: MediaDeviceInfo[];

  private CAMERA_PERMISSION = 'android.permission.CAMERA';

  private _scanning = false;

  constructor(private permissions: PermissionsService) { }

  ngOnInit() {
    this.permissions.requestPermission(this.CAMERA_PERMISSION).subscribe((result) => {
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
      this.autoSelectCamera();
    } else {
      this.selectCamera(undefined);
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
    devices.forEach(dvc => console.log(`Found camera: ${dvc.deviceId}, ${dvc.groupId}, ${dvc.kind}, ${dvc.label}`));
    this.availableDevices = devices;
    // auto-select the camera
    this.autoSelectCamera();
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
  autoSelectCamera() {
    const devices = this.availableDevices;
    // if devices were not loaded yet then do nothing
    if (!devices || devices.length === 0) {
      return;
    }
    // selects the devices's back camera by default
    for (const device of devices) {
      if (/back|rear|environment/gi.test(device.label)) {
        this.selectCamera(device);
        break;
      }
    }
    // if back camera was not found then simply use the first in the list
    if (!this.selectedDevice) {
      this.selectCamera(devices[0]);
    }
  }

  selectCamera(device: MediaDeviceInfo) {
    this.selectedDevice = device;
  }

  selectCameraById(deviceId: string) {
    const device = this.availableDevices.find((value) => value.deviceId === deviceId);
    this.selectCamera(device);
  }
}
