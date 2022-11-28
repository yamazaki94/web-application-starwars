import { Component, OnInit } from '@angular/core';
import { StarWarsService } from 'src/app/services/star-wars.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  vehicleList : any = null;

  constructor(
    private starWarsApi : StarWarsService
  ) { }

  ngOnInit(): void {

    this.starWarsApi._vehicleList$.subscribe(
      (response : any) => {
        console.log(response)
        this.vehicleList = response
      }
    )
  }
}
