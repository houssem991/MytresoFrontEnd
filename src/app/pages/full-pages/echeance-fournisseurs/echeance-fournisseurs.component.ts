import {ChangeDetectorRef, Component, OnInit, Renderer2} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {RoleService} from '../../../shared/services/role.service';
import {ReglementsService} from '../../../shared/services/reglements.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {UtilisateurService} from '../../../shared/services/utilisateur.service';
import {RsService} from '../../../shared/services/rs.service';
import {FournisseursService} from '../../../shared/services/fournisseurs.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AccessService} from '../../../shared/services/acces.service';

@Component({
  selector: 'app-echeance-fournisseurs',
  templateUrl: './echeance-fournisseurs.component.html',
  styleUrls: ['./echeance-fournisseurs.component.scss']
})
export class EcheanceFournisseursComponent implements OnInit {

  source: LocalDataSource;
  startDate: string;
  endDate: string;
  reglements: any;
  settings = {
    columns: {
      num: {
        title: 'Num'
      },
      dateReglement: {
        title: 'Date'
      },
      reference: {
        title: 'Reference'
      },
      libelle: {
        title: 'Libelle'
      },
      solde: {
        title: 'Solde'
      },
      soldeRestant: {
        title: 'Solde Restant'
      },
      soldeDev: {
        title: 'SoldeDev'
      },
      estAffecte: {
        title: 'EstAffecte'
      },
      estComptablise: {
        title: 'EstComptablise'
      },
      type: {
        title: 'Type'
      },
      numPiece: {
        title: 'NumPiece'
      },
      etat: {
        title: 'Etat',
        filter: {
          type: 'list',
          config: {
            selectText: 'select .....',
            list: [
              {value: 'NonAffecter', title: 'NonAffecter'},
              {value: 'PartAffecter', title: 'PartAffecter'},
              {value: 'TotAffecter', title: 'TotAffecter'},
            ]
          }
        }
      },
      impaye: {
        title: 'Impaye',
        valuePrepareFunction: (cell, row) => {
          return { value: cell, class: row.impaye ? 'text-danger' : '' };
        }
      },
      tiers: {
        title: 'Fournisseur'
      },
    },
    attr: {
      class: 'table table-responsive'
    },
    actions: {
      columnTitle: '',
      custom: [],
      add: false,
      delete: false,
      edit: false,
      position: 'right'
    }
  };
  TypeReglement = [
    {  name: 'Espèce' },
    {  name: 'Banquaire' }
  ];
  TypeReg = [
    {  type: 'ESPECE' },
    {  type: 'VIREMENT' },
    {  type: 'CHEQUE' },
    {  type: 'TRAITE' }
  ];
  entrepriseFormSubmitted = false;
  typeFormSubmitted = false;
  alimentationFormubmitted = false;
  typeForm: UntypedFormGroup;
  alimentationForm: UntypedFormGroup;
  entrepriseForm: UntypedFormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  user: any;
  iduser: any;
  namerole: any;
  idrole: any;
  identreprise: any;
  openIndices: Set<number> = new Set<number>();
  access: any;
  today: any;
  rolee: any;
  rs: any;
  caisse: any;
  fournisseur: any;
  message: any;
  isSucces = false ;
  constructor(private router: Router, private tokenStorage: TokenStorageService,
              private roleService: RoleService,
              private formBuilder: UntypedFormBuilder,
              private reglementsService: ReglementsService,
              private spinner: NgxSpinnerService,
              private utilisateurService: UtilisateurService,
              private rsService: RsService,
              private fournisseurService: FournisseursService,
              private modalService: NgbModal,
              private renderer: Renderer2,
              private accessService: AccessService,
              private cdr: ChangeDetectorRef) {
    this.today = this.getFormattedDate(new Date())
  }
  getFormattedDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Ajoute un zéro si nécessaire
    const day = ('0' + date.getDate()).slice(-2);          // Ajoute un zéro si nécessaire
    return `${year}-${month}-${day}`;
  }
  onStartDateChange(event: any) {
    this.startDate = event.target.value;
    this.applyFilter();
  }
  retourImpaye(num): void {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
    this.reglementsService.impayeFournisseurs(this.iduser, num).subscribe(value => {
      this.message = value.message;
      this.isSuccessful = true ;
      this.spinner.hide();
      setTimeout(() => {
        this.isSuccessful = false ;
      }, 5000 )
    });
  }
  onEndDateChange(event: any) {
    this.endDate = event.target.value;
    this.applyFilter();
  }
  applyFilter() {
    let filteredData = this.reglements;

    if (this.startDate) {
      filteredData = filteredData.filter(item => new Date(item.dateReglement) >= new Date(this.startDate));
    }

    if (this.endDate) {
      filteredData = filteredData.filter(item => new Date(item.dateReglement) <= new Date(this.endDate));
    }

    this.source.load(filteredData);
  }
  open(content) {
    this.modalService.open(content);
  }
  getall(iduser) {
    this.reglementsService.getallEcheancierFournisseus(iduser).subscribe(data => {
      console.log(data);
      this.reglements = data;
      this.source = new LocalDataSource(this.reglements);
      this.cdr.detectChanges();
    });
  }
  getallRs() {
    this.rsService.getall().subscribe(data => {
      console.log(data);
      this.rs = data;
    });
  }

  delete($id) {
    this.roleService.delete($id).subscribe(data => {
      window.location.reload();
    });
  }
   // index de la ligne actuellement ouverte
  toggleDetails(index: number) {
    if (this.openIndices.has(index)) {
      this.openIndices.delete(index); // Fermer la ligne si elle est déjà ouverte
    } else {
      this.openIndices.add(index); // Ouvrir la ligne
    }
  }

  printTable() {
    const printableContent = document.getElementById('printableContent');
    const originalContent = document.body.innerHTML;

    // Afficher la vue imprimable
    printableContent.style.display = 'block';

    // Masquer le reste du contenu
    document.body.innerHTML = printableContent.innerHTML;

    window.print();

    // Restaurer le contenu original
    document.body.innerHTML = originalContent;

    // Masquer à nouveau la vue imprimable
    printableContent.style.display = 'none';
  }
  importer() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
    this.reglementsService.importerFournisseurs(this.entrepriseForm.value.datedebut, this.entrepriseForm.value.datefin).subscribe(data => {
      this.message = data.message;
      this.isSucces = true ;
      this.spinner.hide();
      setTimeout(() => {
        this.isSucces = false ;
        window.location.reload();
      }, 5000 )
    });
  }

  getallFournisseurs() {
    this.fournisseurService.getall(this.identreprise, this.iduser).subscribe(data => {
      console.log(data);
      this.fournisseur = data;
    });

  }
  get rf() {
    return this.alimentationForm.controls;
  }
  get lf() {
    return this.entrepriseForm.controls;
  }
  get tf() {
    return this.typeForm.controls;
  }
  onSubmit(): void {

    this.alimentationFormubmitted = true;
    if (this.alimentationForm.invalid) {
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
    console.log(this.alimentationForm);
    this.reglementsService.addFournisseurs(this.alimentationForm ).subscribe(
      data => {
        console.log('message', data['message'])
        this.isSucces = true;
        this.isSignUpFailed = false;
        this.spinner.hide()
        this.message = data['message']
        setTimeout(() => {
          this.isSucces = false;
          window.location.reload()
        }, 2000);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSucces = false;
        this.isSignUpFailed = true;
        this.spinner.hide();
      }
    );
    console.log(this.isSucces, this.isSignUpFailed)
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.namerole = this.tokenStorage.getUser().roles[0];
      this.iduser = this.tokenStorage.getUser().id;
      this.utilisateurService.findById(this.iduser).subscribe(
        data => {
          this.identreprise = data.identreprise ;
          console.log("user", this.user)
          this.getall(this.iduser);
          this.getallFournisseurs()
          this.getallRs()
        });
      this.roleService.findByName(this.namerole).subscribe(data => {
        this.rolee = data;
        this.idrole = this.rolee.id;
        console.log("data", data)
        this.accessService.findByAccessTitleAndRole(this.rolee.id, 'Gestion des Fournisseurs').subscribe(
          data1 => {
            this.access = data1
            console.log("m", this.access)
            if (this.access.consulter === true) {
              this.settings.actions.custom.push({
                name: 'impaye',
                title: '<a  href=""><i class="bi bi-file-earmark-excel px-1" title="retour impaye" aria-hidden="false" ></i></a>'
              })
              this.settings.actions.custom.push({
                name: 'show',
                title: '<a  href=""><i class="fa fa-eye px-1" title="Imputation" aria-hidden="false" ></i></a>'
              })
            }
            this.settings = this.clone(this.settings);
            this.cdr.detectChanges();
          })


      })
    }
  }
  clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

}
