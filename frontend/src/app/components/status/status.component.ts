import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Issue } from '../../issue.model';
import { IssueService } from '../../issue.service';
import { ThrowStmt } from '@angular/compiler';


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
      this.id = "5f142cf1a44ec34558905656";
      this.issueService.getIssueById("5f142cf1a44ec34558905656").subscribe(res => {
        this.issue = res;
        this.updateForm.get('title').setValue(this.issue.title);
        this.updateForm.get('responsible').setValue(this.issue.responsible);
        this.updateForm.get('description').setValue(this.issue.description);
        this.updateForm.get('status').setValue(this.issue.status);
      });
    });

    // if(this.issue[0].title=1){
    //   document.getElementById("hannah").classList.add('on');
    // }
  }

  fetchIssues(){
    this.issueService
      .getIssues()
      .subscribe((data: Issue[]) => {
        this.issues = data;
        console.log('data requested');
        console.log(this.issues);
        if(this.issues[0].title == "1"){ document.getElementById("steph1").classList.add('on');}
        if(this.issues[0].responsible == "1"){ document.getElementById("steph2").classList.add('on');}
        if(this.issues[0].description == "1"){ document.getElementById("steph3").classList.add('on');}

        if(this.issues[1].title == "1"){ document.getElementById("jacob1").classList.add('on');}
        if(this.issues[1].responsible == "1"){ document.getElementById("jacob2").classList.add('on');}
        if(this.issues[1].description == "1"){ document.getElementById("jacob3").classList.add('on');}

        if(this.issues[2].title == "1"){ document.getElementById("hannah1").classList.add('on');}
        if(this.issues[2].responsible == "1"){ document.getElementById("hannah2").classList.add('on');}
        if(this.issues[2].description == "1"){ document.getElementById("hannah3").classList.add('on');}

        if(this.issues[3].title == "1"){ document.getElementById("milly1").classList.add('on');}
        if(this.issues[3].responsible == "1"){ document.getElementById("milly2").classList.add('on');}
        if(this.issues[3].description == "1"){ document.getElementById("milly3").classList.add('on');}

        if(this.issues[4].title == "1"){ document.getElementById("lachy1").classList.add('on');}
        if(this.issues[4].responsible == "1"){ document.getElementById("lachy2").classList.add('on');}
        if(this.issues[4].description == "1"){ document.getElementById("lachy3").classList.add('on');}


        if(this.issues[5].title == "1"){ document.getElementById("fil1").classList.add('on');}
        if(this.issues[5].responsible == "1"){ document.getElementById("fil2").classList.add('on');}
        if(this.issues[5].description == "1"){ document.getElementById("fil3").classList.add('on');}

        // console.log(this.issues[0]);
        // document.getElementById("hannah2").classList.add('on');
      });
  }

  updateIssueSec(id, title, responsible, description, severity, status){
    this.issueService.updateIssue(id, title, responsible, description, severity, status).subscribe(() => {
      // this.snackBar.open('Issue updated successfully', 'OK', {
      //   duration: 10000000
      });
      location.reload();
    };

        // if(this.issue.title=="1"){
        // document.getElementById("hannah").classList.add('on');}
}
