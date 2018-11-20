import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { ErrorComponent } from '../components/error/error.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class ErrorIntercepter implements HttpInterceptor {
  constructor(private modalService: NgbModal) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const modalRef = this.modalService.open(ErrorComponent);
        modalRef.componentInstance.error = error;
        return throwError(error);
      })
    );
  }
}
