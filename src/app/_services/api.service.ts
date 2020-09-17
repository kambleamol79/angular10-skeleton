import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { AlertService } from '../_services';
import { Timezone, Subject } from '../_models';

@Injectable({ providedIn: 'root' })

export class ApiService {

    private timezoneSubject: BehaviorSubject<any>;
    public timezone: Observable<any>;

    private subjectsSubject: BehaviorSubject<any>;
    public subjects: Observable<any>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private alertService: AlertService
    ) {

        this.timezoneSubject = new BehaviorSubject<any>(Timezone);
        this.timezone = this.timezoneSubject.asObservable();

        this.subjectsSubject = new BehaviorSubject<any>(Subject);
        this.subjects = this.subjectsSubject.asObservable();
    }

    public get timezoneValue(): Timezone {
        return this.timezoneSubject.value;
    }

    getTimezones(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/timezones/`)
        .pipe(
            map(timezones => {
            if(timezones.status == true){
                this.timezoneSubject.next(timezones.resultdata);
                return timezones.resultdata;
            }else{
                this.alertService.error(timezones);
            }   
        }));
    }

    getSubjects(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/subjects/`)
        .pipe(
            map(subjects=> {
            if(subjects.status == true){
                this.subjectsSubject.next(subjects.resultdata)
                return subjects.resultdata;
            }else{
                this.alertService.error(subjects);
            }   
        }));
    }

}