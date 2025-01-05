import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error) => {
      const errorMessage = error.error || 'Si è verificato un errore';
      messageService.add({ severity: 'error', summary: 'Errore', detail: errorMessage });
      throw error;
    })
  );
};
