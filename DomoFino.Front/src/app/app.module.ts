import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ParagonListComponent, NgbdSortableHeader} from './Paragons/paragon-list/paragon-list.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { ParagonsSummaryComponent } from './Paragons/paragons-summary/paragons-summary.component';
import { HttpClientModule } from '@angular/common/http';
import { ParagonNewComponent } from './Paragons/paragon-new/paragon-new.component';

@NgModule({
  declarations: [
    AppComponent,
    ParagonListComponent,
    NgbdSortableHeader,
    AppSettingsComponent,
    ParagonsSummaryComponent,
    ParagonNewComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
