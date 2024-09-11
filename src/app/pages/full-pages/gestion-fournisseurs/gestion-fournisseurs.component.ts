import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../../shared/services/token-storage.service';
import { RoleService } from '../../../shared/services/role.service';
import { UtilisateurService } from '../../../shared/services/utilisateur.service';
import { AccessService } from '../../../shared/services/acces.service';
import { FournisseursService } from '../../../shared/services/fournisseurs.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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
      columnTitle: 'Actions',
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
  ajouter: any;
  modifier: any;
  supprimer: any;
  consulter: any;
  access: any;
  rolee: any;
  message: any;
  isSucces = false;

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private roleService: RoleService,
    private fournisseurService: FournisseursService,
    private spinner: NgxSpinnerService,
    private utilisateurService: UtilisateurService,
    private accessService: AccessService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

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

  importer(iduser) {
    this.spinner.show(undefined, {
      type: 'ball-triangle-path',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      fullScreen: true
    });
    this.fournisseurService.importer(iduser).subscribe(data => {
      this.message = data.message;
      this.isSucces = true;
      this.spinner.hide();
      setTimeout(() => {
        this.isSucces = false;
      }, 5000);
    });
  }
  exportToExcel(): void {
    // Créer une nouvelle feuille de calcul
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.fournisseur);

    // Créer un nouveau classeur
    const workbook: XLSX.WorkBook = {
      Sheets: { 'fournisseur': worksheet },
      SheetNames: ['fournisseur']
    };

    // Convertir le classeur en binaire
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Appeler la fonction pour sauvegarder le fichier Excel
    this.saveAsExcelFile(excelBuffer, 'fournisseur');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, `${fileName}_export.xlsx`);
  }


// Type MIME pour Excel

  onclicktable($event) {
    if ($event.action === 'update') {
      this.router.navigate(['pages/modifier-role', $event['data']['id']]);
    } else if ($event.action === 'show') {
      this.router.navigate(['pages/gestion-fournisseurs/facture', $event['data']['code']]);
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
          this.identreprise = data.identreprise;
          this.getall(this.identreprise, this.iduser);
        });
      this.roleService.findByName(this.namerole).subscribe(data => {
        this.rolee = data;
        this.idrole = this.rolee.id;
        console.log('data', data);
        this.accessService.findByAccessTitleAndRole(this.rolee.id, 'Gestion des Fournisseurs').subscribe(
          data1 => {
            this.access = data1;
            console.log('m', this.access);
            this.ajouter = this.access.ajouter;
            this.modifier = this.access.modifier;
            this.consulter = this.access.consulter;
            this.supprimer = this.access.supprimer;
            if (this.access.supprimer === true) {
              this.settings.actions.custom.push({
                name: 'delete',
                title: '<a href=""><i class="fa fa-trash px-1" aria-hidden="true"></i></a>'
              });
            }
            if (this.access.modifier === true) {
              this.settings.actions.custom.push({
                name: 'update',
                title: '<a href=""><i class="fa fa-wrench px-1" aria-hidden="true"></i></a>'
              });
            }
            if (this.access.consulter === true) {
              this.settings.actions.custom.push({
                name: 'show',
                title: '<a href=""><i class="fa fa-eye px-1" aria-hidden="false"></i></a>'
              });
            }
            console.log('actions', this.settings.actions.custom);

            // Clone settings to force change detection
            this.settings = this.clone(this.settings);
            this.cdr.detectChanges();
          });
      });
    }
  }

  // Method to clone objects
  clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
