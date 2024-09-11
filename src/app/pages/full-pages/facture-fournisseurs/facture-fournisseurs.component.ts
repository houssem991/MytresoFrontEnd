import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {RoleService} from '../../../shared/services/role.service';
import {FournisseursService} from '../../../shared/services/fournisseurs.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {UtilisateurService} from '../../../shared/services/utilisateur.service';
import {AccessService} from '../../../shared/services/acces.service';
import {FactureService} from '../../../shared/services/facture.service';
import {LocalDataSource} from 'ng2-smart-table';

@Component({
  selector: 'app-facture-fournisseurs',
  templateUrl: './facture-fournisseurs.component.html',
  styleUrls: ['./facture-fournisseurs.component.scss']
})
export class FactureFournisseursComponent implements OnInit {
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
        title: 'Date'
      },
      Souche: {
        title: 'Souche'
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

  user: any;
  iduser: any;
  idfournisseur: any;
  namerole: any;
  idrole: any;
  identreprise: any;
  access: any;
  rolee: any;
  message: any;
  isSucces = false ;
  constructor(private router: Router, private tokenStorage: TokenStorageService,
              private roleService: RoleService,
              private factureService: FactureService,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute,
              private utilisateurService: UtilisateurService,
              private accessService: AccessService,
              private cdr: ChangeDetectorRef) {
    this.idfournisseur = this.route['params']['value']['id'];
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
    this.factureService.getallByFournisseur(this.idfournisseur).subscribe(data => {
      console.log(data);
      this.facture = data;
      this.source = new LocalDataSource(this.facture);

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
        window.location.reload()
      }, 5000 )
    });
  }

  onclicktable($event) {
    if ($event.action === 'update') {
      this.router.navigate(['pages/modifier-role', $event['data']['id']]);
    } else if ($event.action === 'show') {
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

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.namerole = this.tokenStorage.getUser().roles[0];
      this.iduser = this.tokenStorage.getUser().id;
      this.utilisateurService.findById(this.iduser).subscribe(
        data => {
          this.identreprise = data.identreprise ;
          console.log("user", this.user)
          this.getall();
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
                title: '<a  href=""><i class="fa fa-eye px-1" aria-hidden="false" ></i></a>'
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
