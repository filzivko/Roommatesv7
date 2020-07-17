import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';


import { Issue } from '../../issue.model';
import { IssueService } from '../../issue.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  issues: Issue[];
  constructor(private issueService: IssueService, private router: Router) { }

  ngOnInit(): void {
    this.fetchIssues();

  }
  fetchIssues(){
    this.issueService
      .getIssues()
      .subscribe((data: Issue[]) => {
        this.issues = data;
        console.log('data requested');
        console.log(this.issues);
      });
  }
  hanIn(){
    console.log("Hannahs In");

  }
  hanOut(){
    console.log("Hannahs Out");
  }
  hanHome(){
    console.log("Hannahs Home");
  }


}
