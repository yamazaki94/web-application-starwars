import { Component, OnInit } from '@angular/core';
import { StarWarsService } from './services/star-wars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private starWarsApi : StarWarsService
  ) { }

  ngOnInit(): void {
    this.starWarsApi.getFilms().subscribe(
      res => {
        this.starWarsApi._filmsList$.next(res)
      }
    )
  }
  title = 'sort-web-app';
}
