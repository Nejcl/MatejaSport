import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NoviceComponent } from './novice/novice.component';
import { HomeComponent } from './home/home.component';
import { StoritveComponent } from './storitve/storitve.component';
import { OnasComponent } from './onas/onas.component';
import { InstruktorjiComponent } from './onas/instruktorji/instruktorji.component';
import { KjesmoComponent } from './onas/kjesmo/kjesmo.component';
import { GalerijaComponent } from './galerija/galerija.component';
import { UrnikComponent } from './urnik/urnik.component';
import { CenikComponent } from './cenik/cenik.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { SlideshowModule} from 'ng-simple-slideshow';
import { AgmCoreModule } from '@agm/core';
import { GalleryModule } from  '@ngx-gallery/core';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { IndividualnavadbaComponent } from './storitve/individualnavadba/individualnavadba.component';
import { MasazeComponent } from './storitve/masaze/masaze.component'
import { RehabilitacijaComponent } from './storitve/rehabilitacija/rehabilitacija.component';
import { RojstnodnevneComponent } from './storitve/rojstnodnevne/rojstnodnevne.component';
import { SestavatreningaComponent } from './storitve/sestavatreninga/sestavatreninga.component';
import { SkupinskevadbeComponent } from './storitve/skupinskevadbe/skupinskevadbe.component';
import { UserControlComponent } from './user-control/user-control.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { ColorPickerModule } from 'ngx-color-picker';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { LoginDialogComponent} from './login-dialog/login-dialog.component'
import { NgxGalleryModule } from 'ngx-gallery';
import { NeedAuthGuard } from './need-auth-guard.service';
import { InstruktorBoxComponent } from './instruktor-box/instruktor-box.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SafehtmlPipe } from './safehtml.pipe';
import { TestComponent } from './test/test.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { DialogContent } from './user-control/user-control.component';
import { DialogContent2 } from './user-control/user-control.component';
import { ProfilComponent } from './profil/profil.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { AktivacijaUporabnikovComponent } from './user-control/aktivacija-uporabnikov/aktivacija-uporabnikov.component';
import { UporabnikiComponent } from './user-control/uporabniki/uporabniki.component';
import { TerminiComponent } from './user-control/termini/termini.component';
import { RazpsTerminaComponent } from './user-control/termini/razps-termina/razps-termina.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { EditTerminDialogComponent } from './user-control/termini/edit-termin-dialog/edit-termin-dialog.component';
import { PrijavaNaTerminDialogComponent } from './user-control/termini/prijava-na-termin-dialog/prijava-na-termin-dialog.component';
import { DataService } from './data.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { PregledObiskovUporabnikaComponent } from './pregled-obiskov-uporabnika/pregled-obiskov-uporabnika.component';
import { SpremembaGeslaDialogComponent } from './profil/sprememba-gesla-dialog/sprememba-gesla-dialog.component';
import { SpremembaPodatkovDialogComponent } from './profil/sprememba-podatkov-dialog/sprememba-podatkov-dialog.component'  


@NgModule({
  declarations: [
    AppComponent,
    NoviceComponent,
    HomeComponent,
    StoritveComponent,
    OnasComponent,
    InstruktorjiComponent,
    KjesmoComponent,
    GalerijaComponent,
    UrnikComponent,
    CenikComponent,
    SlideshowComponent,
    ProfileCardComponent,
    IndividualnavadbaComponent,
    MasazeComponent,
    RehabilitacijaComponent,
    RojstnodnevneComponent,
    SestavatreningaComponent,
    SkupinskevadbeComponent,
    UserControlComponent,
    DialogBoxComponent,
    LoginDialogComponent,
    InstruktorBoxComponent,
    SafehtmlPipe,
    TestComponent,
    DialogContent,
    DialogContent2,
    ProfilComponent,
    RegistracijaComponent,
    AktivacijaUporabnikovComponent,
    UporabnikiComponent,
    TerminiComponent,
    RazpsTerminaComponent,
    EditTerminDialogComponent,
    PrijavaNaTerminDialogComponent,
    ConfirmDialogComponent,
    PregledObiskovUporabnikaComponent,
    SpremembaGeslaDialogComponent,
    SpremembaPodatkovDialogComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    SlideshowModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCf3j4mlSw66wrUhXL1EVzxVN02J93rI2w'
    }),
    GalleryModule,
    NgxMaterialTimepickerModule,
    ColorPickerModule,
    FormsModule,
    FlexLayoutModule,
    NgxGalleryModule,
    AngularEditorModule,
    HttpClientModule,
    CKEditorModule,
    NgxDaterangepickerMd.forRoot({
      format: 'MM/DD/YYYY', // could be 'YYYY-MM-DDTHH:mm:ss.SSSSZ'
      direction: 'ltr', // could be rtl
      weekLabel: 'T',
      separator: ' - ', // default is ' - '
      cancelLabel: 'Prekliči', // detault is 'Cancel'
      applyLabel: 'Ok', // detault is 'Apply'
      clearLabel: 'Pobriši', // detault is 'Clear'
      customRangeLabel: 'Od - Do',
  })
  ],
  entryComponents: [
    DialogBoxComponent,
    LoginDialogComponent,
    EditTerminDialogComponent,
    PrijavaNaTerminDialogComponent,
    SpremembaGeslaDialogComponent,
    SpremembaPodatkovDialogComponent,
    InstruktorBoxComponent,
    DialogContent,
    DialogContent2,
    ConfirmDialogComponent,
  ],
  providers: [NeedAuthGuard,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
