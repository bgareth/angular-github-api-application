import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-repository-details',
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule
  ]
})
export class RepositoryDetailsComponent implements OnInit {
  repository: any;

  constructor(
    private route: ActivatedRoute,
    private githubService: GithubService,
    private location: Location
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

  goBack(): void {
    this.location.back();
  }
}
