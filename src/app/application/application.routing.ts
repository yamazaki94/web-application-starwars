import { Routes } from "@angular/router";
import { FilmViewComponent } from "./film-view/film-view.component";
import { FilmsComponent } from "./films/films.component";
import { PeopleViewComponent } from "./people-view/people-view.component";
import { PeopleComponent } from "./people/people.component";
import { PlanetsViewComponent } from "./planets-view/planets-view.component";
import { PlanetsComponent } from "./planets/planets.component";
import { SpeciesViewComponent } from "./species-view/species-view.component";
import { SpeciesComponent } from "./species/species.component";
import { StarshipsViewComponent } from "./starships-view/starships-view.component";
import { StarshipsComponent } from "./starships/starships.component";
import { VehiclesComponent } from "./vehicles/vehicles.component";
import { VehiclesViewComponent } from "./vehicles-view/vehicles-view.component";

export const applicationRoutes: Routes = [
  { path : '', redirectTo : 'films', pathMatch: 'full'},
  { path : 'films', children: [
    { path : '', component : FilmsComponent },
    { path : ':id', component : FilmViewComponent },
  ]},
  { path : 'people', children: [
    { path : '', component : PeopleComponent },
    { path : ':id', component : PeopleViewComponent },
  ]},
  { path : 'planets', children: [
    { path : '', component : PlanetsComponent },
    { path : ':id', component : PlanetsViewComponent },
  ]},
  { path : 'species', children: [
    { path : '', component : SpeciesComponent },
    { path : ':id', component : SpeciesViewComponent },
  ]},
  { path : 'starships', children: [
    { path : '', component : StarshipsComponent },
    { path : ':id', component : StarshipsViewComponent },
  ]},
  { path : 'vehicles', children: [
    { path : '', component : VehiclesComponent },
    { path : ':id', component : VehiclesViewComponent },
  ]}
];
