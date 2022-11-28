import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarWarsService } from 'src/app/services/star-wars.service';

@Component({
  selector: 'app-species-view',
  templateUrl: './species-view.component.html',
  styleUrls: ['./species-view.component.css']
})
export class SpeciesViewComponent implements OnInit {

  specieId: any;

  specie : any = null;

  constructor(
    private activatedRoute : ActivatedRoute,
    private starWarsApi : StarWarsService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (response: any) => {
        console.log(response.params.id)
        this.specieId = response.params.id
      }
    )
    this.starWarsApi.getSpecieById(this.specieId).subscribe(
      response => {
        console.log(response)
        this.specie = response
      }
    )
  }

}
