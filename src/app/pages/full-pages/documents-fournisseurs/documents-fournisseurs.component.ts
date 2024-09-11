import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../../../shared/services/token-storage.service';
import { RoleService } from '../../../shared/services/role.service';
import { FactureService } from '../../../shared/services/facture.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilisateurService } from '../../../shared/services/utilisateur.service';
import { AccessService } from '../../../shared/services/acces.service';
import { DateRangeFilterComponent } from '../date-range-filter/date-range-filter.component';
import { LocalDataSource } from 'ng2-smart-table';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CaisseService} from '../../../shared/services/caisse.service';
import {RsService} from '../../../shared/services/rs.service';
import {BanqueService} from '../../../shared/services/banque.service';

@Component({
  selector: 'app-documents-fournisseurs',
  templateUrl: './documents-fournisseurs.component.html',
  styleUrls: ['./documents-fournisseurs.component.scss']
})
export class DocumentsFournisseursComponent implements OnInit {
  source: LocalDataSource;
  startDate: string;
  endDate: string;
  facture: any;
  settings = {
    columns: {
      id: {
        title: 'N° Pièce'
      },
      valide: {
        title: 'Validé'
      },
      documentDate: {
        title: 'Date',
      },
      clientCode: {
        title: 'Fournisseur'
      },
      netAPayer: {
        title: 'Net à Payer'
      },
      etat: {
        title: 'Etat',
        filter: {
          type: 'list',
          config: {
            selectText: 'select .....',
            list: [
              {value: 'NonRegle', title: 'NonRegle'},
              {value: 'PartRegle', title: 'PartRegle'},
              {value: 'TotRegle', title: 'TotRegle'},
            ]
          }
        }
      },
      montantRegle: {
        title: 'Montant réçu'
      },
      resteAPayer: {
        title: 'Reste à payer'
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
  TypeReg = [
    {  type: 'ESPECE' },
    {  type: 'VIREMENT' },
    {  type: 'CHEQUE' },
    {  type: 'TRAITE' }
  ];
  user: any;
  caisse: any;
  iduser: any;
  idfacture: any;
  idfournisseur: any;
  namerole: any;
  idrole: any;
  rs: any;
  identreprise: any;
  access: any;
  rolee: any;
  message: any;
  banque: any;
  isSucces = false;
  alimentationForm: UntypedFormGroup;
  alimentationFormubmitted = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  selectedRecord: any = {};
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private roleService: RoleService,
    private factureService: FactureService,
    private caisseService: CaisseService,
    private banqueService: BanqueService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private rsService: RsService,
    private formBuilder: UntypedFormBuilder,
    private utilisateurService: UtilisateurService,
    private accessService: AccessService,
    private cdr: ChangeDetectorRef
  ) {
    this.idfournisseur = this.route['params']['value']['id'];
    this.alimentationForm = this.formBuilder.group({
      reference: [''],
      rs: [false],
      dateEcheance: [Date],
      percentageRs: [null],
      type: [null],
      banque: [''],
      numpiece : [''],
      solde: ['', Validators.required],
      idcaisse: [null],
      idbanque: [null],
    })
  }
  onStartDateChange(event: any) {
    this.startDate = event.target.value;
    this.applyFilter();
  }

  onEndDateChange(event: any) {
    this.endDate = event.target.value;
    this.applyFilter();
  }
  open(content) {
    this.modalService.open(content);
  }
  applyFilter() {
    let filteredData = this.facture;

    if (this.startDate) {
      filteredData = filteredData.filter(item => new Date(item.documentDate) >= new Date(this.startDate));
    }

    if (this.endDate) {
      filteredData = filteredData.filter(item => new Date(item.documentDate) <= new Date(this.endDate));
    }

    this.source.load(filteredData);
  }
  getall() {
    this.factureService.getallDocumentsFournisseurs(this.iduser).subscribe(data => {
      this.facture = data;
      this.source = new LocalDataSource(this.facture);
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

  importer(iduser) {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
    this.factureService.importerFournisseurs(iduser).subscribe(data => {
      this.message = data.message;
      this.isSucces = true ;
      this.spinner.hide();
      setTimeout(() => {
        this.isSucces = false ;
        window.location.reload();
      }, 5000 );
    });
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
  get rf() {
    return this.alimentationForm.controls;
  }
  onclicktable($event , template ) {
    if ($event.action === 'update') {
      this.selectedRecord = { ...$event.data };
      console.log('select', this.selectedRecord)
      this.open(template)    } else if ($event.action === 'show') {
      this.router.navigate(['pages/gestion-fournisseurs/facture/detail', $event['data']['id']]);
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
    console.log('select', this.selectedRecord)
    this.idfacture = this.selectedRecord.id;
    console.log(this.alimentationForm);
    this.factureService.reglerFournisseurs(this.alimentationForm , this.idfacture ).subscribe(
        data => {
          console.log('message', data['message'])
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.spinner.hide()
          this.message = data['message']
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
    console.log(this.isSuccessful, this.isSignUpFailed)
  }
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.namerole = this.tokenStorage.getUser().roles[0];
      this.iduser = this.tokenStorage.getUser().id;
      this.utilisateurService.findById(this.iduser).subscribe(data => {
        this.identreprise = data.identreprise ;
        this.getall();
        this.getallCaisse();
        this.getallRs()
        this.getallBanque()
      });
      this.roleService.findByName(this.namerole).subscribe(data => {
        this.rolee = data;
        this.idrole = this.rolee.id;
        this.accessService.findByAccessTitleAndRole(this.rolee.id, 'Documents Fournisseurs').subscribe(data1 => {
          this.access = data1;
          if (this.access.consulter === true) {
            this.settings.actions.custom.push({
              name: 'show',
              title: '<a href=""><i class="fa fa-eye px-1" aria-hidden="false"></i></a>'
            });
          }
          if (this.access.modifier === true) {
            this.settings.actions.custom.push({
              name: 'update',
              title: '<a  href=""  ><i class="fa fa-wrench px-1" aria-hidden="true"></i></a>'
            })
          }
          this.settings = this.clone(this.settings);
          this.cdr.detectChanges();
        });
      });
    }
  }
  clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}
