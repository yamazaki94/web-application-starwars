import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StarWarsService } from 'src/app/services/star-wars.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit, OnDestroy {

  subscriptions!: Subscription;

  planetsList : any = null;

  constructor(
    private starWarsApi : StarWarsService,
  ) { }

  ngOnInit(): void {
    this.subscriptions =
      this.starWarsApi._planetsList$.subscribe(
        (response : any) => {
          console.log(response)
          this.planetsList = response
        }
      )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


}
