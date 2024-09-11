import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GalleryPageComponent } from "./gallery/gallery-page.component";
import { InvoicePageComponent } from "./invoice/invoice-page.component";
import { HorizontalTimelinePageComponent } from "./timeline/horizontal/horizontal-timeline-page.component";
import { UserProfilePageComponent } from "./user-profile/user-profile-page.component";
import { SearchComponent } from './search/search.component';
import { FaqComponent } from './faq/faq.component';
import { TimelineVerticalCenterPageComponent } from './timeline/vertical/timeline-vertical-center-page/timeline-vertical-center-page.component';
import { TimelineVerticalLeftPageComponent } from './timeline/vertical/timeline-vertical-left-page/timeline-vertical-left-page.component';
import { TimelineVerticalRightPageComponent } from './timeline/vertical/timeline-vertical-right-page/timeline-vertical-right-page.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersViewComponent } from './users/users-view/users-view.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';
import {GestionrolesComponent} from './gestionroles/gestionroles.component';
import {AddroleComponent} from './addrole/addrole.component';
import {UpdateRoleComponent} from './update-role/update-role.component';
import {ManageAccesComponent} from './manage-acces/manage-acces.component';
import {AddAccesstoRoleComponent} from './add-accessto-role/add-accessto-role.component';
import {UpdateAccessRoleComponent} from './update-access-role/update-access-role.component';
import {AddEntrepriseComponent} from './add-entreprise/add-entreprise.component';
import {InviterCollaborateurComponent} from './inviter-collaborateur/inviter-collaborateur.component';
import {ValidateUserComponent} from './validate-user/validate-user.component';
import {GestionFournisseursComponent} from './gestion-fournisseurs/gestion-fournisseurs.component';
import {FactureFournisseursComponent} from './facture-fournisseurs/facture-fournisseurs.component';
import {DocumentsFournisseursComponent} from './documents-fournisseurs/documents-fournisseurs.component';
import {GestionClientsComponent} from './gestion-clients/gestion-clients.component';
import {FactureClientsComponent} from './facture-clients/facture-clients.component';
import {DocumentClientsComponent} from './document-clients/document-clients.component';
import {DetailFactureFournisseursComponent} from './detail-facture-fournisseurs/detail-facture-fournisseurs.component';
import {ReglementsClientsComponent} from './reglements-clients/reglements-clients.component';
import {ReglementsFournisseursComponent} from './reglements-fournisseurs/reglements-fournisseurs.component';
import {DetailFactureClientComponent} from './detail-facture-client/detail-facture-client.component';
import {CaisseComponent} from './caisse/caisse.component';
import {AddCaisseComponent} from './add-caisse/add-caisse.component';
import {UpdateCaisseComponent} from './update-caisse/update-caisse.component';
import {ImpayeClientsComponent} from './impaye-clients/impaye-clients.component';
import {ImpayeFournisseursComponent} from './impaye-fournisseurs/impaye-fournisseurs.component';
import {BanqueComponent} from './banque/banque.component';
import {AddBanqueComponent} from './add-banque/add-banque.component';
import {UpdateBanqueComponent} from './update-banque/update-banque.component';
import {ImputationComponent} from './imputation/imputation.component';
import {AddImputationComponent} from './add-imputation/add-imputation.component';
import {MouvementCaisseComponent} from './mouvement-caisse/mouvement-caisse.component';
import {ParametrageRsComponent} from './parametrage-rs/parametrage-rs.component';
import {AddRSComponent} from './add-rs/add-rs.component';
import {UpdateRSComponent} from './update-rs/update-rs.component';

