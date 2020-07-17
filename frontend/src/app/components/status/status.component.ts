import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Issue } from '../../issue.model';
import { IssueService } from '../../issue.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  issues: Issue[];
  id: String;
  issue: any = {};
  updateForm: FormGroup;


  constructor(private issueService: IssueService, private snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.createForm();
   }

  createForm(){
    this.updateForm = this.fb.group({
    title: ['', Validators.required],
    responsible: '',
    description: '',
    severity: '',
    status:''
  });
}

  ngOnInit(): void {
    this.fetchIssues();
    this.route.params.subscribe(params => {
      this.id = "5f0f1a6961af05fedde9babf";
      this.issueService.getIssueById("5f0f1a6961af05fedde9babf").subscribe(res => {
        this.issue = res;
        this.updateForm.get('title').setValue(this.issue.title);
        this.updateForm.get('responsible').setValue(this.issue.responsible);
        this.updateForm.get('description').setValue(this.issue.description);
        this.updateForm.get('status').setValue(this.issue.status);
      });
    });
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
    // this.updateIssueSec("yes", "please", "work", "cmon", "plz");
  }

  hanOut(){
    console.log("Hannahs Out");
  }
  hanHome(){
    console.log("Hannahs Home");
  }

  // updateIssueSec(title, responsible, description, severity, status){
  //   this.issueService.updateIssue(this.id, title, responsible, description, severity, status).subscribe(() => {
  //     this.snackBar.open('Issue updated successfully', 'OK', {
  //       duration: 3000
  //     });
  //   });
  // }

  updateIssueSec(){
    this.issueService.updateIssue(this.id).subscribe(() => {
      this.snackBar.open('Issue updated successfully', 'OK', {
        duration: 3000
      });
      location.reload();
    });
  }




}
