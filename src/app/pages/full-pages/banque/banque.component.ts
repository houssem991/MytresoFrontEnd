import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {RoleService} from '../../../shared/services/role.service';
import {BanqueService} from '../../../shared/services/banque.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UtilisateurService} from '../../../shared/services/utilisateur.service';
import {AccessService} from '../../../shared/services/acces.service';

@Component({
  selector: 'app-banque',
  templateUrl: './banque.component.html',
  styleUrls: ['./banque.component.scss']
})
export class BanqueComponent implements OnInit {

  banque: any;
  settings = {
    columns: {
      nom: {
        title: 'Nom'
      },
      adresse: {
        title: 'Adresse'
      },
      telephone: {
        title: 'Telephone'
      },
      solde: {
        title: 'Solde'
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
  idbanque: any;
  idrole: any;
  identreprise: any;
  access: any;
  rolee: any;
  alimentationForm: UntypedFormGroup;
  alimentationFormubmitted = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  message: any
  selectedRecord: any = {};

  constructor(private router: Router, private tokenStorage: TokenStorageService,
              private roleService: RoleService,
              private banqueService: BanqueService,
              private spinner: NgxSpinnerService,
              private modalService: NgbModal,
              private formBuilder: UntypedFormBuilder,
              private utilisateurService: UtilisateurService,
              private accessService: AccessService,
              private cdr: ChangeDetectorRef) {
    this.alimentationForm = this.formBuilder.group({
      montant: ['', Validators.required],
    })
  }

  getall() {
    this.banqueService.getall().subscribe(data => {
      console.log(data);
      this.banque = data;
    });

  }

  delete($id) {
    this.banqueService.delete($id).subscribe(data => {
      window.location.reload();
    });
  }
  get rf() {
    return this.alimentationForm.controls;
  }
  open(content) {
    this.modalService.open(content);
  }
  onclicktable($event) {
    if ($event.action === 'update') {
      this.router.navigate(['pages/modifier-banque', $event['data']['id']]);
    } else if ($event.action === 'show') {
    } else if ($event.action === 'delete') {
      if (window.confirm('Voulez vous vraiment supprimer cette banque?')) {
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
              console.log('user', this.user)
              this.getall();
            });
        console.log('data', data)
        this.accessService.findByAccessTitleAndRole(this.rolee.id, 'Banque').subscribe(
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
