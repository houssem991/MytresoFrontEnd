import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {RoleService} from '../../../shared/services/role.service';
import {AccessService} from '../../../shared/services/acces.service';
import {UtilisateurService} from '../../../shared/services/utilisateur.service';

@Component({
  selector: 'app-gestionroles',
  templateUrl: './gestionroles.component.html',
  styleUrls: ['./gestionroles.component.scss']
})
export class GestionrolesComponent implements OnInit {

  role: any;
  settings = {
    columns: {
      name: {
        title: 'name'
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

  constructor(private router: Router, private tokenStorage: TokenStorageService,
              private roleService: RoleService,
              private utilisateurService: UtilisateurService,
              private accessService: AccessService) {}

  getall(identreprise, idrole, iduser) {
    this.roleService.getall(identreprise, idrole, iduser).subscribe(data => {
      console.log(data);
      this.role = data;
    });

  }

  delete($id) {
    this.roleService.delete($id).subscribe(data => {
      window.location.reload();
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
      this.roleService.findByName(this.namerole).subscribe(data => {
        this.rolee = data;
        this.idrole = this.rolee.id;
        this.utilisateurService.findById(this.iduser).subscribe(
          data1 => {
            this.identreprise = data1.identreprise ;
            console.log("user", this.user)
            this.getall(this.identreprise, this.idrole, this.iduser);
          });
        console.log("data", data)
        this.accessService.findByAccessTitleAndRole(this.rolee.id, 'Gestion des roles').subscribe(
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
