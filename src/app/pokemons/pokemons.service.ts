import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { POKEMONS } from './mock-pokemons';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class PokemonsService {

    constructor(private http: HttpClient) { }

    private pokemonsUrl = 'api/pokemons';

    // permet de centraliser la gestion des logs dans notre service
    private log(log: string) {
        console.info(log);
    }

    private handleError<T>(operation='operation', result?: T) {     // T signifie que nous allons typer un type en lui même. operation est le nom de la méthode qui a causer l'erreur
        return (error: any): Observable<T> => {                     // l'application continue a fonctionner malgrer l'erreur
            console.log(error); 
            console.log(`${operation} failed: ${error.message}`);

            return of(result as T);     // permet de transformer les données passer en paramètre en observable
        }
    }

    deletePokemon(pokemon: Pokemon): Observable<Pokemon> {
        const url = `${this.pokemonsUrl}/${pokemon.id}`;
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'appplication/json'})
        }

        return this.http.delete<Pokemon>(url, httpOptions).pipe(
            tap(_ => this.log(`deleted pokemon id=${pokemon.id}`)),
            catchError(this.handleError<Pokemon>('deletePokemon'))
        );
    }

    updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})  // le corp du format de la requête sera au format json
        }

        return this.http.put(this.pokemonsUrl, pokemon, httpOptions).pipe(  // on précise le "pokemon" que nous voulons modifier et aussi la route "pokemonsUrl"
            tap(_ => this.log(`updated pokemon  id=${pokemon.id}`)),
            catchError(this.handleError<any>('updatedPokemon'))
        );
    }

    searchPokemons(term: string): Observable<Pokemon[]> {   // term est une chaine de caractère rentrer par l'utilisateur
        if(!term.trim()) {  // test si l'utilisateur n'a pas rentré un term vide
            return of ([]);
        }

        return this.http.get<Pokemon[]>(`${this.pokemonsUrl}/?name=${term}`).pipe(
            tap(_ => this.log(`found pokemons matching "${term}"`)),
            catchError(this.handleError<Pokemon[]>('searchPokemons', []))
        );
    }

    // Retourne tous les pokemons
    getPokemons(): Observable<Pokemon[]> {
        return this.http.get<Pokemon[]>(this.pokemonsUrl).pipe(     // http.get envoi une requête http de type get sur la route pokemonsUrl
            tap(_ => this.log(`fetched pokemons`)),                 // éxecuter une action quelconque, ici on affiche un message pour voir si la méthode a bien été appellé
            catchError(this.handleError(`getPokemons`, []))        // gérer les érreur éventuel (ex: si la requête n'aboutie pas)
        );
    }

    // Retoune le pokémon avec l'identifiant passé en paramètre
    getPokemon(id: number): Observable<Pokemon> {
        const url = `${this.pokemonsUrl}/${id}`;

        return this.http.get<Pokemon>(url).pipe(
            tap(_=> this.log(`fetched pokemon id=${id}`)),
            catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
        );
    }

    getPokemonTypes(): string[] {
        return ['Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrique', 'Poison', 'Fée', 'Vol'];
    }
}
