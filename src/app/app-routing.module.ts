import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonsComponent } from './components/pokemons/pokemons.component';
import { HistoryComponent } from './components/history/history.component';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo:'auth', pathMatch:'full'},
  { path: 'pokemons', component: PokemonsComponent},
  { path: 'history', component: HistoryComponent},
  { path: 'auth', component: AuthComponent},
  { path: '**', redirectTo:'auth', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
