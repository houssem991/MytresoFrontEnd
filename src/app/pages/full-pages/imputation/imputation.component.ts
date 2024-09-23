import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {RoleService} from '../../../shared/services/role.service';
import {UtilisateurService} from '../../../shared/services/utilisateur.service';
import {AccessService} from '../../../shared/services/acces.service';
import {ImputationService} from '../../../shared/services/imputation.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ReglementsService} from '../../../shared/services/reglements.service';

@Component({
  selector: 'app-imputation',
  templateUrl: './imputation.component.html',
  styleUrls: ['./imputation.component.scss']
})
export class ImputationComponent implements OnInit {

  imputation: any;
  settings = {
    columns: {
      piece: {
        title: 'Numero de facture'
      },
      code: {
        title: 'Code du reglement'
      },

      montant: {
        title: 'Montant'
      },
      etat: {
        title: 'Etat'
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
  namerole: any;
  isSucces: any;
  message: any;
  idrole: any;
  errormessage: any;
  identreprise: any;
  isSuccesfailed: any;
  access: any;
  rolee: any;
  reglement: any;
  idreglement: any;

  constructor(private router: Router, private tokenStorage: TokenStorageService,
              private roleService: RoleService,
              private utilisateurService: UtilisateurService,
              private route: ActivatedRoute,
              private imputationService: ImputationService,
              private reglementService: ReglementsService,
              private spinner: NgxSpinnerService,
              private accessService: AccessService,
              private cdr: ChangeDetectorRef) {
    this.idreglement = this.route['params']['value']['id'];
  }

  getall() {
    this.imputationService.getall(this.idreglement).subscribe(data => {
      console.log(data);
      this.imputation = data;
    });

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
    this.imputationService.importer(this.idreglement).subscribe(data => {
      this.message = data.message;
      this.isSucces = true ;
      this.spinner.hide();
      setTimeout(() => {
        this.isSucces = false ;
        window.location.reload();
      }, 5000 )
    },
      err => {
        this.errormessage = err.error.message;
        console.log(err)
        this.isSuccesfailed = true ;
        this.spinner.hide();
        setTimeout(() => {
          this.isSuccesfailed = false ;
        }, 5000 )
      });
  }

  delete($id) {
    this.imputationService.delete($id).subscribe(data => {
      window.location.reload();
    });
  }
  getBYId() {
    this.reglementService.findById(this.idreglement).subscribe(data => {
      console.log(data);
      this.reglement = data;
    });
  }

  onclicktable($event) {
    if ($event.action === 'update') {
      this.router.navigate(['pages/modifier-role', $event['data']['id']]);
    } else if ($event.action === 'show') {
      this.router.navigate(['pages/manage-access', $event['data']['id']]);
    } else if ($event.action === 'delete') {
      if (window.confirm('Voulez vous vraiment supprimer cette affectation?')) {
        this.delete($event['data']['dr_No']);
        window.location.reload();

      } else {
        $event.confirm.reject();
      }
    } else {
      this.router.navigate(['pages/agents-role']);

    }

  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.namerole = this.tokenStorage.getUser().roles[0];
      this.iduser = this.tokenStorage.getUser().id;
      this.roleService.findByName(this.namerole).subscribe(data => {
        this.rolee = data;
        this.idrole = this.rolee.id;
        this.utilisateurService.findById(this.iduser).subscribe(
          data1 => {
            this.identreprise = data1.identreprise ;
            console.log('user', this.user)
            this.getall();
            this.getBYId()
          });
        console.log('data', data)
        this.accessService.findByAccessTitleAndRole(this.rolee.id, 'Reglements Fournisseurs').subscribe(
          data1 => {
            this.access = data1
            console.log('m', this.access)
            if (this.access.supprimer === true) {
              this.settings.actions.custom.push({
                name: 'delete',
                title: '<a  href=""  ><i class="fa fa-trash px-1" aria-hidden="true"></i></a>'
              })
            }
            if (this.access.modifier === true) {
              this.settings.actions.custom.push({
                name: 'update',
                title: '<a  href=""  ><i class="fa fa-wrench px-1" aria-hidden="true"></i></a>'
              })
            }
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
