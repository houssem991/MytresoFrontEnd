import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FullPagesRoutingModule } from "./full-pages-routing.module";
import { ChartistModule } from "ng-chartist";
import { AgmCoreModule } from "@agm/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { SwiperModule } from "ngx-swiper-wrapper";
import { PipeModule } from "app/shared/pipes/pipe.module";

import { GalleryPageComponent } from "./gallery/gallery-page.component";
import { InvoicePageComponent } from "./invoice/invoice-page.component";
import { HorizontalTimelinePageComponent } from "./timeline/horizontal/horizontal-timeline-page.component";
import { HorizontalTimelineComponent } from "./timeline/horizontal/component/horizontal-timeline.component";
import { TimelineVerticalCenterPageComponent } from "./timeline/vertical/timeline-vertical-center-page/timeline-vertical-center-page.component";
import { TimelineVerticalLeftPageComponent } from "./timeline/vertical/timeline-vertical-left-page/timeline-vertical-left-page.component";
import { TimelineVerticalRightPageComponent } from "./timeline/vertical/timeline-vertical-right-page/timeline-vertical-right-page.component";
import { UserProfilePageComponent } from "./user-profile/user-profile-page.component";
import { SearchComponent } from "./search/search.component";
import { FaqComponent } from "./faq/faq.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { UsersListComponent } from "./users/users-list/users-list.component";
import { UsersViewComponent } from "./users/users-view/users-view.component";
import { UsersEditComponent } from "./users/users-edit/users-edit.component";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
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
  ],
})
export class FullPagesModule {}
