import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarWarsService } from 'src/app/services/star-wars.service';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css']
})
export class SpeciesComponent implements OnInit {

  speciesList : any = null;

  constructor(
    private starWarsApi : StarWarsService,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.starWarsApi._speciesList$.subscribe(
      (response : any) => {
        console.log(response)
        this.speciesList = response
      }
    )
  }
}
