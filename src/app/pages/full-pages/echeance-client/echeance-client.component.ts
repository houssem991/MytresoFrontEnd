import {ChangeDetectorRef, Component, OnInit, Renderer2} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {RoleService} from '../../../shared/services/role.service';
import {ReglementsService} from '../../../shared/services/reglements.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {UtilisateurService} from '../../../shared/services/utilisateur.service';
import {RsService} from '../../../shared/services/rs.service';
import {FournisseursService} from '../../../shared/services/fournisseurs.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AccessService} from '../../../shared/services/acces.service';

@Component({
  selector: 'app-echeance-client',
  templateUrl: './echeance-client.component.html',
  styleUrls: ['./echeance-client.component.scss']
})
export class EcheanceClientComponent implements OnInit {

  source: LocalDataSource;
  startDate: string;
  endDate: string;
  reglements: any;
  entrepriseFormSubmitted = false;
  typeFormSubmitted = false;
  alimentationFormubmitted = false;
  typeForm: UntypedFormGroup;
  alimentationForm: UntypedFormGroup;
  entrepriseForm: UntypedFormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  user: any;
  iduser: any;
  namerole: any;
  idrole: any;
  identreprise: any;
  openIndices: Set<number> = new Set<number>();
  access: any;
  rolee: any;
  rs: any;
  caisse: any;
  fournisseur: any;
  message: any;
  isSucces = false ;
  today: any;
  constructor(private router: Router, private tokenStorage: TokenStorageService,
              private roleService: RoleService,
              private formBuilder: UntypedFormBuilder,
              private reglementsService: ReglementsService,
              private spinner: NgxSpinnerService,
              private utilisateurService: UtilisateurService,
              private rsService: RsService,
              private fournisseurService: FournisseursService,
              private modalService: NgbModal,
              private renderer: Renderer2,
              private accessService: AccessService,
              private cdr: ChangeDetectorRef) {
    this.today = this.getFormattedDate(new Date())
    console.log('today', this.today)
  }
  getFormattedDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Ajoute un zéro si nécessaire
    const day = ('0' + date.getDate()).slice(-2);          // Ajoute un zéro si nécessaire
    return `${year}-${month}-${day}`;
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
    let filteredData = this.reglements;

    if (this.startDate) {
      filteredData = filteredData.filter(item => new Date(item.dateReglement) >= new Date(this.startDate));
    }

    if (this.endDate) {
      filteredData = filteredData.filter(item => new Date(item.dateReglement) <= new Date(this.endDate));
    }

    this.source.load(filteredData);
  }
  open(content) {
    this.modalService.open(content);
  }
  getall(iduser) {
    this.reglementsService.getallEcheancierClients(iduser).subscribe(data => {
      console.log(data);
      this.reglements = data;
      this.source = new LocalDataSource(this.reglements);
      this.cdr.detectChanges();
    });
  }
  getallRs() {
    this.rsService.getall().subscribe(data => {
      console.log(data);
      this.rs = data;
    });
  }

  delete($id) {
    this.roleService.delete($id).subscribe(data => {
      window.location.reload();
    });
  }
  // index de la ligne actuellement ouverte
  toggleDetails(index: number) {
    if (this.openIndices.has(index)) {
      this.openIndices.delete(index); // Fermer la ligne si elle est déjà ouverte
    } else {
      this.openIndices.add(index); // Ouvrir la ligne
    }
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
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.namerole = this.tokenStorage.getUser().roles[0];
      this.iduser = this.tokenStorage.getUser().id;
      this.utilisateurService.findById(this.iduser).subscribe(
        data => {
          this.identreprise = data.identreprise;
          console.log('user', this.user)
          this.getall(this.iduser);
          this.getallRs()
        });
    }
  }
  clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}
