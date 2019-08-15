import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, pipe } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericErrorModalComponent } from '../generic-error-modal/generic-error-modal.component';
// import { ErrorModalComponent } from '../app-shared-module/error-modal/error-modal.component';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private _router: Router,
    private modalService: NgbModal) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(catchError(err => {
        if (err.status === 401) {
          const modalRef = this.modalService.open(GenericErrorModalComponent, { centered: true, size: 'sm' });
          modalRef.componentInstance.caption = err.status + ': Unauthorized';
          modalRef.componentInstance.message = err.error;
          // this._appUserService.LoginMessage = err.error;
          // this._appUserService.LogoutJWT();
        }

        if (err.status === 404) {
          const modalRef = this.modalService.open(GenericErrorModalComponent, { centered: true, size: 'sm' });
          modalRef.componentInstance.caption = err.status + ': Not Found';
          modalRef.componentInstance.message = err.error;
        }

        if (err.status === 500) {
          const modalRef = this.modalService.open(GenericErrorModalComponent, { centered: true, size: 'sm' });
          modalRef.componentInstance.caption = err.status + ': Internal Error';
          modalRef.componentInstance.message = err.error;
        }

        console.error('FromInterceptor', err.status, err.error);

        return throwError(err.error);
      }
      )
      );
  }
}




