import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-repository-details',
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    RouterModule
  ]
})
export class RepositoryDetailsComponent implements OnInit {
  repository: any;

  constructor(
    private route: ActivatedRoute,
    private githubService: GithubService
  ) {}

  ngOnInit(): void {
    const owner = this.route.snapshot.paramMap.get('owner');
    const repo = this.route.snapshot.paramMap.get('repo');

    if (owner && repo) {
      this.githubService.getRepositoryDetails(owner, repo).subscribe((data: any) => {
        this.repository = data;
      });
    } else {
      console.error('Owner or repository name is null');
    }
  }
}
