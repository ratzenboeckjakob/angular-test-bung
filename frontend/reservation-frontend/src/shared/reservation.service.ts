import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";

const BASE_URL: string = 'http://localhost:8080/api/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private readonly http: HttpClient) { }

  public getSessions(): Observable<ISessionDateDTO[]> {
    const url = `${BASE_URL}/session/dates`;
    return this.http.get<ISessionDateDTO[]>(url);
  }

  public getSeats(sessionId: number): Observable<ISessionSeatDTO[]> {
    // TODO: get seat data from the backend
    const url = `${BASE_URL}/${sessionId}/seats`;
    return this.http.get<ISessionSeatDTO[]>(url);
  }

  public bookSeat(seatId: number, person: IPerson): Promise<ITicket> {
    // TODO: reserve the seat at the backend

    return new Promise<ITicket>(p => {}); // delete this line!
  }
}

export interface ISessionDateDTO {
  id: number,
  date: Date
}

export interface ISessionSeatDTO {
  id: number,
  category: string,
  booked: boolean
}

export enum Category {
  VIP = 'VIP',
  SEAT = 'SEAT',
  STANDING = 'STANDING'
}

export interface IPerson {
  firstName: string,
  lastName: string,
  dob: Date,
  city: string,
  zip: number,
  street: string,
  streetNo: number,
  mail: string
}

export interface ITicket {
  id: string
}
