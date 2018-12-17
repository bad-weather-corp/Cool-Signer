import { Injectable } from '@angular/core';
import { CordovaService } from './cordova.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  constructor(private cordovaService: CordovaService) { }

  public getPermissionsObject(): any {
    // if not running on cordova tnen make this empty call
    if (!this.cordovaService.onCordova) {
      console.log('Skipping cordova-only permission request');
      return undefined;
    }
    // retrieve permissions object
    const permissions = this.cordovaService.cordova.plugins.permissions;
    // if permissions are not available then make this empty call
    if (!permissions) {
      console.log('Skipping permissions request because permissions are not available');
      return undefined;
    }
    return permissions;
  }

  /**
   * Ask for permissions and return true if hey were acquired, false if failed and undefined if already present
   *
   * @param permission android permission that needs to be acquired
   */
  public requestPermission(permission: string): Observable<PermissionResult> {
    const permObj = this.getPermissionsObject();
    // create observable for the result of permission request
    return Observable.create(observer => {
      // behave based on whether we have the permissions object or not
      if (permObj) {
        // check for permission and register callback function to process it
        permObj.checkPermission(permission, processPermissionCheck);
      } else {
        // not having any permission system means we have all the permissions
        observer.next({usingPermissions: false, requestedPermissions: false, hasPermissions: true});
      }
      // process result of permission check
      function processPermissionCheck(resp) {
        // request permissions when we do not have them already
        if (resp.hasPermission) {
          observer.next({usingPermissions: true, requestedPermissions: false, hasPermissions: true});
        } else {
          requestPermission();
        }
      }
      // request the permissions
      function requestPermission() {
        permObj.requestPermission(permission, (resp) => {
          if (resp.hasPermission) {
            observer.next({usingPermissions: true, requestedPermissions: true, hasPermissions: true});
          } else {
            observer.next({usingPermissions: true, requestedPermissions: true, hasPermissions: false});
          }
        },
          observer.next({usingPermissions: true, requestedPermissions: true, hasPermissions: false}));

      }
      // not going to timeout for now
      // setTimeout(() => observer.next(false), 2000);
    });
  }
}

export class PermissionResult {
  usingPermissions: boolean;
  requestedPermissions: boolean;
  hasPermissions: boolean;
}
