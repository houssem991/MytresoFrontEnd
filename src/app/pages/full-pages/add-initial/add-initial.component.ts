import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {Router} from '@angular/router';
import {InitialService} from '../../../shared/services/initial.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-add-initial',
  templateUrl: './add-initial.component.html',
  styleUrls: ['./add-initial.component.scss']
})
export class AddInitialComponent implements OnInit {

  initialFormSubmitted = false;
  initialForm: UntypedFormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  message = '';
  iduser: any;
  elements = [
    {name: 'Fournisseur'},
    {name: 'Client'},
    {name: 'Document de vente'},
    {name: 'Document d\'achats'},
    {name: 'Reglement Fournisseur'},
    {name: 'Reglement Client'},
    {name: 'Impaye Fournisseur'},
    {name: 'Impaye Client'},
    {name: 'Banque'},
    {name: 'Caisse'},
    {name: 'Retenu à la source'},
  ];
  constructor(private formBuilder: UntypedFormBuilder, private tokenStorage: TokenStorageService , private router: Router, private initialService: InitialService, private spinner: NgxSpinnerService) {
    this.initialForm = this.formBuilder.group({
      element: [null],
      initial: ['', Validators.required],
      iduser: ['']
    })
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.iduser = this.tokenStorage.getUser().id;
    }
  }

  get rf() {
    return this.initialForm.controls;
  }


  //  On submit click, reset field value
  onSubmit(): void {
    this.initialForm.value.iduser = this.iduser;
    this.initialFormSubmitted = true;
    if (this.initialForm.invalid) {
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
    console.log(this.initialForm);
    this.initialService.add(this.initialForm).subscribe(
      data => {
        console.log(data)
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.spinner.hide()
        setTimeout(() => {
          this.isSuccessful = false;
          this.router.navigate(['/pages/parametre/initialisation'])
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
