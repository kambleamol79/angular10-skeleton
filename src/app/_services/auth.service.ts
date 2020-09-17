import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models';
import { AlertService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    
    constructor(
        private router: Router,
        private http: HttpClient,
        private alertService: AlertService
    ) {
       
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }
    
    login(username, password) {
        const header  = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});
        let body = 'username='+username+'&password='+password;
        return this.http.post<any>(`${environment.apiUrl}/signin`, body)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                if(user.status == true){        
                    localStorage.setItem('user', JSON.stringify(user.resultdata));
                    this.userSubject.next(user.resultdata);
                    return user;
                }else{
                    this.alertService.error(user);
                }            
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        //this.router.navigate(['/auth/login']);
    }

    register(user: User) {
        const header  = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});
        let body = 'first_name='+user.firstName+'&last_name='+user.lastName+'&email='+user.email+'&mobile='+user.mobile+'&password='+user.password+'&confirm_password='+user.confirm_password;
        return this.http.post(`${environment.apiUrl}/signup`, body, { headers: header});
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
            return x;
        }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
        }));
    }
}