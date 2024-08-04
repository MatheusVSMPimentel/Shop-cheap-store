import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowsingModule } from './browsing/browsing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ngx-custom-validators';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './services/error.handler.service';
import { NgxBrazil } from 'ngx-brazil';

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowsingModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), HttpClientModule,NgxMaskDirective, NgxMaskPipe,
    NgxBrazil
  ],
  providers: [CustomFormsModule,provideEnvironmentNgxMask(),provideNgxMask(), httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
