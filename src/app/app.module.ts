import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PokemonsComponent } from './pokemons/pokemons.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
