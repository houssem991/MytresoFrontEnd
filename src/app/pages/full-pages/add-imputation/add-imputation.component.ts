import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ImputationService} from '../../../shared/services/imputation.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {CaisseService} from '../../../shared/services/caisse.service';
import {FactureService} from '../../../shared/services/facture.service';
import {ReglementsService} from '../../../shared/services/reglements.service';
import {BanqueService} from '../../../shared/services/banque.service';
import { Decimal } from 'decimal.js';
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
  reglement: any;
  code: any;
  banque: any;
  montantselect: Decimal;
  soldeRestant: Decimal;
  soldeRestantPres: Decimal;
  soldeRestantInit: Decimal;
  pieceIDs: string[] = [];
  constructor(private formBuilder: UntypedFormBuilder,
              private route: ActivatedRoute,
              private tokenStorage: TokenStorageService ,
              private router: Router,
              private imputationService: ImputationService,
              private cdr: ChangeDetectorRef,
              private factureService: FactureService,
              private banqueService: BanqueService,
              private reglementService: ReglementsService,
              private caisseService: CaisseService,
              private spinner: NgxSpinnerService) {
    this.idreglement = this.route['params']['value']['id'];
    this.imputationForm = this.formBuilder.group({
      idcaisse: [null],
      idbanque: [null],
      piece: [[]],
      idreglement: [null],
      montant: ['']
    })
  }
  getallCaisse() {
    this.caisseService.getall().subscribe(data => {
      console.log(data);
      this.caisse = data;
    });

  }
  getallBanque() {
    this.banqueService.getall().subscribe(data => {
      console.log(data);
      this.banque = data;
    });

  }
  getallFacture() {
    this.reglementService.findById(this.idreglement).subscribe(data => {
      console.log(data);
      this.reglement = data
      this.soldeRestant = data.soldeRestant
      this.soldeRestantInit = data.soldeRestant
      this.code = data.tiers;
      this.factureService.getallNonAffecte(this.code).subscribe(data1 => {
        this.facture = data1;
        this.facture = this.facture.map(facture => ({
          ...facture,
          selected: false,
          disabled: false// Initialement non sélectionné
        }));
        console.log('facture', this.facture , this.code);
      });
    });
  }
  onCheckboxChange(index: number, isSelected: boolean) {
    // Met à jour l'état de la facture correspondante
    this.facture[index].selected = isSelected;
    const facture = this.facture[index];
    this.soldeRestant = new Decimal(this.soldeRestant)
    if (this.soldeRestant.greaterThan(0)){
      this.soldeRestantPres = this.soldeRestant
    }
    // Si la case est cochée, ajouter l'ID à la liste
    if (isSelected) {
      this.pieceIDs.push(facture.id);
      this.soldeRestant = this.soldeRestant.sub(new Decimal(facture.resteAPayer))
      if(this.soldeRestant.lessThanOrEqualTo(new Decimal(0))) {
        this.soldeRestant = new Decimal(0)
      }
      console.log('Ids', this.pieceIDs)
    } else {
      this.pieceIDs = this.pieceIDs.filter(id => id !== facture.id);
      if (this.soldeRestant.equals(0)) {
        this.soldeRestant = this.soldeRestant.plus(this.soldeRestantPres)
      } else {
        this.soldeRestant = this.soldeRestant.plus(new Decimal(facture.resteAPayer))
      }
      console.log('Ids', this.pieceIDs)
    }
    // Recalcule le montant total
    this.calculateTotal();
    this.updateCheckboxStates()
    this.cdr.detectChanges();
    console.log('facture', this.facture);
  }
  trackById(index: number, facture: any): number {
    return facture.id;
  }
  calculateTotal() {

    this.montantselect = new Decimal(0);
    // Ajouter les montants des factures sélectionnées avec Decimal.js
    this.facture
      .filter(facture => facture.selected)
      .forEach(facture => {
          this.montantselect = this.montantselect.plus(new Decimal(facture.resteAPayer));
      });
if (this.soldeRestant.lessThanOrEqualTo(0)) {
   this.montantselect = new Decimal(this.soldeRestantInit)
}
    console.log('Total:', this.montantselect.toNumber());
  }
  updateCheckboxStates() {
    this.facture = this.facture.map(facture => {
      facture.disabled = this.soldeRestant.lessThanOrEqualTo(0) && !facture.selected;
      console.log('disabled', facture.disabled)
      return facture;
    });
    setTimeout(() => {
      this.facture = [...this.facture]; // Recréation du tableau pour la réactivité
    }, 0);
  }
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.montantselect = new Decimal(0);
      this.iduser = this.tokenStorage.getUser().id;
      this.getallCaisse()
      this.getallFacture()
      this.getallBanque()
    }
  }

  get rf() {
    return this.imputationForm.controls;
  }


  //  On submit click, reset field value
  onSubmit(): void {
    this.imputationFormSubmitted = true;
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
    this.imputationForm.value.piece = this.pieceIDs;
    this.imputationForm.value.montant = this.montantselect.toNumber();
    this.imputationForm.value.idreglement = this.idreglement;
    console.log(this.imputationForm);
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
