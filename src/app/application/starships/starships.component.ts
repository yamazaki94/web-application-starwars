import { Component, OnInit } from '@angular/core';
import { StarWarsService } from 'src/app/services/star-wars.service';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css']
})
export class StarshipsComponent implements OnInit {

  starShipList : any = null;

  constructor(
    private starWarsApi : StarWarsService,
  ) { }

  ngOnInit(): void {

    this.starWarsApi._starshipList$.subscribe(
      (response : any) => {
        console.log(response)
        this.starShipList = response
      }
    )
  }

}
