import { Injectable } from '@angular/core';
import {Category, ISessionSeatDTO} from "./reservation.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public sessionToBook: number | null;
  public seatToBook: Seat | null;

  constructor() {
    this.seatToBook = null;
    this.sessionToBook = null;
  }
}

export class Seat {

  public readonly booked: boolean;
  public readonly category: Category;
  public readonly id: number;
  public readonly price: number;

  constructor(dto: ISessionSeatDTO) {
    this.id = dto.id;
    this.booked = dto.booked;

    switch (dto.category) {
      case Category.VIP: {
        this.category = Category.VIP;
        this.price = 12.99;
      }
        break;
      case Category.SEAT: {
        this.category = Category.SEAT;
        this.price = 9.99;
      }
        break;
      case Category.STANDING: {
        this.category = Category.STANDING;
        this.price = 4.99;
      }
        break;
      default: {
        throw new Error('unknown category');
      }
    }
  }

}
