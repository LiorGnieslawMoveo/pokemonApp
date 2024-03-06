import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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
    private cookieService: CookieService
    ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.cookieService.get('isLoggedIn') === 'true';
    this.pokemonService.getIsLoggedInSubject().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    if (!this.isLoggedIn){
      this.router.navigate(['/login']);
    }
    this.loadSearchHistory();
  }

  loadSearchHistory(): void {
    if (typeof localStorage !== 'undefined') {
      const savedSearchHistory = localStorage.getItem('searchHistory');
      if (savedSearchHistory) {
        this.searchHistory = JSON.parse(savedSearchHistory);
      }
    }
  }
}
