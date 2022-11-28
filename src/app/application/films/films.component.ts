import { Component, OnInit } from '@angular/core';
import { StarWarsService } from 'src/app/services/star-wars.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  filmList : any = null;

  constructor(
    private starWarsApi : StarWarsService,
  ) { }

  ngOnInit(): void {
    this.starWarsApi._filmsList$.subscribe(
      (response : any) => {
        console.log(response)
        this.filmList = response
      }
    )
  }



}
