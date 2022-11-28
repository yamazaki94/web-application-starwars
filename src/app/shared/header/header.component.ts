import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StarWarsService } from 'src/app/services/star-wars.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchString : any = null;
  searchResult: any[] = [];

  constructor(
    private starWarsApi : StarWarsService,
    private router : Router
  ) { }

  ngOnInit(): void {

    this.starWarsApi._lastSearchResults$.subscribe(res => {
      console.log(res)
      this.searchResult = res;
    })

  }

  onSearchInitiate(search : any) {
    console.log(search)
    this.onSearch(search.searchUrl, search.searchString, false)
  }

  onSearch(search: any, searchString: any, isSearch : boolean) {

    let searchUrl : any;

    if(search === null ) {
      searchUrl = window.location.href.split('/')[3]
    } else {
      searchUrl = search;
      this.searchString = searchString
    }
    switch (searchUrl) {
      case 'people':
        this.router.navigate(['/people']);
        this.starWarsApi._personList$.next(null)
        this.starWarsApi.searchPerson(this.searchString).subscribe(
          res => {
            this.starWarsApi._personList$.next(res)
          }
        )

        break;
        case 'films':
          this.router.navigate(['/films']);
          this.starWarsApi._filmsList$.next(null)
          this.starWarsApi.searchFilm(this.searchString).subscribe(
            res => {
              this.starWarsApi._filmsList$.next(res)
            }
          )
          break;
        case 'planets':
          this.router.navigate(['/planets']);
          this.starWarsApi._planetsList$.next(null)
          this.starWarsApi.searchPlanets(this.searchString).subscribe(
            res => {
              this.starWarsApi._planetsList$.next(res)
            }
          )
          break;
        case 'species':
          this.router.navigate(['/species']);
          this.starWarsApi._speciesList$.next(null)
          this.starWarsApi.searchSpecies(this.searchString).subscribe(
            res => {
              this.starWarsApi._speciesList$.next(res)
            }
          )
          break;
        case 'starships':
          this.router.navigate(['/starships']);
          this.starWarsApi._starshipList$.next(null)
          this.starWarsApi.searchStartShips(this.searchString).subscribe(
            res => {
              this.starWarsApi._starshipList$.next(res)
            }
          )
          break;
        case 'vehicles':
          this.router.navigate(['/vehicles']);
          this.starWarsApi._vehicleList$.next(null)
          this.starWarsApi.searchVehicles(this.searchString).subscribe(
            res => {
              this.starWarsApi._vehicleList$.next(res)
            }
          )
          break;
      default:
        break;
    }

    if(isSearch) {
      if(this.searchResult.length === 4) {
        this.searchResult.splice(0,1)
      }
      let newResult = [
        ...this.searchResult,
        {
          searchString : this.searchString,
          searchUrl : searchUrl
        }
      ]
      this.starWarsApi._lastSearchResults$.next(newResult);
    }


  }

}
