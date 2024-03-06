import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})

export class HistoryComponent implements OnInit{
  searchHistory: string[] = [];

  ngOnInit(): void {
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
