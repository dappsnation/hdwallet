import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// External Modules
import { UiModule } from './ui/ui.module';
import { AppRoutingModule } from './app.routing.module';
// Components
import { AppComponent } from './app.component';
import { GenerateComponent } from './components/generate/generate.component';
import { DisplayComponent } from './components/display/display.component';
import { PasswordComponent } from './components/password/password.component';

@NgModule({
  declarations: [
    AppComponent,
    GenerateComponent,
    DisplayComponent,
    PasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
