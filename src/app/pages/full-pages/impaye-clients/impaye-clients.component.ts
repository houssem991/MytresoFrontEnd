import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {LocalDataSource} from 'ng2-smart-table';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {RoleService} from '../../../shared/services/role.service';
import {ReglementsService} from '../../../shared/services/reglements.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UtilisateurService} from '../../../shared/services/utilisateur.service';
import {AccessService} from '../../../shared/services/acces.service';

@Component({
  selector: 'app-impaye-clients',
  templateUrl: './impaye-clients.component.html',
  styleUrls: ['./impaye-clients.component.scss']
})
export class ImpayeClientsComponent implements OnInit {
  source: LocalDataSource;
  startDate: string;
  endDate: string;
  reglements: any;
  settings = {
    columns: {
      num: {
        title: 'Num'
      },
      tiers: {
        title: 'Client'
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
      estComptablise: {
        title: 'EstComptablise'
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
  selectedRecord: any = {};
  TypeReg = [
    {  type: 'ESPECE' },
    {  type: 'VIREMENT' },
    {  type: 'CHEQUE' },
    {  type: 'TRAITE' }
  ];
  entrepriseFormSubmitted = false;
  entrepriseForm: UntypedFormGroup;
  alimentationFormSubmitted = false;
  alimentationForm: UntypedFormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  user: any;
  iduser: any;
  idimpaye: any;
  namerole: any;
  idrole: any;
  identreprise: any;
  access: any;
  rolee: any;
  message: any;
  isSucces = false ;
  constructor(private router: Router, private tokenStorage: TokenStorageService,
              private roleService: RoleService,
              private formBuilder: UntypedFormBuilder,
              private reglementsService: ReglementsService,
              private spinner: NgxSpinnerService,
              private modalService: NgbModal,
              private utilisateurService: UtilisateurService,
              private accessService: AccessService,
              private cdr: ChangeDetectorRef) {
    this.entrepriseForm = this.formBuilder.group({
      datedebut: [Date, Validators.required],
      datefin: [Date, Validators.required],
    })
    this.alimentationForm = this.formBuilder.group({
      reference: [''],
      dateEcheance: [Date],
      type: [null , Validators.required],
      banque: [''],
      numpiece : [''],
    })
  }
  onSubmit(): void {

    this.alimentationFormSubmitted = true;
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
    this.idimpaye = this.selectedRecord.num;
    this.reglementsService.reglerImpayer(this.idimpaye, this.alimentationForm).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.spinner.hide()
        this.message = data['message']
        console.log(this.message)
        setTimeout(() => {
          this.isSuccessful = false;
          window.location.reload()
        }, 2000);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSuccessful = false;
        this.isSignUpFailed = true;
        this.spinner.hide();
      }
    );
  }
  get rf() {
    return this.entrepriseForm.controls;
  }
  get tf() {
    return this.alimentationForm.controls;
  }
  onStartDateChange(event: any) {
    this.startDate = event.target.value;
    this.applyFilter();
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
    this.reglementsService.getallImpayesClients(iduser).subscribe(data => {
      this.reglements = data;
      this.source = new LocalDataSource(this.reglements);
      this.cdr.detectChanges();
    });

  }

  delete($id) {
    this.roleService.delete($id).subscribe(data => {
      window.location.reload();
    });
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
    this.reglementsService.importerClients(this.entrepriseForm.value.datedebut, this.entrepriseForm.value.datefin).subscribe(data => {
      this.message = data.message;
      this.isSucces = true ;
      this.spinner.hide();
      setTimeout(() => {
        this.isSucces = false ;
        window.location.reload();
      }, 5000 )
    });
  }

  onclicktable($event, template) {
    if ($event.action === 'update') {
      this.selectedRecord = { ...$event.data };
      this.open(template)
      this.idimpaye = this.selectedRecord.num;
    } else if ($event.action === 'show') {
    } else if ($event.action === 'delete') {
      if (window.confirm('Voulez vous vraiment supprimer ce role?')) {
        this.delete($event['data']['id']);
        window.location.reload();

      } else {
        $event.confirm.reject();
      }
    } else {
      this.router.navigate(['pages/gestion-fournisseurs/facture', $event['data']['id']]);

    }

  }
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.namerole = this.tokenStorage.getUser().roles[0];
      this.iduser = this.tokenStorage.getUser().id;
      this.utilisateurService.findById(this.iduser).subscribe(
          data => {
            this.identreprise = data.identreprise ;
            this.getall(this.iduser);
          });
      this.roleService.findByName(this.namerole).subscribe(data => {
        this.rolee = data;
        this.idrole = this.rolee.id;
        this.accessService.findByAccessTitleAndRole(this.rolee.id, 'Imapyes Clients').subscribe(
            data1 => {
              this.access = data1
              if (this.access.modifier === true) {
                this.settings.actions.custom.push({
                  name: 'update',
                  title: '<a  href=""  ><i class="fa fa-wrench px-1" aria-hidden="true"></i></a>'
                });
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
