import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  navLinks: any[] = [
    { label: 'Pokemons', routerLink: '/pokemons' },
    { label: 'Search History', routerLink: '/history' }
  ];

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
  }

  logout(): void {
    this.cookieService.delete('isLoggedIn');
    this.isLoggedIn = false;
    this.pokemonService.setLoggedInStatus(false);
    this.router.navigate(['/login']);
  }
}