import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Location } from '@angular/common';
import { GithubService } from '../../services/github.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-repository-details',
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule
  ]
})
export class RepositoryDetailsComponent implements OnInit {
  repository: any;
  loading: boolean = true; // Add loading flag

  constructor(
    private route: ActivatedRoute,
    private githubService: GithubService,
    private router: Router,
    private location: Location,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    const owner = this.route.snapshot.paramMap.get('owner');
    const repo = this.route.snapshot.paramMap.get('repo');

    if (owner && repo) {
      this.githubService.getRepositoryDetails(owner, repo).subscribe((data: any) => {
        this.repository = data;
        this.loading = false; // Set loading to false when data is loaded
      });
    } else {
      this.loading = false; // Set loading to false in case of error
    }
  }

  goBack(): void {
    this.navigationService.navigateBack();
    this.location.back();
  }

  viewIssues(): void {
    this.router.navigate(['issues'], { relativeTo: this.route });
  }
}
