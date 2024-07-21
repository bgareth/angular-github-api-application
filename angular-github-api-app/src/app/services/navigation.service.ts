import { Injectable } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private history: string[] = [];
  public isNavigatingBack = false;
  private searchState: { query: string, results: any[] } | null = null;

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd || event instanceof NavigationStart),
        pairwise()
      )
      .subscribe(([prev, current]) => {
        if (current instanceof NavigationStart) {
          const prevIndex = this.history.findIndex(url => url === (prev as NavigationEnd).urlAfterRedirects);
          const currIndex = this.history.findIndex(url => url === (current as NavigationStart).url);
          this.isNavigatingBack = currIndex < prevIndex;
        } else if (current instanceof NavigationEnd) {
          if (this.history.length === 0 || this.history[this.history.length - 1] !== (current as NavigationEnd).urlAfterRedirects) {
            this.history.push((current as NavigationEnd).urlAfterRedirects);
          }
        }
      });
  }

  navigateBack(): void {
    this.isNavigatingBack = true;
    this.history.pop();
  }

  saveSearchState(query: string, results: any[]): void {
    console.log('Saving search state:', { query, results });
    this.searchState = { query, results };
  }

  getSearchState(): { query: string, results: any[] } | null {
    console.log('Getting search state:', this.searchState);
    return this.searchState;
  }
}
