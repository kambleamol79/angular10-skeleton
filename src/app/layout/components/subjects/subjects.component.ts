import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../_services';
import { Subject } from '../../../_models';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  subjects: Subject;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getSubjects().subscribe((res) => {
      this.subjects = res.resultdata;     
    });
  }

}
