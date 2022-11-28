import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarWarsService } from 'src/app/services/star-wars.service';

@Component({
  selector: 'app-planets-view',
  templateUrl: './planets-view.component.html',
  styleUrls: ['./planets-view.component.css']
})
export class PlanetsViewComponent implements OnInit {

  planetId: any;

  planet : any = null;

  constructor(
    private activatedRoute : ActivatedRoute,
    private starWarsApi : StarWarsService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (response: any) => {
        console.log(response.params.id)
        this.planetId = response.params.id
      }
    )
    this.starWarsApi.getPlanetById(this.planetId).subscribe(
      response => {
        console.log(response)
        this.planet = response
      }
    )
  }

}
