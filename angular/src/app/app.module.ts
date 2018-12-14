import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgxKjuaModule } from 'ngx-kjua';
import { ScannerComponent } from './module/scanner/scanner.component';

@NgModule({
  declarations: [
    AppComponent,
    ScannerComponent
  ],
  imports: [
    BrowserModule,
    ZXingScannerModule,
    NgxKjuaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
