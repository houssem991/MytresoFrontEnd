import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {Router} from '@angular/router';
import {BanqueService} from '../../../shared/services/banque.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-add-banque',
  templateUrl: './add-banque.component.html',
  styleUrls: ['./add-banque.component.scss']
})
export class AddBanqueComponent implements OnInit {

  banqueFormSubmitted = false;
  banqueForm: UntypedFormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  message = '';
  iduser: any;
  constructor(private formBuilder: UntypedFormBuilder, private tokenStorage: TokenStorageService , private router: Router, private banqueService: BanqueService, private spinner: NgxSpinnerService) {
    this.banqueForm = this.formBuilder.group({
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
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
    return this.banqueForm.controls;
  }


  //  On submit click, reset field value
  onSubmit(): void {
    this.banqueForm.value.iduser = this.iduser;
    this.banqueFormSubmitted = true;
    if (this.banqueForm.invalid) {
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
    console.log(this.banqueForm);
    this.banqueService.add(this.banqueForm).subscribe(
        data => {
          console.log(data)
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.spinner.hide()
          setTimeout(() => {
            this.isSuccessful = false;
            this.router.navigate(['/pages/banque'])
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
