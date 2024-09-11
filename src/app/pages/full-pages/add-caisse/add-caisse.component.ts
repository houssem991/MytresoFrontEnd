import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {CaisseService} from '../../../shared/services/caisse.service';

@Component({
  selector: 'app-add-caisse',
  templateUrl: './add-caisse.component.html',
  styleUrls: ['./add-caisse.component.scss']
})
export class AddCaisseComponent implements OnInit {

  caisseFormSubmitted = false;
  caisseForm: UntypedFormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  message = '';
  iduser: any;
  constructor(private formBuilder: UntypedFormBuilder, private tokenStorage: TokenStorageService , private router: Router, private caisseService: CaisseService, private spinner: NgxSpinnerService) {
    this.caisseForm = this.formBuilder.group({
      libelle: ['', Validators.required],
      solde: ['', Validators.required],
      iduser: ['']
    })
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.iduser = this.tokenStorage.getUser().id;
    }
  }

  get rf() {
    return this.caisseForm.controls;
  }


  //  On submit click, reset field value
  onSubmit(): void {
    this.caisseForm.value.iduser = this.iduser;
    this.caisseFormSubmitted = true;
    if (this.caisseForm.invalid) {
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
    console.log(this.caisseForm);
    this.caisseService.add(this.caisseForm).subscribe(
      data => {
        console.log(data)
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.spinner.hide()
        setTimeout(() => {
          this.isSuccessful = false;
          this.router.navigate(['/pages/Caisse'])
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
