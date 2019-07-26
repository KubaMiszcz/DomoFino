import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ParagonListComponent } from './Paragons/paragon-list/paragon-list.component';
import { ParagonComponent } from './Paragons/paragon/paragon.component';

@NgModule({
  declarations: [
    AppComponent,
    ParagonComponent,
    ParagonListComponent
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
