import {ChangeDetectorRef, Component, OnInit, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {RoleService} from '../../../shared/services/role.service';
import {UtilisateurService} from '../../../shared/services/utilisateur.service';
import {AccessService} from '../../../shared/services/acces.service';
import {CaisseService} from '../../../shared/services/caisse.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {BanqueService} from '../../../shared/services/banque.service';

@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.scss']
})
export class CaisseComponent implements OnInit {

  caisses: any;
  caisse: any;
  settings = {
    columns: {
      libelle: {
        title: 'Liblle'
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
Type = [
    {name: 'Banque'},
    {name: 'Caisse'},
]
  user: any;
  iduser: any;
  namerole: any;
  banque: any;
  idcaisse: any;
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
              private caisseService: CaisseService,
              private banqueService: BanqueService,
              private spinner: NgxSpinnerService,
              private modalService: NgbModal,
              private formBuilder: UntypedFormBuilder,
              private utilisateurService: UtilisateurService,
              private accessService: AccessService,
              private cdr: ChangeDetectorRef) {
    this.alimentationForm = this.formBuilder.group({
      montant: ['', Validators.required],
      choice: [null, Validators.required],
      idcaisse : [null],
      idbanque: [null],
    })
  }

  getall() {
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
  getallWithoutCurrent(id , iduser) {
    this.caisseService.findAllWithoutCurrent(id, iduser).subscribe(data => {
      console.log(data);
      this.caisses = data;
    });

  }

  delete($id) {
    this.caisseService.delete($id).subscribe(data => {
      window.location.reload();
    });
  }
  get rf() {
    return this.alimentationForm.controls;
  }
  open(content) {
    this.modalService.open(content);
  }
  onclicktable($event, template) {
    if ($event.action === 'update') {
      this.router.navigate(['pages/modifier-caisse', $event['data']['id']]);
    } else if ($event.action === 'alimenter') {
      this.selectedRecord = { ...$event.data };
      console.log('select', this.selectedRecord)
      this.open(template)
      this.idcaisse = this.selectedRecord.id;
      this.iduser = this.tokenStorage.getUser().id;
      this.getallWithoutCurrent(this.idcaisse , this.iduser)
    } else if ($event.action === 'show') {
      this.router.navigate(['pages/caisse/mouvement', $event['data']['id']]);
    } else if ($event.action === 'delete') {
      if (window.confirm('Voulez vous vraiment supprimer cette caisse?')) {
        this.delete($event['data']['id']);
        window.location.reload();

      } else {
        $event.confirm.reject();
      }
    } else {
      this.router.navigate(['pages/agents-role']);

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
    this.idcaisse = this.selectedRecord.id;
    console.log(this.alimentationForm);
    this.caisseService.alimenter(this.idcaisse, this.alimentationForm).subscribe(
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
      this.roleService.findByName(this.namerole).subscribe(data => {
        this.rolee = data;
        this.idrole = this.rolee.id;
        this.utilisateurService.findById(this.iduser).subscribe(
          data1 => {
            this.identreprise = data1.identreprise ;
            console.log('user', this.user)
            this.getall();
            this.getallBanque()
            this.getallWithoutCurrent(this.idcaisse , this.iduser)
          });
        console.log('data', data)
        this.accessService.findByAccessTitleAndRole(this.rolee.id, 'Caisse').subscribe(
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
              });
              this.settings.actions.custom.push({
                name: 'alimenter',
                title: '<a  href=""  ><i class="bi bi-cash px-1" title="alimenter" aria-hidden="true"></i></a>'
              });
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
