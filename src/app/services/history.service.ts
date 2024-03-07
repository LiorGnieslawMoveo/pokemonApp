import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class HistoryService {

    loadSearchHistory(): string[] {
        if (typeof localStorage !== 'undefined') {
            const searchHistoryJSON = localStorage.getItem('searchHistory');
            return searchHistoryJSON ? JSON.parse(searchHistoryJSON) : [];
        }
      }
}
