import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Route, Router } from '@angular/router';
import { StarWarsService } from 'src/app/services/star-wars.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {


  constructor(
    private router : Router,
    private starWarsApi : StarWarsService
  ) { }

  ngOnInit(): void {
    let url = "/" + window.location.href.split('/')[3]
    console.log(url)
    this.navigateToUrl(url)
  }

  navigateToUrl(url : any) {
    switch (url) {
      case '/people':
        console.log('people inside')
        this.starWarsApi._personList$.next(null)
        this.starWarsApi.getPeople().subscribe(
          res => {
            console.log('calling new list')
            this.starWarsApi._personList$.next(res)
          }
        )
        break;
      case '/films':
        this.starWarsApi._filmsList$.next(null)
        this.starWarsApi.getFilms().subscribe(
          res => {
            this.starWarsApi._filmsList$.next(res)
          }
        )
        break;
      case '/planets':
        this.starWarsApi._planetsList$.next(null)
        this.starWarsApi.getPlanets().subscribe(
          res => {
            this.starWarsApi._planetsList$.next(res)
          }
        )
        break;
      case '/species':
        this.starWarsApi._speciesList$.next(null)
        this.starWarsApi.getSpecies().subscribe(
          res => {
            this.starWarsApi._speciesList$.next(res)
          }
        )
        break;
      case '/starships':
        this.starWarsApi._starshipList$.next(null)
        this.starWarsApi.getStartShips().subscribe(
          res => {
            this.starWarsApi._starshipList$.next(res)
          }
        )
        break;
      case '/vehicles':
        this.starWarsApi._vehicleList$.next(null)
        this.starWarsApi.getVehicles().subscribe(
          res => {
            this.starWarsApi._vehicleList$.next(res)
          }
        )
        break;
      default:
        break;
    }
  }

}
