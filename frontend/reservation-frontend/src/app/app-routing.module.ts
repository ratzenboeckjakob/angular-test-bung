import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {SessionComponent} from "./session/session.component";
import {ReservationComponent} from "./reservation/reservation.component";

const routes: Routes = [
  { path: 'session', component: SessionComponent },
  { path: 'reservation', component: ReservationComponent },
  // TODO: add a router path 'reservation' for the ReservationComponent
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
