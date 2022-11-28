import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, Subject } from 'rxjs';
import { defaultIfEmpty, expand, map, mergeMap, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {

  private baseUrl = 'https://swapi.dev/api/';

  public _personList$ = new BehaviorSubject<any>(null);
  public _filmsList$ = new BehaviorSubject<any>(null);
  public _planetsList$ = new BehaviorSubject<any>(null);
  public _speciesList$ = new BehaviorSubject<any>(null);
  public _starshipList$ = new BehaviorSubject<any>(null);
  public _vehicleList$ = new BehaviorSubject<any>(null);

  public _lastSearchResults$ = new BehaviorSubject<any>([]);

  constructor(
    private httpClient : HttpClient
  ) { }

  getFilms() : Observable<any>{
    let _page : any[] = []
    return this.httpClient.get<any>(this.baseUrl + 'films').pipe(
      map((response : any) => {
        _page = response;
        return response.results.map((film: any) => {
          return { ...film,
            link: `/films/${film.url.split('/')[5]}`}
        })
      }),
      map((response : any) => {
        let _response = {
          ..._page, results : response
        }
        return _response
      })
    )
  }

  getFilmById(id : any): Observable<any> {
    let film : any;

    return this.httpClient.get<any>(this.baseUrl + `films/${id}`).pipe(
      switchMap((response : any) => {
        film = response;
        const _character = response.characters.map((character : any) => {
          return this.httpClient.get<any>(character)
        })
        return forkJoin(_character).pipe(
          defaultIfEmpty(null)
        );
      }),
      map((res : any) => {
        let _response = {
          ...film,
          characters : res
        }
        film = _response
        return _response
      }),
      switchMap((response : any) => {
        const _planet = response.planets.map((planet : any) => {
          return this.httpClient.get<any>(planet)
        })
        return forkJoin(_planet).pipe(
          defaultIfEmpty(null)
        );
      }),
      map((res : any) => {
        let _response = {
          ...film,
          planets : res
        }
        film = _response
        return _response
      }),
      switchMap((response : any) => {
        const _specie = response.species.map((specie : any) => {
          return this.httpClient.get<any>(specie)
        })
        return forkJoin(_specie).pipe(
          defaultIfEmpty(null)
        );
      }),
      map((res : any) => {
        let _response = {
          ...film,
          species : res
        }
        film = _response
        return _response
      }),
      switchMap((response : any) => {
        const _starship = response.starships.map((starship : any) => {
          return this.httpClient.get<any>(starship)
        })
        return forkJoin(_starship).pipe(
          defaultIfEmpty(null)
        );
      }),
      map((res : any) => {
        let _response = {
          ...film,
          starships : res
        }
        film = _response
        return _response
      }),
      switchMap((response : any) => {
        const _vehicle = response.vehicles.map((vehicle : any) => {
          return this.httpClient.get<any>(vehicle)
        })
        return forkJoin(_vehicle).pipe(
          defaultIfEmpty(null)
        );
      }),
      map((res : any) => {
        let _response = {
          ...film,
          vehicles : res
        }
        film = _response
        return _response
      }),
    )

  }

  searchFilm (searchString : any): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + `films/?search=${searchString}`).pipe(
      map((res : any) => {
        if(res.results.length === 0) {
          return {
            ...res ,
            results : null
          }
        } else {
          const result = res.results.map((film : any) => {
            return {
              ...film ,
              link : `/films/${film.url.split('/')[5]}`
            }
          })
          return {
            ...res ,
            results : result
          }
        }
      })
    )
  }

  getPeople(): Observable<any> {
    let _page : any[] = []
    return this.httpClient.get<any>(this.baseUrl + 'people').pipe(
      switchMap((response : any) => {
        _page = response;
        const _person = response.results.map((person: any) => {
          return this.httpClient.get<any>(person.homeworld).pipe(
            map(_homeWorld => {
              return { ...person,
                homeworld : _homeWorld.name,
                link : `/people/${person.url.split('/')[5]}`

              }
            })
          )
        })
        return forkJoin(_person);
      }),
      map((res : any) => {
        let _response = {
          ..._page, results : res
        }
        return _response
      })
    )
  }

  getPersonById(id : any) {

    let person : any;

    return this.httpClient.get<any>(this.baseUrl + `people/${id}`,).pipe(
      switchMap((response : any) => {
        person = response;
        const _film = response.films.map((film : any ) => {
          return this.httpClient.get<any>(film)
        })
        return forkJoin(_film).pipe(
          defaultIfEmpty(null)
        );
      }),
      map((res : any) => {
        let _response = {
          ...person,
          films : res
        }
        person = _response
        return _response
      }),
      switchMap((res : any) => {
        const _homeworld = this.httpClient.get<any>(res.homeworld)
        return forkJoin(_homeworld);
      }),
      map((res : any) => {
        let _response = {
          ...person, homeworld : res[0].name
        }
        person = _response
        return _response
      }),
      switchMap((response : any) => {
        const _starship = response.starships
        .map((starship : any ) => {
          return this.httpClient.get<any>(starship)
        })
        return forkJoin(_starship).pipe(
          defaultIfEmpty(null)
        );
      }),
      map((res : any) => {
        let _response = {
          ...person,
          starships : res
        }
        person = _response
        return _response
      }),
      switchMap((response : any) => {
        const _vehicle = response.vehicles
        .map((vehicle : any ) => {
          return this.httpClient.get<any>(vehicle)
        })
        return forkJoin(_vehicle).pipe(
          defaultIfEmpty(null)
        );
      }),
      map((res : any) => {
        console.log(res)

        let _response = {
          ...person,
          vehicles : res
        }
        person = _response
        return _response
      }),
      map((response : any) => {
        let _height : any;

        if(Number(response.height) > 200) {
          _height = 'High'
        } else if (response.height < 100) {
          _height = 'Low'
        } else {
          _height = 'Normal'
        }
        return {
          ...person,
          height : _height
        }
      })
    )

  }

  searchPerson(searchString : any): Observable<any> {
    let _page : any[] = []
    return this.httpClient.get<any>(this.baseUrl + `people/?search=${searchString}`).pipe(
      switchMap((res : any) => {
        _page = res;
        if(res.results.length === 0) {
          return forkJoin().pipe(
            defaultIfEmpty(null)
          )
        }
        const _person = res.results.map((person: any) => {
          return this.httpClient.get<any>(person.homeworld).pipe(
            map(_homeWorld => {
              return { ...person,
                homeworld : _homeWorld.name,
                link : `/people/${person.url.split('/')[5]}`
              }
            })
          )
        })
        return forkJoin(_person);
      }),
      map((res : any) => {
        let _response = {
          ..._page, results : res
        }
        return _response
      })
    )
  }

  getPlanets() : Observable<any> {
    let _page : any[] = []
    return this.httpClient.get<any>(this.baseUrl + 'planets').pipe(
      map((response : any) => {
        _page = response;
        return response.results.map((planet: any) => {
          return { ...planet,
            link: `/planets/${planet.url.split('/')[5]}`}
        })
      }),
      map((response : any) => {
        let _response = {
          ..._page, results : response
        }
        return _response
      })
    )
  }

  getPlanetById(id : any): Observable<any> {
    let planet : any;

    return this.httpClient.get<any>(this.baseUrl + `planets/${id}`).pipe(
      switchMap((response : any) => {
        planet = response;
        const _film = response.films.map((film : any) => {
          return this.httpClient.get<any>(film)
        })
        return forkJoin(_film).pipe(
          defaultIfEmpty(null)
        );
      }),
      map((res : any) => {
        let _response = {
          ...planet ,
          films : res
        }
        planet  = _response
        return _response
      }),
      switchMap((response : any) => {
        const _resident = response.residents.map((film : any) => {
          return this.httpClient.get<any>(film)
        })
        return forkJoin(_resident).pipe(
          defaultIfEmpty(null)
        );
      }),
      map((res : any) => {
        let _response = {
          ...planet ,
          residents : res
        }
        planet  = _response
        return _response
      }),
    )

  }

  searchPlanets (searchString : any): Observable<any> {
    let _page : any[] = []
    return this.httpClient.get<any>(this.baseUrl + `planets/?search=${searchString}`).pipe(
      map((res : any) => {
        if(res.results.length === 0) {
          return {
            ...res ,
            results : null
          }
        } else {
          const result = res.results.map((planet : any) => {
            return {
              ...planet ,
              link : `/planets/${planet.url.split('/')[5]}`
            }
          })
          return {
            ...res ,
            results : result
          }
        }
      })
    )
  }

  getSpecies() : Observable<any> {
    let _page : any[] = []
    let unidentifiedWorld : any[] = []

    return this.httpClient.get<any>(this.baseUrl + 'species').pipe(
      switchMap((response : any) => {
        _page = response;
        let _specie :any[] = [];
        response.results.map((specie: any) => {
          if(specie.homeworld === null ) {
            unidentifiedWorld.push(
              { ...specie,
                link : `/species/${specie.url.split('/')[5]}`
              }
            )
          } else {
            _specie.push(
              this.httpClient.get<any>(specie?.homeworld).pipe(
                map(_homeWorld => {
                  return { ...specie,
                    homeworld : _homeWorld.name,
                    link : `/species/${specie.url.split('/')[5]}`
                  }
                })
              )
            )
          }
        })
        return forkJoin(_specie);
      }),
      map((res : any) => {
        let _response = {
          ..._page, results : [...res, ...unidentifiedWorld]
        }
        return _response
      })
    )
  }

  getSpecieById(id : any): Observable<any> {
    let specie : any;

    return this.httpClient.get<any>(this.baseUrl + `species/${id}`).pipe(
      switchMap((response : any) => {
        specie = response;
        const _film = response.films.map((film : any ) => {
          return this.httpClient.get<any>(film)
        })
        return forkJoin(_film).pipe(
          defaultIfEmpty(null)
        );
      }),
      map((res : any) => {
        let _response = {
          ...specie,
          films : res
        }
        return _response
      }),
      switchMap((response : any) => {
        specie = response;
        const _people = response.people.map((people : any ) => {
          return this.httpClient.get<any>(people)
        })
        return forkJoin(_people).pipe(
          defaultIfEmpty(null)
        );
      }),
      map((res : any) => {
        let _response = {
          ...specie,
          people : res
        }
        return _response
      }),
      switchMap((res : any) => {
        specie = res;
        if(specie.homeworld === null ) {
          return forkJoin().pipe(
            defaultIfEmpty(null)
          );
        } else {
          const _homeworld = this.httpClient.get<any>(res.homeworld)
          return forkJoin(_homeworld);
        }
      }),
      map((res : any) => {
        let _response = {
          ...specie,
          homeworld : res === null ? null : res[0].name
        }
        specie = _response
        return _response
      }),
    )

  }

  searchSpecies (searchString : any): Observable<any> {
    let _page : any[] = []
    return this.httpClient.get<any>(this.baseUrl + `species/?search=${searchString}`).pipe(
      map((res : any) => {
        if(res.results.length === 0) {
          return {
            ...res ,
            results : null
          }
        } else {
          const result = res.results.map((planet : any) => {
            return {
              ...planet ,
              link : `/species/${planet.url.split('/')[5]}`
            }
          })
          return {
            ...res ,
            results : result
          }
        }
      })
    )
  }

  getStartShips() : Observable<any> {
    let _page : any[] = []

    return this.httpClient.get<any>(this.baseUrl + 'starships').pipe(
      map((response : any) => {
        _page = response
        const result = response.results.map((element : any) => {
          let _length : any;

          if (Number(response.length) > 1000 ) {
            _length = 'Large'
          } else if (Number(response.length) < 100 ) {
            _length = 'Small'
          } else {
            _length = 'Normal'
          }
          return {
            ...element,
            length : _length,
            link : `/starships/${element.url.split('/')[5]}`

          }
        });
        return {
          ..._page,
          results : result
        }
      })
    )
  }

  getStartShipById(id : any): Observable<any> {
    let starShip : any;

    return this.httpClient.get<any>(this.baseUrl + `starships/${id}`).pipe(
      switchMap((response : any) => {
        starShip = response;
        const _film = response.films.map((film : any ) => {
          return this.httpClient.get<any>(film)
        })
        return forkJoin(_film).pipe(
          defaultIfEmpty(null)
        );
      }),
      map((res : any) => {
        let _response = {
          ...starShip,
          films : res
        }
        return _response
      }),
      switchMap((response : any) => {
        starShip = response;
        const _pilot = response.pilots.map((pilot : any ) => {
          return this.httpClient.get<any>(pilot)
        })
        return forkJoin(_pilot).pipe(
          defaultIfEmpty(null)
        );
      }),
      map((res : any) => {
        let _response = {
          ...starShip,
          pilots : res
        }
        return _response
      }),
      map((response : any) => {
        starShip = response;
        let _length : any;

        if(Number(response.length) > 1000) {
          _length = 'Large'
        } else if (response.length < 100) {
          _length = 'Small'
        } else {
          _length = 'Normal'
        }
        return {
          ...starShip,
          length : _length
        }
      })
    )

  }

  searchStartShips (searchString : any): Observable<any> {
    let _page : any[] = []
    return this.httpClient.get<any>(this.baseUrl + `starships/?search=${searchString}`).pipe(
      map((res : any) => {
        if(res.results.length === 0) {
          return {
            ...res ,
            results : null
          }
        } else {
          const result = res.results.map((planet : any) => {
            return {
              ...planet ,
              link : `/starships/${planet.url.split('/')[5]}`
            }
          })
          return {
            ...res ,
            results : result
          }
        }
      })
    )
  }

  getVehicles() : Observable<any> {
    let _page : any[] = []

    return this.httpClient.get<any>(this.baseUrl + 'vehicles').pipe(
      map((response : any) => {
        _page = response
        const result = response.results.map((element : any) => {
          return {
            ...element,
            link : `/vehicles/${element.url.split('/')[5]}`

          }
        });
        return {
          ..._page,
          results : result
        }
      })
    )
  }

  getVehicleById(id : any): Observable<any> {
    let starShip : any;

    return this.httpClient.get<any>(this.baseUrl + `vehicles/${id}`).pipe(
      switchMap((response : any) => {
        starShip = response;
        const _film = response.films.map((film : any ) => {
          return this.httpClient.get<any>(film)
        })
        return forkJoin(_film).pipe(
          defaultIfEmpty(null)
        );
      }),
      map((res : any) => {
        let _response = {
          ...starShip,
          films : res
        }
        return _response
      }),
      switchMap((response : any) => {
        starShip = response;
        const _pilot = response.pilots.map((pilot : any ) => {
          return this.httpClient.get<any>(pilot)
        })
        return forkJoin(_pilot).pipe(
          defaultIfEmpty(null)
        );
      }),
      map((res : any) => {
        let _response = {
          ...starShip,
          pilots : res
        }
        return _response
      })
    )

  }

  searchVehicles (searchString : any): Observable<any> {
    let _page : any[] = []
    return this.httpClient.get<any>(this.baseUrl + `vehicles/?search=${searchString}`).pipe(
      map((res : any) => {
        if(res.results.length === 0) {
          return {
            ...res ,
            results : null
          }
        } else {
          const result = res.results.map((planet : any) => {
            return {
              ...planet ,
              link : `/vehicles/${planet.url.split('/')[5]}`
            }
          })
          return {
            ...res ,
            results : result
          }
        }
      })
    )
  }

}
