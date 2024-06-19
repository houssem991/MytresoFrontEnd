import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../shared/services/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MustMatch} from '../../../shared/directives/must-match.validator';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {number} from 'ngx-custom-validators/src/app/number/validator';

@Component({
  selector: 'app-register-collaborator',
  templateUrl: './register-collaborator.component.html',
  styleUrls: ['./register-collaborator.component.scss']
})
export class RegisterCollaboratorComponent implements OnInit {

  registerFormSubmitted = false;
  registerForm: UntypedFormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
roleid: number;
entrepriseid: number;
emailC: any;

  selectedFiles: FileList;
  selected: FileList;
  currentFile: File;
  current: File;
  message = '';

  constructor(private formBuilder: UntypedFormBuilder, private router: Router, private route: ActivatedRoute , private authService: AuthService, private spinner: NgxSpinnerService) {
    this.roleid = this.route['params']['value']['idrole'];
    this.entrepriseid = this.route['params']['value']['identreprise'];
    this.emailC = this.route['params']['value']['email'];
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      image: [''],
      idrole: [],
      identreprise: [],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  ngOnInit() {
  }

  get rf() {
    return this.registerForm.controls;
  }


  //  On submit click, reset field value
  onSubmit(): void {
this.registerForm.value.idrole = this.roleid;
this.registerForm.value.identreprise = this.entrepriseid;
    console.log("reg", this.registerForm)
    this.registerFormSubmitted = true;
    if (this.registerForm.invalid) {
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
this.authService.decryptemail(this.emailC).subscribe(data => {
  this.registerForm.value.email = data.message



    console.log(this.registerForm);
    this.authService.registerCollaborator(this.registerForm).subscribe(
      data1 => {
        if (this.registerForm.value.image !== '') {
        this.currentFile = this.selectedFiles.item(0);
        this.authService.uploadimage( data1.message, this.currentFile).subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
            } else if (event instanceof HttpResponse) {
              this.message = 'le fichier a téléchargé avec succès';
            }
          },
          err => {
            this.message = 'le fichier a téléchargé avec succès';
            this.currentFile = undefined;
          });
        }
        this.selectedFiles = undefined;
        this.selected = undefined;
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.spinner.hide();
        setTimeout(() => {
          this.isSuccessful = false;
          this.router.navigate(['/pages/login'])
        }, 2000);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSuccessful = false;
        this.isSignUpFailed = true;
        this.spinner.hide();
      }
    );
});

  }


  selectFile(event): void {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }

}
