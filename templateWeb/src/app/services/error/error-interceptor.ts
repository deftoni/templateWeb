import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorIntercepter implements HttpInterceptor {
  constructor(private messageService: MessageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        this.messageService.add({
          key: 'errorToast',
          severity: 'error',
          summary: error.error.message,
          detail: error.error.error,
          life: 3000
        });

        return throwError(error);
      })
    );
  }
}
