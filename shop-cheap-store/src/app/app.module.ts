import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowsingModule } from './browsing/browsing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ngx-custom-validators';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

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
    ToastrModule.forRoot(),
  ],
  providers: [CustomFormsModule,],
  bootstrap: [AppComponent]
})
export class AppModule { }
