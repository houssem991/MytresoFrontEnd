import {ChangeDetectorRef, Component, OnInit, Renderer2} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {RoleService} from '../../../shared/services/role.service';
import {ReglementsService} from '../../../shared/services/reglements.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {UtilisateurService} from '../../../shared/services/utilisateur.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AccessService} from '../../../shared/services/acces.service';

@Component({
  selector: 'app-impaye-fournisseurs',
  templateUrl: './impaye-fournisseurs.component.html',
  styleUrls: ['./impaye-fournisseurs.component.scss']
})
export class ImpayeFournisseursComponent implements OnInit {
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
        title: 'Fournisseur'
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
  entrepriseFormSubmitted = false;
  entrepriseForm: UntypedFormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  user: any;
  iduser: any;
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
              private utilisateurService: UtilisateurService,
              private modalService: NgbModal,
              private renderer: Renderer2,
              private accessService: AccessService,
              private cdr: ChangeDetectorRef) {
    this.entrepriseForm = this.formBuilder.group({
      datedebut: [Date, Validators.required],
      datefin: [Date, Validators.required],
    })
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
    this.reglementsService.getallImpayesFournisseurs(iduser).subscribe(data => {
      console.log(data);
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

  onclicktable($event) {
    if ($event.action === 'update') {
      this.router.navigate(['pages/modifier-role', $event['data']['id']]);
    } else if ($event.action === 'show') {
      this.retourImpaye($event['data']['num'])
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
            console.log("user", this.user)
            this.getall(this.iduser);
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
                  name: 'show',
                  title: '<a  href=""><i class="bi bi-file-earmark-excel px-1" title="retour impaye" aria-hidden="false" ></i></a>'
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



