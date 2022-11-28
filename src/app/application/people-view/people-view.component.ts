import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarWarsService } from 'src/app/services/star-wars.service';

@Component({
  selector: 'app-people-view',
  templateUrl: './people-view.component.html',
  styleUrls: ['./people-view.component.css']
})
export class PeopleViewComponent implements OnInit {
  personId: any;

  person : any = null;

  constructor(
    private activatedRoute : ActivatedRoute,
    private starWarsApi : StarWarsService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (response: any) => {
        console.log(response.params.id)
        this.personId = response.params.id
      }
    )
    this.starWarsApi.getPersonById(this.personId).subscribe(
      response => {
        console.log(response)
        this.person = response
      }
    )
  }

}
