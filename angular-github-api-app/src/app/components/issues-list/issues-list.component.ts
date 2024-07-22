import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Location } from '@angular/common';
import { GithubService } from '../../services/github.service';
import { NavigationService } from '../../services/navigation.service';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

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
    MatIconModule,
    MatProgressSpinnerModule, // Add MatProgressSpinnerModule here
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
export class IssuesListComponent implements OnInit {
  issues: any[] = [];
  filteredIssues: any[] = [];
  filterState: string = 'all';
  loading: boolean = true;

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
        this.loading = false;
      });
    } else {
      console.error('Owner or repository name is null');
      this.loading = false;
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
