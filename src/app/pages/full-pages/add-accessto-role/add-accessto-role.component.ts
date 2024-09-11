import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {AccessService} from '../../../shared/services/acces.service';

@Component({
  selector: 'app-add-accessto-role',
  templateUrl: './add-accessto-role.component.html',
  styleUrls: ['./add-accessto-role.component.scss']
})
export class AddAccesstoRoleComponent implements OnInit {

  AccessRoleFormSubmitted = false;
  AccessRoleForm: UntypedFormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  message = '';
  idrole: any;
  access: any;
  constructor(private formBuilder: UntypedFormBuilder, private router: Router, private route: ActivatedRoute, private accessService: AccessService, private spinner: NgxSpinnerService) {
    this.idrole = this.route['params']['value']['id'];
    this.AccessRoleForm = this.formBuilder.group({
      roleid: [''],
      accesid: [null, Validators.required],
      ajouter: [''],
      modifier: [''],
      supprimer: [''],
      consulter: [''],
    })
    this.getAllAccess();

  }
getAllAccess(): void {
    this.accessService.findaccessByIdrole(this.idrole).subscribe(
      data => {
        this.access = data;
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
    this.accessService.add(this.AccessRoleForm).subscribe(
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
