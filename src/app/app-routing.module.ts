import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoritveComponent } from './storitve/storitve.component';
import { OnasComponent } from './onas/onas.component';
import { HomeComponent } from './home/home.component';
import { KjesmoComponent } from './onas/kjesmo/kjesmo.component';
import { InstruktorjiComponent } from './onas/instruktorji/instruktorji.component';
import { CenikComponent } from './cenik/cenik.component';
import { GalerijaComponent } from './galerija/galerija.component';
import { UrnikComponent } from './urnik/urnik.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { IndividualnavadbaComponent } from './storitve/individualnavadba/individualnavadba.component';
import { MasazeComponent } from './storitve/masaze/masaze.component';
import { RehabilitacijaComponent } from './storitve/rehabilitacija/rehabilitacija.component';
import { RojstnodnevneComponent } from './storitve/rojstnodnevne/rojstnodnevne.component';
import { SestavatreningaComponent } from './storitve/sestavatreninga/sestavatreninga.component';
import { SkupinskevadbeComponent } from './storitve/skupinskevadbe/skupinskevadbe.component';
import { NoviceComponent } from './novice/novice.component';
import { TestComponent } from './test/test.component';
import { UserControlComponent } from './user-control/user-control.component';
import { NeedAuthGuard as AuthGuard} from './need-auth-guard.service';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'novice', component: NoviceComponent, data : {id:"test"} },
  { path: 'storitve', component: StoritveComponent },
  { path: 'cenik', component: CenikComponent },
  { path: 'onas', component: OnasComponent },
  { path: 'kjesmo', component: KjesmoComponent },
  { path: 'instruktorji', component: ProfileCardComponent },
  { path: 'galerija', component: GalerijaComponent },
  { path: 'urnik', component: UrnikComponent },
  { path: 'individualnavadba', component: IndividualnavadbaComponent },
  { path: 'masaze', component: MasazeComponent },
  { path: 'rehabilitacija', component: RehabilitacijaComponent },
  { path: 'rojstnodnevne', component: RojstnodnevneComponent },
  { path: 'sestavatreninga', component: SestavatreningaComponent },
  { path: 'skupinskevadbe', component: SkupinskevadbeComponent },
  { path: 'user-control', component: UserControlComponent, canActivate: [AuthGuard]},
  { path: 'test', component: TestComponent},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
