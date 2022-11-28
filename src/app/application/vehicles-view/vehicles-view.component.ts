import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarWarsService } from 'src/app/services/star-wars.service';

@Component({
  selector: 'app-vehicles-view',
  templateUrl: './vehicles-view.component.html',
  styleUrls: ['./vehicles-view.component.css']
})
export class VehiclesViewComponent implements OnInit {

  vehicleId: any;

  vehicle : any = null;

  constructor(
    private activatedRoute : ActivatedRoute,
    private starWarsApi : StarWarsService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (response: any) => {
        console.log(response.params.id)
        this.vehicleId = response.params.id
      }
    )
    this.starWarsApi.getVehicleById(this.vehicleId).subscribe(
      response => {
        console.log(response)
        this.vehicle = response
      }
    )
  }

}
