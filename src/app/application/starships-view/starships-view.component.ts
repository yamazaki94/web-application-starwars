import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarWarsService } from 'src/app/services/star-wars.service';

@Component({
  selector: 'app-starships-view',
  templateUrl: './starships-view.component.html',
  styleUrls: ['./starships-view.component.css']
})
export class StarshipsViewComponent implements OnInit {

  starShipId: any;

  starShip : any = null;

  constructor(
    private activatedRoute : ActivatedRoute,
    private starWarsApi : StarWarsService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (response: any) => {
        console.log(response.params.id)
        this.starShipId = response.params.id
      }
    )
    this.starWarsApi.getStartShipById(this.starShipId).subscribe(
      response => {
        console.log(response)
        this.starShip = response
      }
    )
  }

}
