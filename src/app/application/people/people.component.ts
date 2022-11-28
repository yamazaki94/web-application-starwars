import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarWarsService } from 'src/app/services/star-wars.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  peopleList : any = null;

  constructor(
    private starWarsApi : StarWarsService,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.starWarsApi._personList$.subscribe(
      (response : any) => {
        console.log(response)
        this.peopleList = response
      }
    )
  }

}
