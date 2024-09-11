import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {Router} from '@angular/router';
import {RsService} from '../../../shared/services/rs.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-add-rs',
  templateUrl: './add-rs.component.html',
  styleUrls: ['./add-rs.component.scss']
})
export class AddRSComponent implements OnInit {

  rsFormSubmitted = false;
  rsForm: UntypedFormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  message = '';
  iduser: any;
  constructor(private formBuilder: UntypedFormBuilder, private tokenStorage: TokenStorageService , private router: Router, private rsService: RsService, private spinner: NgxSpinnerService) {
    this.rsForm = this.formBuilder.group({
      pourcentage: ['', Validators.required],
      iduser: ['']
    })
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.iduser = this.tokenStorage.getUser().id;
    }
  }

  get rf() {
    return this.rsForm.controls;
  }


  //  On submit click, reset field value
  onSubmit(): void {
    this.rsForm.value.iduser = this.iduser;
    this.rsFormSubmitted = true;
    if (this.rsForm.invalid) {
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
    console.log(this.rsForm);
    this.rsService.add(this.rsForm).subscribe(
      data => {
        console.log(data)
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.spinner.hide()
        setTimeout(() => {
          this.isSuccessful = false;
          this.router.navigate(['/pages/parametre/rs'])
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
