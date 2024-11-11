import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TrainingSpanishComponent } from './training-spanish/training-spanish.component';
import { TestComponent } from './test/test.component';
import { TrainingChineseComponent } from './training-chinese/training-chinese.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'training-spanish', component: TrainingSpanishComponent },
  { path: 'training-chinese', component:  TrainingChineseComponent},
  { path: 'test', component: TestComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Default route
];
