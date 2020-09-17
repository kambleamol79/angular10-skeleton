import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthService } from '../_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.authService.userValue;
        const isLoggedIn = user && user.token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    /*Authorization: `Bearer ${user.token}`*/
                    'Content-Type': `application/x-www-form-urlencoded`,
                    'Authorization': `${user.token}`
                }
            });
        }else{
            request = request.clone({
                setHeaders: {
                    'Content-Type': `application/x-www-form-urlencoded`,
                }
            });
        }

        return next.handle(request);
    }
}