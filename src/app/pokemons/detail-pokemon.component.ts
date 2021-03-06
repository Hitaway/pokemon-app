import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from './pokemon';
import { PokemonsService } from './pokemons.service';

@Component({
    selector: 'detail-pokemon',
    templateUrl: './app/pokemons/detail-pokemon.component.html'
})
export class DetailPokemonComponent implements OnInit {

    pokemon: Pokemon = null;    // contient le pokemon afficher à l'utilisateur

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private pokemonsService: PokemonsService) { }

    ngOnInit(): void {
        // snapchot sert à dire que nous voulons récuperer les paramètres de manière synchrone
        let id = +this.route.snapshot.paramMap.get('id'); // recupérer les paramètres
        this.pokemonsService.getPokemon(id)
            .subscribe(pokemon => this.pokemon = pokemon);
    }

    delete(pokemon: Pokemon): void {
        this.pokemonsService.deletePokemon(pokemon)
            .subscribe(_ => this.goBack());
    }

    goBack(): void {
        this.router.navigate(['/pokemon/all']);    // revenir à la liste des pokemons
    }

    goEdit(pokemon: Pokemon): void {
        let link = ['/pokemon/edit', pokemon.id];
        this.router.navigate(link);
    }
}