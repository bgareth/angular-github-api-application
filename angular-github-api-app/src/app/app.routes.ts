import { Routes } from '@angular/router';

import { SearchComponent } from './components/search/search.component';
import { RepositoryDetailsComponent } from './components/repository-details/repository-details.component';
import { IssuesListComponent } from './components/issues-list/issues-list.component';

export const routes: Routes = [
  { path: '', component: SearchComponent, data: { animation: 'SearchPage' } },
  { path: 'repository/:owner/:repo', component: RepositoryDetailsComponent, data: { animation: 'RepositoryPage' } },
  { path: 'repository/:owner/:repo/issues', component: IssuesListComponent, data: { animation: 'IssuesPage' } },
];
