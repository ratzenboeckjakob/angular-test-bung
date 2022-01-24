import { Component } from '@angular/core';
import {Event} from "@angular/router";

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent {

  public selectedSession: number | null | undefined;

  constructor() {
    this.selectedSession = null;
  }

  public sessionSelectionChanged(selectedSessionId: number | null | undefined): void {
    this.selectedSession = selectedSessionId;
  }
}
