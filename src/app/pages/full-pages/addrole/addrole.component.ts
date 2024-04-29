import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import {RoleService} from '../../../shared/services/role.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-addrole',
  templateUrl: './addrole.component.html',
  styleUrls: ['./addrole.component.scss']
})
export class AddroleComponent implements OnInit {

  roleFormSubmitted = false;
  roleForm: UntypedFormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  message = '';
  constructor(private formBuilder: UntypedFormBuilder, private router: Router, private roleService: RoleService, private spinner: NgxSpinnerService) {
    this.roleForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  get rf() {
    return this.roleForm.controls;
  }


  //  On submit click, reset field value
  onSubmit(): void {

    this.roleFormSubmitted = true;
    if (this.roleForm.invalid) {
      return;
    }
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
    console.log(this.roleForm);
    this.roleService.add(this.roleForm).subscribe(
      data => {
        console.log(data)
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.spinner.hide()
          setTimeout(() => {
              this.isSuccessful = false;
              this.router.navigate(['/pages/agents-role'])
          }, 2000);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSuccessful = false;
        this.isSignUpFailed = true;
        this.spinner.hide();
      }
    );
      console.log(this.isSuccessful, this.isSignUpFailed)
  }

}

