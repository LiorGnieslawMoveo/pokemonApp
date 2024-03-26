import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Pokemon } from '../interfaces/pokemon.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  private imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.cookieService.get('isLoggedIn') === 'true');

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  setLoggedInStatus(status: boolean): void {
    this.isLoggedInSubject.next(status);
  }
  getIsLoggedInSubjectStatus(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<any>(this.apiUrl + '?offset=0&limit=100').pipe(
      map(response => response.results.map((pokemon: Pokemon) => ({
        name: pokemon.name,
        url: pokemon.url,
        id: this.extractPokemonIdFromUrl(pokemon.url),
        imageUrl: `${this.imageUrl}${this.extractPokemonIdFromUrl(pokemon.url)}.png`
      }))),
      mergeMap(pokemons => {
        const requests: Observable<any>[] = pokemons.map(pokemon =>
          this.getPokemonDetails(pokemon.url).pipe(
            map((detail: Pokemon) => ({
              types: detail.types.map((type: any) => type.type.name),
              abilities: detail.abilities.map((ability: any) => ability.ability.name),
              height: detail.height,
              weight: detail.weight
            }))
          )
        );
        return forkJoin(requests).pipe(
          map(details => {
            return pokemons.map((pokemon, index) => ({
              ...pokemon,
              types: details[index].types,
              abilities: details[index].abilities,
              height: details[index].height,
              weight: details[index].weight
            }));
          })
        );
      })
    );
  }

  getPokemonDetails(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }

  getPokemonDetailsByName(name: string): Observable<Pokemon> {
    return this.http.get<any>(`${this.apiUrl}${name}`).pipe(
      map(response => this.mapPokemon(response, response.species.url))
    );
  }

  private mapPokemon(detail: any, url: string): Pokemon {
    return {
      name: detail.name,
      types: detail.types.map((type: any) => type.type.name),
      abilities: detail.abilities.map((ability: any) => ability.ability.name),
      height: detail.height,
      weight: detail.weight,
      imageUrl: `${this.imageUrl}${this.extractPokemonIdFromUrl(url)}.png`,
      url: url,
      id: this.extractPokemonIdFromUrl(url)
    };
  }

  private extractPokemonIdFromUrl(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2], 10);
  }
}
