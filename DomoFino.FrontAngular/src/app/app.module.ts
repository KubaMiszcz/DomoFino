import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { ParagonListComponent, NgbdSortableHeader } from './Paragons/paragon-list/paragon-list.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { ParagonsSummaryComponent } from './Paragons/paragons-summary/paragons-summary.component';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { ParagonNewComponent } from './Paragons/paragon-new/paragon-new.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RecentParagonsListComponent } from './Paragons/recent-paragons-list/recent-paragons-list.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main-page', component: MainPageComponent },
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: '**', component: LoginComponent, pathMatch: 'full' },
  // { path: '', component: LoginEntryComponent, pathMatch: 'full' },
  // { path: '**', redirectTo: '/login' }
];

@NgModule({
  declarations: [
    AppComponent,
    ParagonListComponent,
    NgbdSortableHeader,
    AppSettingsComponent,
    ParagonsSummaryComponent,
    ParagonNewComponent,
    LoginComponent,
    MainPageComponent,
    RecentParagonsListComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [
    DatePipe,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

