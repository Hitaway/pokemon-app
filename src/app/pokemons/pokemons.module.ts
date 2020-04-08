import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListPokemonComponent } from './list-pokemon.component';
import { DetailPokemonComponent } from './detail-pokemon.component';
import { BorderCardDirective } from './border-card.directive';
import { PokemonTypeColorPipe } from './pokemon-type-color.pipe';
import { PokemonsService } from './pokemons.service';
import { PokemonSearchComponent } from './search-pokemon.component';
import { LoaderComponent } from '../loader.component';
import { AuthGuard } from '../auth-guard.service';
import { EditPokemonComponent } from './edit-pokemon.component';
import { PokemonFormComponent } from './pokemon-form.component';
import { PokemonRoutingModule } from './pokemons-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PokemonRoutingModule
    ],
    declarations: [
        ListPokemonComponent,
        DetailPokemonComponent,
        PokemonFormComponent,
        PokemonSearchComponent,
        EditPokemonComponent,
        LoaderComponent,
        BorderCardDirective,
        PokemonTypeColorPipe
    ],
    providers: [PokemonsService, AuthGuard]
})
export class PokemonsModule { }
