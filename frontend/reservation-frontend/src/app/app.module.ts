import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import { SessionComponent } from './session/session.component';
import {ReservationComponent, TicketDialog} from './reservation/reservation.component';
import { HomeComponent } from './home/home.component';
import {MatButtonModule} from "@angular/material/button";
import { DateSelectComponent } from './session/date-select/date-select.component';
import { SeatOverviewComponent } from './session/seat-overview/seat-overview.component';
import {MatSelectModule} from "@angular/material/select";
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    SessionComponent,
    ReservationComponent,
    HomeComponent,
    DateSelectComponent,
    SeatOverviewComponent,
    TicketDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    HttpClientModule,
    MatTableModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
