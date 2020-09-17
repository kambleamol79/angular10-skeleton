import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../_services';
import { Timezone } from '../../../_models';

@Component({
  selector: 'app-timezone',
  templateUrl: './timezone.component.html',
  styleUrls: ['./timezone.component.css']
})
export class TimezoneComponent implements OnInit {

  timezones: Timezone;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getTimezones().subscribe((res) => {
      this.timezones = res.resultdata;
    });
  }

}