export const routes: Routes = [
  {
    path: '',
    children: [

      {
        path: 'gallery',
        component: GalleryPageComponent,
        data: {
          title: 'Gallery Page'
        }
      },
      {
        path: 'invoice',
        component: InvoicePageComponent,
        data: {
          title: 'Invoice Page'
        }
      },
      {
        path: 'horizontaltimeline',
        component: HorizontalTimelinePageComponent,
        data: {
          title: 'Horizontal Timeline Page'
        }
      },
      {
        path: 'timeline-vertical-center',
        component: TimelineVerticalCenterPageComponent,
        data: {
          title: 'Timeline Vertical Center Page'
        }
      },
      {
        path: 'timeline-vertical-left',
        component: TimelineVerticalLeftPageComponent,
        data: {
          title: 'Timeline Vertical Left Page'
        }
      },
      {
        path: 'timeline-vertical-right',
        component: TimelineVerticalRightPageComponent,
        data: {
          title: 'Timeline Vertical Right Page'
        }
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: {
          title: 'Account Settings Page'
        }
      },
      {
        path: 'profile',
        component: UserProfilePageComponent,
        data: {
          title: 'User Profile Page'
        }
      },
      {
        path: 'search',
        component: SearchComponent,
        data: {
          title: 'Search'
        }
      },
      {
        path: 'faq',
        component: FaqComponent,
        data: {
          title: 'FAQ'
        }
      },
      {
        path: 'kb',
        loadChildren: () => import('./knowledge-base/knowledge-base.module').then(m => m.KnowledgeBaseModule)
      },
      {
        path: 'agents-list',
        component: UsersListComponent,
        data: {
          title: 'List'
        }
      },
      {
        path: 'agents-role',
        component: GestionrolesComponent,
        data: {
          title: 'Gestion des roles'
        }
      },
      {
        path: 'ajouter-role',
        component: AddroleComponent,
        data: {
          title: 'Ajouter un role'
        }
      },
      {
        path: 'ajouter-caisse',
        component: AddCaisseComponent,
        data: {
          title: 'Ajouter une caisse'
        }
      },
      {
        path: 'modifier-caisse/:id',
        component: UpdateCaisseComponent,
        data: {
          title: 'Modifier Caisse'
        }
      },
      {
        path: 'manage-access/:id',
        component: ManageAccesComponent,
        data: {
          title: 'Gestion des accès'
        }
      },
      {
        path: 'manage-access/add-access/:id',
        component: AddAccesstoRoleComponent,
        data: {
          title: 'Ajouter un accès'
        }
      },
      {
        path: 'manage-access/update-access/:idrole/:idaccess',
        component: UpdateAccessRoleComponent,
        data: {
          title: 'Modifier un accès'
        }
      },
      {
        path: 'user/addEntreprise',
        component: AddEntrepriseComponent,
        data: {
          title: 'Creer votre entreprise'
        }
      },
      {
        path: 'user/invite',
        component: InviterCollaborateurComponent,
        data: {
          title: 'Inviter Collaborateur'
        }
      },
      {
        path: 'users-view',
        component: UsersViewComponent,
        data: {
          title: 'View'
        }
      },
      {
        path: 'users-edit',
        component: UsersEditComponent,
        data: {
          title: 'Edit'
        }
      },
      {
        path: 'gestion-fournisseurs',
        component: GestionFournisseursComponent,
        data: {
          title: 'Gestion des Fournisseurs'
        }
      },
      {
        path: 'gestion-clients',
        component: GestionClientsComponent,
        data: {
          title: 'Gestion des Clients'
        }
      },
      {
        path: 'gestion-fournisseurs/facture/:id',
        component: FactureFournisseursComponent,
        data: {
          title: 'Gestion des Factures des Fournisseurs'
        }
      },
      {
        path: 'gestion-clients/facture/:id',
        component: FactureClientsComponent,
        data: {
          title: 'Gestion des Factures des Clients'
        }
      },
      {
        path: 'gestion-facture-Clients',
        component: DocumentClientsComponent,
        data: {
          title: 'Documents Clients'
        }
      },
      {
        path: 'gestion-reglements-Clients',
        component: ReglementsClientsComponent,
        data: {
          title: 'Reglements Clients'
        }
      },
      {
        path: 'gestion-Imapyes-Clients',
        component: ImpayeClientsComponent,
        data: {
          title: 'Impayes Clients'
        }
      },
      {
        path: 'gestion-fournisseurs/facture/detail/:id',
        component: DetailFactureFournisseursComponent,
        data: {
          title: 'Detail Facture Fournisseurs'
        }
      },
      {
        path: 'gestion-cliens/facture/detail/:id',
        component: DetailFactureClientComponent,
        data: {
          title: 'Detail Facture Clients'
        }
      },
      {
        path: 'gestion-facture-fournissseurs',
        component: DocumentsFournisseursComponent,
        data: {
          title: 'Documents Foournisseurs'
        }
      },
      {
        path: 'Caisse',
        component: CaisseComponent,
        data: {
          title: 'Caisse'
        }
      }, {
        path: 'banque',
        component: BanqueComponent,
        data: {
          title: 'Banque'
        }
      },
      {
        path: 'ajouter-banque',
        component: AddBanqueComponent,
        data: {
          title: 'Banque'
        }
      },
      {
        path: 'modifier-banque/:id',
        component: UpdateBanqueComponent,
        data: {
          title: 'Banque'
        }
      },
      {
        path: 'gestion-Impayes-fournissseurs',
        component: ImpayeFournisseursComponent,
        data: {
          title: 'Impayes Foournisseurs'
        }
      },
      {
        path: 'affectation/:id',
        component: ImputationComponent,
        data: {
          title: 'affectation'
        }
      },
      {
        path: 'affectation/ajouter-affectation/:id',
        component: AddImputationComponent,
        data: {
          title: 'Add affectation'
        }
      },
      {
        path: 'caisse/mouvement/:id',
        component: MouvementCaisseComponent,
        data: {
          title: 'Mouvement Caisse'
        }
      },
      {
        path: 'parametre/rs',
        component: ParametrageRsComponent,
        data: {
          title: 'Parametrage Rs'
        }
      },
      {
        path: 'ajouter-rs',
        component: AddRSComponent,
        data: {
          title: 'Add Rs'
        }
      },
      {
        path: 'modifier-rs/:id',
        component: UpdateRSComponent,
        data: {
          title: 'Update Rs'
        }
      },
      {
        path: 'affectation/modifier-affectation/:id',
        component: AddImputationComponent,
        data: {
          title: 'Update affectation'
        }
      },
      {
        path: 'gestion-reglement-fournissseurs',
        component: ReglementsFournisseursComponent,
        data: {
          title: 'Reglements Foournisseurs'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
