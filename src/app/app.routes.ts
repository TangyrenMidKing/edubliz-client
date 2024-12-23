import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TrainingSpanishComponent } from './training-spanish/training-spanish.component';
import { TestComponent } from './test/test.component';
import { TrainingChineseComponent } from './training-chinese/training-chinese.component';
import { HomeComponent } from './home/home.component';
import { TrainingResultsComponent } from './training-results/training-results.component';
import { TestResultComponent } from './test-result/test-result.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'training-spanish', component: TrainingSpanishComponent },
  { path: 'training-chinese', component: TrainingChineseComponent},
  { path: 'test', component: TestComponent },
  { path: 'home', component: HomeComponent },
  { path: 'training-results', component: TrainingResultsComponent },
  { path: 'test-result', component: TestResultComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Default route
];
