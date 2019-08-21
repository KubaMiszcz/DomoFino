import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {
  LocationStrategy,
  HashLocationStrategy,
  PathLocationStrategy
} from "@angular/common";
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DatePipe } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AppSettingsComponent } from "./app-settings/app-settings.component";
import { ParagonsSummaryComponent } from "./Paragons/paragons-summary/paragons-summary.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";
import { ParagonNewComponent } from "./Paragons/paragon-new/paragon-new.component";
import { LoginComponent } from "./login/login.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { FooterComponent } from "./footer/footer.component";
import { EditParagonModalComponent } from "./Paragons/edit-paragon-modal/edit-paragon-modal.component";
import { ParagonsListComponent } from "./Paragons/paragons-list/paragons-list.component";
import { GenericErrorModalComponent } from './generic-error-modal/generic-error-modal.component';
import { HttpErrorInterceptor } from "./interceptors/error-interceptor";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AuthGuard } from "./guards/auth-guard.service";
import { NumPadComponent } from "./num-pad/num-pad.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "main-page", component: MainPageComponent, canActivate: [AuthGuard] },
  // { path: "main-page", component: MainPageComponent },
  { path: "", component: LoginComponent, pathMatch: "full" },
  { path: "**", component: LoginComponent, pathMatch: "full" }
  // { path: '', component: LoginEntryComponent, pathMatch: 'full' },
  // { path: '**', redirectTo: '/login' }
];


@NgModule({
  declarations: [
    AppComponent,
    AppSettingsComponent,
    ParagonsSummaryComponent,
    ParagonNewComponent,
    LoginComponent,
    MainPageComponent,
    ParagonsListComponent,
    FooterComponent,
    EditParagonModalComponent,
    GenericErrorModalComponent,
    NumPadComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [
    EditParagonModalComponent,
    GenericErrorModalComponent,
    NumPadComponent
  ],
  providers: [
    DatePipe,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
    // { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
