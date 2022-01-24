import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ReservationService} from "../../../shared/reservation.service";
import {Router} from "@angular/router";
import {DataService, Seat} from "../../../shared/data.service";

@Component({
  selector: 'app-seat-overview',
  templateUrl: './seat-overview.component.html',
  styleUrls: ['./seat-overview.component.scss']
})
export class SeatOverviewComponent implements OnChanges {

  // TODO: we need a decorator here

  public selectedSession!: number | null | undefined;
  public seats: SeatDisplay[] | null;
  public displayedColumns: string[];

  constructor(private readonly reservation: ReservationService,
              private readonly data: DataService,
              private readonly router: Router) {
    this.seats = null;
    this.displayedColumns = ['id', 'category', 'price', 'booked'];
  }

  public bookSeat(seatId: number): void {
    this.data.seatToBook = this.seats?.filter(s => s.id === seatId).pop()!;
    // TODO: set all data in DataService

    // TODO: navigate to the ReservationComponent
    this.router.navigate(['reservation'])
      .then(success => {
        console.log(`Navigation to reservation component: ${success}`);
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // TODO: retrieve seats for the currently selected session
    // hint: you do _not_ need to use the parameter of this method
  }
}

class SeatDisplay extends Seat {

  public get btnText(): string {
    return this.booked
      ? 'Already booked!'
      : 'Book now!';
  }

}
