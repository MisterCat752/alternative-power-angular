import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthStore } from '../services/auth.store';
import { AuthService } from '../services/auth.service';
import { Observable, BehaviorSubject, throwError, switchMap, filter, take, catchError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private authStore: AuthStore, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authStore.token();
    const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

    return next.handle(authReq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401(authReq, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((res) => {
          this.isRefreshing = false;

          // обновляем токен в store и localStorage
          this.authStore.token.set(res.access);
          if (typeof window !== 'undefined') localStorage.setItem('access_token', res.access);

          this.refreshSubject.next(res.access);

          // повторяем оригинальный запрос
          const cloned = req.clone({
            setHeaders: { Authorization: `Bearer ${res.access}` },
          });
          return next.handle(cloned);
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.authStore.logout();
          return throwError(() => err);
        })
      );
    } else {
      // ждем завершения текущего обновления
      return this.refreshSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((token) => {
          const cloned = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
          });
          return next.handle(cloned);
        })
      );
    }
  }
}
