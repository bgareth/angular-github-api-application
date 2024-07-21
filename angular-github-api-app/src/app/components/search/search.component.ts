import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { GithubService } from '../../services/github.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
    ])
  ]
})
export class SearchComponent {
  repositories: any[] = [];
  searchQuery: string = '';
  loading: boolean = false;
  inputFocused: boolean = false;
  searchPerformed: boolean = false;
  currentSearchQuery: string = '';

  constructor(private githubService: GithubService) {}

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
    });
  }
}
