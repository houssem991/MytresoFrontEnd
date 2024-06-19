import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccessService} from '../../../shared/services/acces.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-update-access-role',
  templateUrl: './update-access-role.component.html',
  styleUrls: ['./update-access-role.component.scss']
})
export class UpdateAccessRoleComponent implements OnInit {

  AccessRoleFormSubmitted = false;
  AccessRoleForm: UntypedFormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  message = '';
  idrole: any;
  idaccess: any;
  access: any;
  constructor(private formBuilder: UntypedFormBuilder, private router: Router, private route: ActivatedRoute, private accessService: AccessService, private spinner: NgxSpinnerService) {
    this.idrole = this.route['params']['value']['idrole'];
    this.idaccess = this.route['params']['value']['idaccess'];
    this.AccessRoleForm = this.formBuilder.group({
      ajouter: [''],
      modifier: [''],
      supprimer: [''],
      consulter: [''],
    })
    this.getAllAccess();

  }
  getAllAccess(): void {
    this.accessService.findByAccessAndRole(this.idrole, this.idaccess).subscribe(
      data => {
        this.access = data;
        console.log("m" , this.access);
        this.AccessRoleForm.patchValue(data);
      }
    )
  }
  ngOnInit() {
  }

  get rf() {
    return this.AccessRoleForm.controls;
  }


  //  On submit click, reset field value
  onSubmit(): void {
    this.AccessRoleForm.value.roleid = this.idrole;
    console.log(this.AccessRoleForm);
    this.AccessRoleFormSubmitted = true;
    if (this.AccessRoleForm.invalid) {
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
    this.accessService.update(this.idrole, this.idaccess , this.AccessRoleForm).subscribe(
      data => {
        console.log(data)
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.spinner.hide()
        setTimeout(() => {
          this.isSuccessful = false;
          this.router.navigate(['/pages/manage-access', this.idrole])
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
