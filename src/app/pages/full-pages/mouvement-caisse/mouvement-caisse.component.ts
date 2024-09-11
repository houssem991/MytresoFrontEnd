import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {RoleService} from '../../../shared/services/role.service';
import {CaisseService} from '../../../shared/services/caisse.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UtilisateurService} from '../../../shared/services/utilisateur.service';
import {AccessService} from '../../../shared/services/acces.service';
import {MouvementService} from '../../../shared/services/mouvement.service';
import {LocalDataSource} from 'ng2-smart-table';

@Component({
  selector: 'app-mouvement-caisse',
  templateUrl: './mouvement-caisse.component.html',
  styleUrls: ['./mouvement-caisse.component.scss']
})
export class MouvementCaisseComponent implements OnInit {
  source: LocalDataSource;
  mouvement: any;
  settings = {
    columns: {
      id: {
        title: 'Num'
      },
      libelle: {
        title: 'Libelle'
      }, piece: {
        title: 'Piece'
      }, date: {
        title: 'Date'
      }, mouvement: {
        title: 'Transaction'
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
              private mouvementService: MouvementService,
              private spinner: NgxSpinnerService,
              private modalService: NgbModal,
              private route: ActivatedRoute,
              private utilisateurService: UtilisateurService,
              private accessService: AccessService,
              private cdr: ChangeDetectorRef) {
    this.idcaisse = this.route['params']['value']['id'];
  }

  getall() {
    this.mouvementService.getall(this.idcaisse).subscribe(data => {
      console.log(data);
      this.source = data;
      this.spinner.hide()
    });

  }

  delete($id) {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
    this.mouvementService.delete($id).subscribe();
    this.getall();
    this.cdr.detectChanges()
  }
  get rf() {
    return this.alimentationForm.controls;
  }
  open(content) {
    this.modalService.open(content);
  }
  onclicktable($event) {
    if ($event.action === 'update') {
      this.router.navigate(['pages/modifier-caisse', $event['data']['id']]);
    } else if ($event.action === 'show') {
      this.router.navigate(['pages/caisse/mouvement', $event['data']['id']]);
    } else if ($event.action === 'delete') {
      if (window.confirm('Voulez vous vraiment supprimer cette transaction?')) {
        this.delete($event['data']['id']);

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
