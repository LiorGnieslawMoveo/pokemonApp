import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})

export class HistoryComponent implements OnInit{
  searchHistory: string[] = [];
  isLoggedIn: boolean = false;

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private cookieService: CookieService,
    private historyService: HistoryService
    ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.cookieService.get('isLoggedIn') === 'true';
    this.pokemonService.getIsLoggedInSubjectStatus().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    if (!this.isLoggedIn){
      this.router.navigate(['/login']);
    }
    this.searchHistory = this.historyService.loadSearchHistory();
  }
}
