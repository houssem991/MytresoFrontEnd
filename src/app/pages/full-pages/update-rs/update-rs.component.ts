import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {RsService} from '../../../shared/services/rs.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-update-rs',
  templateUrl: './update-rs.component.html',
  styleUrls: ['./update-rs.component.scss']
})
export class UpdateRSComponent implements OnInit {

  rsFormSubmitted = false;
  rsForm: UntypedFormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  message = '';
  iduser: any;
  idrs: any;
  constructor(private formBuilder: UntypedFormBuilder, private route: ActivatedRoute, private tokenStorage: TokenStorageService , private router: Router, private rsService: RsService, private spinner: NgxSpinnerService) {
    this.idrs = this.route['params']['value']['id'];
    this.getById();
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
  getById(): void {
    this.rsService.findById(this.idrs).subscribe(
      data => {
        this.rsForm.patchValue(data) ;

      }
    )
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
    this.rsService.update(this.idrs, this.rsForm).subscribe(
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
