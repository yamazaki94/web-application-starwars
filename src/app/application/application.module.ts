import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { FilmsComponent } from './films/films.component';
import { PeopleComponent } from './people/people.component';
import { PlanetsComponent } from './planets/planets.component';
import { SpeciesComponent } from './species/species.component';
import { StarshipsComponent } from './starships/starships.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { FilmViewComponent } from './film-view/film-view.component';
import { PeopleViewComponent } from './people-view/people-view.component';
import { PlanetsViewComponent } from './planets-view/planets-view.component';
import { SpeciesViewComponent } from './species-view/species-view.component';
import { VehiclesViewComponent } from './vehicles-view/vehicles-view.component';
import { StarshipsViewComponent } from './starships-view/starships-view.component';
import { RouterModule } from "@angular/router";
import { applicationRoutes } from "./application.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(applicationRoutes)
  ],
  declarations: [
    FilmsComponent,
    PeopleComponent,
    PlanetsComponent,
    SpeciesComponent,
    StarshipsComponent,
    VehiclesComponent,
    FilmViewComponent,
    PeopleViewComponent,
    PlanetsViewComponent,
    SpeciesViewComponent,
    VehiclesViewComponent,
    StarshipsViewComponent
  ]
})

export class ApplicationModule {}
