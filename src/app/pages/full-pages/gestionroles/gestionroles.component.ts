import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {RoleService} from '../../../shared/services/role.service';

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
  settingsUser = {
    columns: {
      name: {
        title: 'name'
      },
      local: {
        title: 'local'
      },
    },
    attr: {
      class: 'table table-responsive'
    },
    actions: {
      columnTitle: '',
      custom: [
        {
          name: 'show',
          title: '<a  href="" ><i class="fa fa-eye px-1" aria-hidden="true" ></i></a>'
        },
      ],
      add: false,
      delete: false,
      edit: false,
      position: 'right'
    }
  };
  user: any;


  constructor(private router: Router, private tokenStorage: TokenStorageService, private roleService: RoleService) {
    this.getall();
  }

  getall() {
    this.roleService.getall().subscribe(data => {
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
