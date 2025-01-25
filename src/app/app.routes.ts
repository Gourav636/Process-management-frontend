import { Routes } from '@angular/router';
import { ProcessFormComponent } from './components/process-form/process-form.component';
import { ProcessListComponent } from './components/process-list/process-list.component';
import { ProcessDetailsComponent } from './components/process-details/process-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'process-list', pathMatch: 'full' },
  { path: 'process-form', component: ProcessFormComponent },
  { path: 'process-list', component: ProcessListComponent },
  { path: 'process-details/:id', component: ProcessDetailsComponent },
];
