import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener, ChangeDetectorRef } from '@angular/core';
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
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
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
    MatProgressSpinnerModule,
    NgxChartsModule,
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
export class IssuesListComponent implements OnInit, AfterViewInit {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  issues: any[] = [];
  filteredIssues: any[] = [];
  filterState: string = 'all';
  loading: boolean = true;
  openIssuesCount: number = 0;
  closedIssuesCount: number = 0;

  // Chart configuration
  public view: [number, number] = [700, 400];
  public showLegend: boolean = true;
  public showLabels: boolean = true;
  public explodeSlices: boolean = false;
  public doughnut: boolean = false;
  public gradient: boolean = true;

  // Color scheme for the chart
  public colorScheme: Color = {
    name: 'vivid',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28']
  };

  public single: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private githubService: GithubService,
    private location: Location,
    private navigationService: NavigationService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const owner = this.route.snapshot.paramMap.get('owner');
    const repo = this.route.snapshot.paramMap.get('repo');

    if (owner && repo) {
      this.githubService.getRepositoryIssues(owner, repo).subscribe((data: any) => {
        this.issues = data;
        this.filterIssues();
        this.updateChart();
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }

  ngAfterViewInit(): void {
    this.setChartView();
    this.cdr.detectChanges();
  }

  // Adjust chart size on window resize
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setChartView();
  }

  // Filter issues based on the selected filter state
  filterIssues() {
    if (this.filterState === 'all') {
      this.filteredIssues = this.issues;
    } else {
      this.filteredIssues = this.issues.filter(issue => issue.state === this.filterState);
    }
    this.updateChart(); // Update chart when filtering issues
  }

  // Update chart data
  updateChart() {
    this.openIssuesCount = this.issues.filter(issue => issue.state === 'open').length;
    this.closedIssuesCount = this.issues.filter(issue => issue.state === 'closed').length;
    this.single = [
      { name: 'Open Issues', value: this.openIssuesCount },
      { name: 'Closed Issues', value: this.closedIssuesCount }
    ];
    this.setChartView();
  }

  // Set chart size based on container size
  setChartView() {
    if (this.chartContainer) {
      const width = this.chartContainer.nativeElement.offsetWidth;
      this.view = [width, 400];
    }
  }

  // Open issue in a new tab
  openIssueInNewTab(issue: any): void {
    const url = issue.html_url;
    window.open(url, '_blank');
  }

  // Navigate back to the previous route
  goBack(): void {
    this.navigationService.navigateBack();
    this.location.back();
  }
}
