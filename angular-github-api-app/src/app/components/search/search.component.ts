import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    RouterModule
  ]
})
export class SearchComponent {
  repositories: any[] = [];
  searchQuery: string = '';

  constructor(private githubService: GithubService) {}

  searchRepositories() {
    this.githubService.searchRepositories(this.searchQuery).subscribe((data: any) => {
      this.repositories = data.items;
    });
  }
}
