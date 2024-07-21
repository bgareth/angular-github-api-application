import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';
import { GithubService } from '../../services/github.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatListModule,
    MatButtonModule,
    RouterModule
  ]
})
export class IssuesListComponent implements OnInit {
  issues: any[] = [];
  filteredIssues: any[] = [];
  filterState: string = 'all';

  constructor(
    private route: ActivatedRoute,
    private githubService: GithubService,
    private location: Location,
    private navigationService: NavigationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const owner = this.route.snapshot.paramMap.get('owner');
    const repo = this.route.snapshot.paramMap.get('repo');

    if (owner && repo) {
      this.githubService.getRepositoryIssues(owner, repo).subscribe((data: any) => {
        this.issues = data;
        this.filterIssues();
      });
    } else {
      console.error('Owner or repository name is null');
    }
  }

  filterIssues() {
    if (this.filterState === 'all') {
      this.filteredIssues = this.issues;
    } else {
      this.filteredIssues = this.issues.filter(issue => issue.state === this.filterState);
    }
  }

  goBack(): void {
    this.navigationService.navigateBack();
    this.location.back();
  }
}
