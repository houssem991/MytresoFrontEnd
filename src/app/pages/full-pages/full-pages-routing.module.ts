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

const routes: Routes = [
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
          title: 'List'
        }
      },
      {
        path: 'ajouter-role',
        component: AddroleComponent,
        data: {
          title: 'Add'
        }
      },
      {
        path: 'modifier-role/:id',
        component: UpdateRoleComponent,
        data: {
          title: 'Edit'
        }
      },
      {
        path: 'manage-access/:id',
        component: ManageAccesComponent,
        data: {
          title: 'View'
        }
      },
      {
        path: 'manage-access/add-access/:id',
        component: AddAccesstoRoleComponent,
        data: {
          title: 'add'
        }
      },
      {
        path: 'manage-access/update-access/:idrole/:idaccess',
        component: UpdateAccessRoleComponent,
        data: {
          title: 'add'
        }
      },
      {
        path: 'user/addEntreprise',
        component: AddEntrepriseComponent,
        data: {
          title: 'add'
        }
      },
      {
        path: 'user/invite',
        component: InviterCollaborateurComponent,
        data: {
          title: 'add'
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
          title: 'Edit'
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
