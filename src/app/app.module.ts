import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { ContactComponent } from './components/contact/contact.component';
import { ModalSongComponent } from './components/modal-song/modal-song.component';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import localeEs from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';

import { MinutesPipe } from './libs/pipes/minutes.pipe';
import { AnimateDirective } from './libs/directives/animate.directive';
import { TokenInterceptor } from './services/interceptors/token.interceptor';
import { MaterialModule } from './shared/material.module';

registerLocaleData(localeEs, 'es')

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    ModalSongComponent,
    MinutesPipe,
    ContactComponent,
    AnimateDirective,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    { // * Esta declaracion es para poder mostrar las fechas en español con datePipe
      provide: LOCALE_ID,
      useValue: 'es'
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
