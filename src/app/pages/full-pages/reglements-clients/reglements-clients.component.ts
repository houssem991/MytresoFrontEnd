import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {RoleService} from '../../../shared/services/role.service';
import {ReglementsService} from '../../../shared/services/reglements.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {UtilisateurService} from '../../../shared/services/utilisateur.service';
import {AccessService} from '../../../shared/services/acces.service';
import {LocalDataSource} from 'ng2-smart-table';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ClientsService} from '../../../shared/services/clients.service';
import {RsService} from '../../../shared/services/rs.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-reglements-clients',
  templateUrl: './reglements-clients.component.html',
  styleUrls: ['./reglements-clients.component.scss']
})
export class ReglementsClientsComponent implements OnInit {

  reglements: any;
  settings = {
    columns: {
      num: {
        title: 'Num'
      },
      tiers: {
        title: 'Clients'
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
  source: LocalDataSource;
  startDate: string;
  endDate: string;
  user: any;
  iduser: any;
  namerole: any;
  idrole: any;
  identreprise: any;
  access: any;
  rs: any;
  client: any;
  rolee: any;
  message: any;
  isSucces = false ;
  constructor(private router: Router, private tokenStorage: TokenStorageService,
              private roleService: RoleService,
              private formBuilder: UntypedFormBuilder,
              private reglementsService: ReglementsService,
              private clientService: ClientsService,
              private rsService: RsService,
              private spinner: NgxSpinnerService,
              private modalService: NgbModal,
              private utilisateurService: UtilisateurService,
              private accessService: AccessService,
              private cdr: ChangeDetectorRef) {
    this.entrepriseForm = this.formBuilder.group({
      datedebut: [Date, Validators.required],
      datefin: [Date, Validators.required],
    })
    this.typeForm = this.formBuilder.group({
      type: [null , Validators.required],
    })
    this.alimentationForm = this.formBuilder.group({
      reference: [''],
      rs: [false],
      dateEcheance: [Date],
      percentageRs: [null],
      type: [null],
      banque: [''],
      numpiece : [''],
      solde: ['', Validators.required],
      soldedev: ['', Validators.required],
      idclient: [null],
    })
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
    this.reglementsService.addClients(this.alimentationForm ).subscribe(
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
  exportToExcel(): void {
    // Créer une nouvelle feuille de calcul
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.reglements);

    // Créer un nouveau classeur
    const workbook: XLSX.WorkBook = {
      Sheets: { 'reglementclient': worksheet },
      SheetNames: ['reglementclient']
    };

    // Convertir le classeur en binaire
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Appeler la fonction pour sauvegarder le fichier Excel
    this.saveAsExcelFile(excelBuffer, 'reglementclient');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, `${fileName}_export.xlsx`);
  }
  openChoice(template1, template2): void {
    if (this.typeForm.value.type === 'Espèce') {
      this.modalService.open(template1);
    } else {this.modalService.open(template2); }
  }
  getallClients() {
    this.clientService.getall(this.identreprise, this.iduser).subscribe(data => {
      console.log(data);
      this.client = data;
    });

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
    this.reglementsService.getallRegelementsClients(iduser).subscribe(data => {
      console.log('hhh', data);
      this.reglements = data;
      this.source = new LocalDataSource(this.reglements);
    });

  }
  getallRs() {
    this.rsService.getall().subscribe(data => {
      console.log(data);
      this.rs = data;
    });
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
    this.reglementsService.impayeClient(this.iduser, num).subscribe(value => {
      this.message = value.message;
      this.isSuccessful = true ;
      this.spinner.hide();
      setTimeout(() => {
        this.isSuccessful = false ;
      }, 5000 )
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

  onclicktable($event) {
    if ($event.action === 'update') {
      this.router.navigate(['pages/modifier-role', $event['data']['id']]);
    } else if ($event.action === 'impaye') {
      this.retourImpaye($event['data']['num'])
    } else if ($event.action === 'show') {
      this.router.navigate(['pages/affectation', $event['data']['num']]);
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
          console.log('user', this.user)
          this.getall(this.iduser);
          this.getallClients();
          this.getallRs()
        });
      this.roleService.findByName(this.namerole).subscribe(data => {
        this.rolee = data;
        this.idrole = this.rolee.id;
        console.log('data', data)
        this.accessService.findByAccessTitleAndRole(this.rolee.id, 'Gestion des Fournisseurs').subscribe(
          data1 => {
            this.access = data1
            console.log('m', this.access)
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
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
