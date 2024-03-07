import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PokemonService } from '../../services/pokemon.service';
import { navLinks } from '../../constants/navLinks';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  navLinks = navLinks;

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private cookieService: CookieService
    ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.cookieService.get('isLoggedIn') === 'true';
    this.pokemonService.getIsLoggedInSubjectStatus().subscribe(isLoggedIn => {
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