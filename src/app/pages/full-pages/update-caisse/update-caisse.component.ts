import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CaisseService} from '../../../shared/services/caisse.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-update-caisse',
  templateUrl: './update-caisse.component.html',
  styleUrls: ['./update-caisse.component.scss']
})
export class UpdateCaisseComponent implements OnInit {

  caisseFormSubmitted = false;
  caisseForm: UntypedFormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  message = '';
  iduser: any;
    idcaisse: any;
  constructor(private formBuilder: UntypedFormBuilder,  private route: ActivatedRoute, private tokenStorage: TokenStorageService , private router: Router, private caisseService: CaisseService, private spinner: NgxSpinnerService) {
      this.idcaisse = this.route['params']['value']['id'];
      this.getById();
    this.caisseForm = this.formBuilder.group({
      libelle: ['', Validators.required],
      solde: ['', Validators.required],
      iduser: ['']
    })
  }
  getById(): void {
    this.caisseService.findById(this.idcaisse).subscribe(
      data => {
        this.caisseForm.patchValue(data) ;

      }
    )
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
    this.caisseService.update(this.idcaisse , this.caisseForm).subscribe(
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
