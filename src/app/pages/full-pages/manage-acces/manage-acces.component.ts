import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {RoleService} from '../../../shared/services/role.service';
import {AccessService} from '../../../shared/services/acces.service';

@Component({
  selector: 'app-manage-acces',
  templateUrl: './manage-acces.component.html',
  styleUrls: ['./manage-acces.component.scss']
})
export class ManageAccesComponent implements OnInit {

  access: any;
  settings = {
    columns: {
      nameaccess: {
        title: 'Nom du Permission'
      },
      add: {
        title: 'Ajouter'
      },
      modifier: {
        title: 'Modifier'
      },
      delete: {
        title: 'Supprimer'
      },
      consulter: {
        title: 'Consulter'
      },
    },
    attr: {
      class: 'table table-responsive'
    },
    actions: {
      columnTitle: '',
      custom: [
        {
          name: 'delete',
          title: '<a  href=""  ><i class="fa fa-trash px-1" aria-hidden="true"></i></a>'
        },
        {
          name: 'show',
          title: '<a  href="" ><i class="fa fa-eye px-1" aria-hidden="true" ></i></a>'
        },
        {
          name: 'update',
          title: '<a  href=""  ><i class="fa fa-wrench px-1" aria-hidden="true"></i></a>'
        },
      ],
      add: false,
      delete: false,
      edit: false,
      position: 'right'
    }
  };
user: any;
role: any;
  idrole: any;
  constructor(private router: Router, private tokenStorage: TokenStorageService, private roleService: RoleService , private accesService: AccessService , private route: ActivatedRoute) {
    this.idrole = this.route['params']['value']['id'];

    this.getall();
    this.getByid();
  }

  getall() {
    this.accesService.findById(this.idrole).subscribe(data => {
      console.log(data);
      this.access = data;
    });

  }
  getByid() {
    this.roleService.findById(this.idrole).subscribe(data => {
      console.log(data);
      this.role = data;
    });

  }

  delete($id) {
    this.accesService.delete($id).subscribe(data => {
      window.location.reload();
    });
  }



  onclicktable($event) {
    if ($event.action === 'update') {
      this.router.navigate(['pages/modifier-role', $event['data']['id'] ]);
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

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.user = this.tokenStorage.getUser();
    }
  }


}
