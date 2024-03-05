import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap} from 'rxjs/operators';
import { Pokemon } from '../type/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) { }

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<any>(this.apiUrl + '?offset=0&limit=100').pipe(
      map(response => response.results.map((pokemon: Pokemon) => ({
        name: pokemon.name,
        url: pokemon.url,
        id: this.extractPokemonIdFromUrl(pokemon.url),
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.extractPokemonIdFromUrl(pokemon.url)}.png`
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

  private extractPokemonIdFromUrl(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2], 10);
  }
}
