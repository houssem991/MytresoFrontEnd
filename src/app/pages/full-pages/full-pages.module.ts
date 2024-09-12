import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FullPagesRoutingModule } from "./full-pages-routing.module";
import { ChartistModule } from "ng-chartist";
import { AgmCoreModule } from "@agm/core";
import { NgSelectModule } from "@ng-select/ng-select";
import { SwiperModule } from "ngx-swiper-wrapper";
import { PipeModule } from "app/shared/pipes/pipe.module";

import { GalleryPageComponent } from './gallery/gallery-page.component';
import { InvoicePageComponent } from './invoice/invoice-page.component';
import { HorizontalTimelinePageComponent } from "./timeline/horizontal/horizontal-timeline-page.component";
import { HorizontalTimelineComponent } from "./timeline/horizontal/component/horizontal-timeline.component";
import { TimelineVerticalCenterPageComponent } from "./timeline/vertical/timeline-vertical-center-page/timeline-vertical-center-page.component";
import { TimelineVerticalLeftPageComponent } from "./timeline/vertical/timeline-vertical-left-page/timeline-vertical-left-page.component";
import { TimelineVerticalRightPageComponent } from "./timeline/vertical/timeline-vertical-right-page/timeline-vertical-right-page.component";
import { UserProfilePageComponent } from "./user-profile/user-profile-page.component";
import { SearchComponent } from "./search/search.component";
import { FaqComponent } from "./faq/faq.component";
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersViewComponent } from './users/users-view/users-view.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { GestionrolesComponent } from './gestionroles/gestionroles.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import { AddroleComponent } from './addrole/addrole.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import { UpdateRoleComponent } from './update-role/update-role.component';
import { AddAccesstoRoleComponent } from './add-accessto-role/add-accessto-role.component';
import { UpdateAccessRoleComponent } from './update-access-role/update-access-role.component';
import { AddEntrepriseComponent } from './add-entreprise/add-entreprise.component';
import { InviterCollaborateurComponent } from './inviter-collaborateur/inviter-collaborateur.component';
import { ValidateUserComponent } from './validate-user/validate-user.component';
import { GestionFournisseursComponent } from './gestion-fournisseurs/gestion-fournisseurs.component';
import { FactureFournisseursComponent } from './facture-fournisseurs/facture-fournisseurs.component';
import { DocumentsFournisseursComponent } from './documents-fournisseurs/documents-fournisseurs.component';
import { GestionClientsComponent } from './gestion-clients/gestion-clients.component';
import { FactureClientsComponent } from './facture-clients/facture-clients.component';
import { DocumentClientsComponent } from './document-clients/document-clients.component';
import { DetailFactureFournisseursComponent } from './detail-facture-fournisseurs/detail-facture-fournisseurs.component';
import { ReglementsFournisseursComponent } from './reglements-fournisseurs/reglements-fournisseurs.component';
import { ReglementsClientsComponent } from './reglements-clients/reglements-clients.component';
import { DateRangeFilterComponent } from './date-range-filter/date-range-filter.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailFactureClientComponent } from './detail-facture-client/detail-facture-client.component';
import { CaisseComponent } from './caisse/caisse.component';
import { AddCaisseComponent } from './add-caisse/add-caisse.component';
import { UpdateCaisseComponent } from './update-caisse/update-caisse.component';
import { ImpayeFournisseursComponent } from './impaye-fournisseurs/impaye-fournisseurs.component';
import { ImpayeClientsComponent } from './impaye-clients/impaye-clients.component';
import { BanqueComponent } from './banque/banque.component';
import { AddBanqueComponent } from './add-banque/add-banque.component';
import { UpdateBanqueComponent } from './update-banque/update-banque.component';
import { ImputationComponent } from './imputation/imputation.component';
import { AddImputationComponent } from './add-imputation/add-imputation.component';
import { UpdateImputationComponent } from './update-imputation/update-imputation.component';
import { MouvementCaisseComponent } from './mouvement-caisse/mouvement-caisse.component';
import { ParametrageRsComponent } from './parametrage-rs/parametrage-rs.component';
import { AddRSComponent } from './add-rs/add-rs.component';
import { UpdateRSComponent } from './update-rs/update-rs.component';
import { EcheanceClientComponent } from './echeance-client/echeance-client.component';
import { EcheanceFournisseursComponent } from './echeance-fournisseurs/echeance-fournisseurs.component';
@NgModule({
  imports: [
    CommonModule,
    FullPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartistModule,
    AgmCoreModule,
    NgSelectModule,
      NgbModule,
    SwiperModule,
    PipeModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
    NgxSpinnerModule,
  ],
  declarations: [
    GalleryPageComponent,
    InvoicePageComponent,
    HorizontalTimelinePageComponent,
    HorizontalTimelineComponent,
    TimelineVerticalCenterPageComponent,
    TimelineVerticalLeftPageComponent,
    TimelineVerticalRightPageComponent,
    UserProfilePageComponent,
    SearchComponent,
    FaqComponent,
    AccountSettingsComponent,
    UsersListComponent,
    UsersViewComponent,
    UsersEditComponent,
    GestionrolesComponent,
    AddroleComponent,
    UpdateRoleComponent,
    AddAccesstoRoleComponent,
    UpdateAccessRoleComponent,
    AddEntrepriseComponent,
    InviterCollaborateurComponent,
    ValidateUserComponent,
    GestionFournisseursComponent,
    FactureFournisseursComponent,
    DocumentsFournisseursComponent,
    GestionClientsComponent,
    FactureClientsComponent,
    DocumentClientsComponent,
    DetailFactureFournisseursComponent,
    ReglementsFournisseursComponent,
    ReglementsClientsComponent,
    DateRangeFilterComponent,
    DetailFactureClientComponent,
    CaisseComponent,
    AddCaisseComponent,
    UpdateCaisseComponent,
    ImpayeFournisseursComponent,
    ImpayeClientsComponent,
    BanqueComponent,
    AddBanqueComponent,
    UpdateBanqueComponent,
    ImputationComponent,
    AddImputationComponent,
    UpdateImputationComponent,
    MouvementCaisseComponent,
    ParametrageRsComponent,
    AddRSComponent,
    UpdateRSComponent,
    EcheanceClientComponent,
    EcheanceFournisseursComponent,
  ],
})
export class FullPagesModule {}
