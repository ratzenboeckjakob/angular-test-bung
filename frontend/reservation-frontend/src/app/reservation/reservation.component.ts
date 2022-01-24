import {Component, Inject, OnInit} from '@angular/core';
import {IPerson, ReservationService} from "../../shared/reservation.service";
import {Router} from "@angular/router";
import {DataService, Seat} from "../../shared/data.service";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  public sessionDate: Date | null;
  public seat: Seat | null;
  public userForm: FormGroup;

  constructor(private readonly reservation: ReservationService,
              private readonly data: DataService,
              // TODO: inject an instance of the DataService
              private readonly dialog: MatDialog) {
    this.sessionDate = null;
    this.seat = null;
    this.userForm = ReservationComponent.createUserForm();
  }

  public ngOnInit(): void {
    this.seat = this.data.seatToBook;
    this.reservation.getSessions()
      .subscribe(sessions => {
        this.sessionDate = sessions
          .filter(s => s.id === this.data.sessionToBook)
          .map(s => s.date)
          .pop()!;
      });
  }

  private static createUserForm(): FormGroup {
    // TODO: create the FormGroup for your form
    // hint: do not forget the validators!
    return new FormGroup({}); // remove this line!
  }

  public async submitForm(): Promise<void> {
    const personData = this.getFormValues();
    // TODO: get proper ticket data
    const ticket: any = {}; // fix this line
    const dialogData = {data: ticket.id};
    this.dialog.open(TicketDialog, dialogData);
  }

  public get validationErrors(): string[] {
    const allErrors = getFormValidationErrors(this.userForm.controls);
    if (allErrors.length === 0) {
      return [];
    }
    return allErrors.map(e => `${e.controlName}: ${e.errorName}`);
  }

  private getFormValues(): IPerson {
    return {
      dob: this.userForm.get('dateOfBirth')?.value,
      city: this.userForm.get('address.city')?.value,
      zip: this.userForm.get('address.zip')?.value,
      lastName: this.userForm.get('name.lastName')?.value,
      firstName: this.userForm.get('name.firstName')?.value,
      street: this.userForm.get('address.street')?.value,
      streetNo: this.userForm.get('address.streetNo')?.value,
      mail: this.userForm.get('email')?.value
    };
  }
}

class MyValidators {
  public static validDateOfBirth(control: AbstractControl): ValidationErrors | null {
    let dob: Date;
    try {
      dob = new Date(control.value);
    } catch (_) {
      return {'invalid format': 'unable to parse, wrong format'};
    }
    const today = new Date();
    const diffMillis = today.getTime() - dob.getTime();
    if (diffMillis < 0) {
      return {'too young': "You aren't born yet"};
    }
    const years = diffMillis / 1000 / 60 / 60 / 24 / 365;
    if (years > 120) {
      return {'too old': 'Pretty sure you are already RIPing'};
    }
    return null;
  }

  public static validCity(control: AbstractControl): ValidationErrors | null {
    // TODO: ensure that only people who live in the city Leonding (no matter the case!) are allowed to participate
    return null;
  }
}

interface AllValidationErrors {
  controlName: string;
  errorName: string;
}

interface FormGroupControls {
  [key: string]: AbstractControl;
}

function getFormValidationErrors(controls: FormGroupControls): AllValidationErrors[] {
  let errors: AllValidationErrors[] = [];
  Object.keys(controls).forEach(key => {
    const control = controls[key];
    if (control instanceof FormGroup) {
      errors = errors.concat(getFormValidationErrors(control.controls));
    }
    const controlErrors: ValidationErrors | null = controls[key].errors;
    if (controlErrors !== null) {
      Object.keys(controlErrors).forEach(keyError => {
        errors.push({
          controlName: key,
          errorName: keyError,
        });
      });
    }
  });
  return errors;
}

@Component({
  selector: 'ticket-dialog',
  templateUrl: 'ticket-dialog.html',
})
export class TicketDialog {
  constructor(private readonly dialogRef: MatDialogRef<TicketDialog>,
              private readonly router: Router,
              @Inject(MAT_DIALOG_DATA) public id: string) {
  }

  public backToSelection(): void {
    this.dialogRef.close();
    this.router.navigate(['session'])
      .then(success => {
        console.log(`Navigation from ticket dialog back to session component: ${success}`);
      })
  }
}
