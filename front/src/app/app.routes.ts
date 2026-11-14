import { Routes } from '@angular/router';
import { accessGuard } from './core/access';
import { isKovaInstancePath } from './core/instance-path';
import { LayoutComponent } from './components/layout/layout.component';

const kovaInstance = isKovaInstancePath(new URL(document.baseURI).pathname);

export const routes: Routes = [
  { path: 'acceso', loadComponent: () => kovaInstance
      ? import('./components/kova-login.component').then(m => m.KovaLogin)
      : import('./components/login/login.component').then(m => m.LoginComponent) },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [accessGuard],
    canActivateChild: [accessGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'projects',
        loadComponent: () => import('./components/projects/projects.component').then(m => m.ProjectsComponent)
      },
      { path: 'projects/:id', loadComponent: () => import('./components/projects/project-detail.component').then(m => m.ProjectDetailComponent) },
      {
        path: 'tasks',
        loadComponent: () => import('./components/tasks/tasks.component').then(m => m.TasksComponent)
      },
      {
        path: 'incidents',
        loadComponent: () => import('./components/incidents/incidents.component').then(m => m.IncidentsComponent)
      },
      { path: 'overtime', loadComponent: () => import('./components/overtime/overtime.component').then(m => m.OvertimeComponent) },
      {
        path: 'team',
        loadComponent: () => import('./components/team/team.component').then(m => m.TeamComponent)
      },
      {
        path: 'reminders',
        loadComponent: () => import('./components/reminders/reminders.component').then(m => m.RemindersComponent)
      }
    ]
  }
];
