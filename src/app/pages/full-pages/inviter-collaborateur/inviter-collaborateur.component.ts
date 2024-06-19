import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EntrepriseService} from '../../../shared/services/entreprise.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {RoleService} from '../../../shared/services/role.service';
import {AuthService} from '../../../shared/services/auth.service';
import {UtilisateurService} from '../../../shared/services/utilisateur.service';

@Component({
  selector: 'app-inviter-collaborateur',
  templateUrl: './inviter-collaborateur.component.html',
  styleUrls: ['./inviter-collaborateur.component.scss']
})
export class InviterCollaborateurComponent implements OnInit {

  entrepriseFormSubmitted = false;
  entrepriseForm: UntypedFormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  message = '';
  roleid: any;
  iduser: any;
  user: any;
  role: any;
  useremail: any;
  constructor(private formBuilder: UntypedFormBuilder,
              private tokenStorage: TokenStorageService,
              private roleService: RoleService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UtilisateurService,
              private authService: AuthService,
              private spinner: NgxSpinnerService) {
    this.entrepriseForm = this.formBuilder.group({
      emailCollabrator: ['', [Validators.required, Validators.email]],
      email: [''],
      idrole: ['', Validators.required]
    })
  }
  getall(identreprise, idrole, iduser) {
    this.roleService.getall(identreprise, idrole, iduser).subscribe(data => {
      console.log("roles",data);
      this.role = data;
    });

  }
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.useremail = this.tokenStorage.getUser().email;
      this.iduser = this.tokenStorage.getUser().id;
      this.userService.findById(this.iduser).subscribe(data => {
        this.user = data
        this.getall(this.user.identreprise, this.user.roles[0].id , this.iduser);
      });
    }

  }

  get rf() {
    return this.entrepriseForm.controls;
  }


  //  On submit click, reset field value
  onSubmit(): void {
    this.entrepriseForm.value.email = this.useremail
    this.entrepriseFormSubmitted = true;
    if (this.entrepriseForm.invalid) {
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
    console.log(this.entrepriseForm);
    this.authService.inviter(this.entrepriseForm).subscribe(
      data => {
        console.log(data)
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.spinner.hide()
        setTimeout(() => {
          this.isSuccessful = false;
          this.router.navigate(['dashboard/dashboard1'])
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
