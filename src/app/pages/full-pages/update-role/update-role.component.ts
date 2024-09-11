import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RoleService} from '../../../shared/services/role.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {TokenStorageService} from '../../../shared/services/token-storage.service';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent implements OnInit {
  form: any = {};
  roleFormSubmitted = false;
  roleForm: UntypedFormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  message = '';
  idrole: any;
  iduser: any;
  role: any;
  constructor(private formBuilder: UntypedFormBuilder, private tokenStorage: TokenStorageService , private router: Router, private roleService: RoleService, private spinner: NgxSpinnerService, private route: ActivatedRoute) {
    this.idrole = this.route['params']['value']['id'];
   this.getById();
    this.roleForm = this.formBuilder.group({
      name: ['' , Validators.required],
      iduser: ['']

    })
  }
getById(): void {
    this.roleService.findById(this.idrole).subscribe(
        data => {
      this.roleForm.patchValue(data) ;

    }
    )
}
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.iduser = this.tokenStorage.getUser().id;
    }
  }
  get rf() {
    return this.roleForm.controls;
  }


  //  On submit click, reset field value
  onSubmit(): void {
    this.roleForm.value.iduser = this.iduser;

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
    this.roleService.update(this.idrole, this.roleForm).subscribe(
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
