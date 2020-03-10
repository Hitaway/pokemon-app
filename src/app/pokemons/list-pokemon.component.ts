import { Component, OnInit } from '@angular/core';
import { Pokemon } from './pokemon';
import { Router } from '@angular/router';
import { PokemonsService } from './pokemons.service';

@Component({
    selector: 'list-pokemon',
    templateUrl: './app/pokemons/list-pokemon.component.html',
})

export class ListPokemonComponent implements OnInit {

    pokemons: Pokemon[] = null;

    constructor(private router: Router, private pokemonsService: PokemonsService) { }

    ngOnInit(): void {
        this.pokemons = this.pokemonsService.getPokemons();
    }

    selectPokemon(pokemon: Pokemon): void {
        console.log('Vous avez sélectionné ' + pokemon.name);
        let link = ['/pokemon', pokemon.id];
        console.log('Vous allez être redirigé par: link =>');
        console.log(link);
        this.router.navigate(link); // rediriger l'utilisateur
    }
}