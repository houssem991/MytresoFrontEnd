import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {RoleService} from '../../../shared/services/role.service';
import {UtilisateurService} from '../../../shared/services/utilisateur.service';
import {AccessService} from '../../../shared/services/acces.service';
import {FournisseursService} from '../../../shared/services/fournisseurs.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-gestion-fournisseurs',
  templateUrl: './gestion-fournisseurs.component.html',
  styleUrls: ['./gestion-fournisseurs.component.scss']
})
export class GestionFournisseursComponent implements OnInit {

  fournisseur: any;
  settings = {
    columns: {
      code: {
        title: 'Code'
      },
      nom: {
        title: 'Nom'
      },
      adresse: {
        title: 'Adresse'
      },
      identifiant: {
        title: 'Identifiant'
      },
      contact: {
        title: 'Contact'
      },
      telecopie: {
        title: 'Telecopie'
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
  idrole: any;
  identreprise: any;
  access: any;
  rolee: any;
  message: any;
  isSucces = false ;
  constructor(private router: Router, private tokenStorage: TokenStorageService,
              private roleService: RoleService,
              private fournisseurService: FournisseursService,
              private spinner: NgxSpinnerService,
              private utilisateurService: UtilisateurService,
              private accessService: AccessService) {}

  getall(identreprise, iduser) {
    this.fournisseurService.getall(identreprise, iduser).subscribe(data => {
      console.log(data);
      this.fournisseur = data;

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
    this.fournisseurService.importer(iduser).subscribe(data => {
      this.message = data.message;
      this.isSucces = true ;
      this.spinner.hide();
      setTimeout(() => {
        this.isSucces = false ;
      }, 5000 )
    });
  }

  onclicktable($event) {
    if ($event.action === 'update') {
      this.router.navigate(['pages/modifier-role', $event['data']['id']]);
    } else if ($event.action === 'show') {
      this.router.navigate(['pages/manage-access', $event['data']['id']]);
    } else if ($event.action === 'delete') {
      if (window.confirm('Voulez vous vraiment supprimer ce role?')) {
        this.delete($event['data']['id']);
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
      this.utilisateurService.findById(this.iduser).subscribe(
        data => {
          this.identreprise = data.identreprise ;
          console.log("user", this.user)
          this.getall(this.identreprise, this.iduser);
        });
      this.roleService.findByName(this.namerole).subscribe(data => {
        this.rolee = data;
        this.idrole = this.rolee.id;
        console.log("data", data)
        this.accessService.findByAccessTitleAndRole(this.rolee.id, 'Gestion des Fournisseurs').subscribe(
          data1 => {
            this.access = data1
            console.log("m", this.access)
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
          })


      })
    }
  }

}
