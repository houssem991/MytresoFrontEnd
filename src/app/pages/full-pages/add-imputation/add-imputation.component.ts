import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ImputationService} from '../../../shared/services/imputation.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {CaisseService} from '../../../shared/services/caisse.service';
import {FactureService} from '../../../shared/services/facture.service';
import {ReglementsService} from '../../../shared/services/reglements.service';

@Component({
  selector: 'app-add-imputation',
  templateUrl: './add-imputation.component.html',
  styleUrls: ['./add-imputation.component.scss']
})
export class AddImputationComponent implements OnInit {

  imputationFormSubmitted = false;
  imputationForm: UntypedFormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  message = '';
  iduser: any;
  idreglement: any;
  caisse: any;
  facture: any;
  code: any;
  constructor(private formBuilder: UntypedFormBuilder,
              private route: ActivatedRoute,
              private tokenStorage: TokenStorageService ,
              private router: Router,
              private imputationService: ImputationService,
              private factureService: FactureService,
              private reglementService: ReglementsService,
              private caisseService: CaisseService,
              private spinner: NgxSpinnerService) {
    this.idreglement = this.route['params']['value']['id'];
    this.imputationForm = this.formBuilder.group({
      idcaisse: [null, Validators.required],
      piece: [null, Validators.required],
      idreglement: [null],
      montant: ['', Validators.required]
    })
  }
  getallCaisse() {
    this.caisseService.getall().subscribe(data => {
      console.log(data);
      this.caisse = data;
    });

  }
  getallFacture() {
    this.reglementService.findById(this.idreglement).subscribe(data => {
      console.log(data);
      this.code = data.tiers;
      this.factureService.getallNonAffecte(this.code).subscribe(data1 => {
        console.log('facture', data1 , this.code);
        this.facture = data1;
      });
    });
  }
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.iduser = this.tokenStorage.getUser().id;
      this.getallCaisse()
      this.getallFacture()
    }
  }

  get rf() {
    return this.imputationForm.controls;
  }


  //  On submit click, reset field value
  onSubmit(): void {
    this.imputationForm.value.iduser = this.iduser;
    this.imputationFormSubmitted = true;
    if (this.imputationForm.invalid) {
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
    console.log(this.imputationForm);
    this.imputationForm.value.idreglement = this.idreglement;
    this.imputationService.add(this.imputationForm).subscribe(
      data => {
        console.log(data)
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.spinner.hide()
        setTimeout(() => {
          this.isSuccessful = false;
          this.router.navigate(['/pages/affectation', this.idreglement])
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
