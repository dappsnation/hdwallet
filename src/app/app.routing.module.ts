import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { PasswordComponent } from './components/password/password.component';
import { GenerateComponent } from './components/generate/generate.component';
import { DisplayComponent } from './components/display/display.component';
// Guards
import { HasPasswordGuard } from './guards/has-password.guard';
import { HasKeystoreGuard } from './guards/has-keystore.guard';

const routes: Routes = [
  { path: '', redirectTo: 'password', pathMatch: 'full' },
  { path: 'password', component: PasswordComponent, canActivate: [HasKeystoreGuard] },
  { path: 'display', component: DisplayComponent, canActivate: [HasPasswordGuard] },
  { path: 'generate', component: GenerateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
