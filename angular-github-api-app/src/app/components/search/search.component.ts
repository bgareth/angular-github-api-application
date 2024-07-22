import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { GithubService } from '../../services/github.service';
import { NavigationService } from '../../services/navigation.service';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0, height: '0px' })),
      state('*', style({ opacity: 1, height: '*' })),
      transition(':enter, :leave', [animate('300ms ease-in-out')])
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(-50%)' }),
          stagger(100, [
            animate('150ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class SearchComponent implements OnInit {
  repositories: any[] = [];
  searchQuery: string = '';
  loading: boolean = false;
  inputFocused: boolean = false;
  searchPerformed: boolean = false;
  currentSearchQuery: string = '';

  constructor(
    private githubService: GithubService,
    private router: Router,
    private route: ActivatedRoute,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    // Load saved search state if available
    const savedState = this.navigationService.getSearchState();
    if (savedState) {
      this.searchQuery = savedState.query;
      this.repositories = savedState.results;
      this.searchPerformed = true;
      this.currentSearchQuery = savedState.query; // Ensure to update this to prevent immediate search reset
    }
  }

  // Perform search and update state
  searchRepositories() {
    if (!this.searchQuery || this.searchQuery === this.currentSearchQuery) {
      return;
    }
    this.loading = true;
    this.currentSearchQuery = this.searchQuery;
    this.githubService.searchRepositories(this.searchQuery).subscribe((data: any) => {
      this.repositories = data.items;
      this.loading = false;
      this.searchPerformed = true;
      this.navigationService.saveSearchState(this.searchQuery, this.repositories);
    });
  }

  // Navigate to repository details page
  navigateToRepository(owner: string, repo: string) {
    this.navigationService.saveSearchState(this.searchQuery, this.repositories);
    this.router.navigate(['/repository', owner, repo]);
  }
}
