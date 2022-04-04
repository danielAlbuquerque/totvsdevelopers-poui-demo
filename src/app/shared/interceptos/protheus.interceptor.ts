import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProtheusInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (environment.production) {
      const newUrl = `/app-root${request.url}`;
      const token = JSON.parse(sessionStorage.getItem("TOKEN") || "{}");
      request = request.clone({ url: newUrl });
      request = request.clone({setHeaders: { Authorization: `Bearer ${token.access_token}` }});
    }
    return next.handle(request);
  }
}
