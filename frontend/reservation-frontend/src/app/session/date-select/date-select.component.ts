import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ISessionDateDTO, ReservationService} from "../../../shared/reservation.service";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-date-select',
  templateUrl: './date-select.component.html',
  styleUrls: ['./date-select.component.scss']
})
export class DateSelectComponent implements OnInit {

  public sessions: ISessionDateDTO[] | null;
  public selectedSession: number | null;
  // TODO: we need a decorator here
  public selectionChanged: EventEmitter<number>;

  constructor(private readonly reservation: ReservationService) {
    this.sessions = null;
    this.selectedSession = null;
    this.selectionChanged = new EventEmitter<number>();
  }

  public ngOnInit(): void {
    this.reservation.getSessions()
      .subscribe({
        next: s => {

          // TODO process session date data
        },
        error: eMsg => {
          console.log(`Error while retrieving sessions: ${eMsg}`);
        }
      })
  }

  public sessionSelectChanged(event: MatSelectChange): void {
    const sessionId = event.value;
  this.changeSelection(sessionId);
  }

  private changeSelection(sessionId: number): void {
    console.log(`Session selection changed to ${sessionId}`)
    this.selectionChanged.emit(sessionId);
  }
}
