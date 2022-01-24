import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public year: number;

  constructor(private readonly router: Router) {
    const date = new Date();
    this.year = date.getFullYear();
  }

  public navigateToSessionSelect(): void {
    this.router.navigate(['session'])
      .then(success => {
        console.log(`Navigation to session component: ${success}`);
      });
  }
}
