import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private baseUrl: string = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  searchRepositories(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/repositories?q=${query}`);
  }

  getRepositoryIssues(owner: string, repo: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/repos/${owner}/${repo}/issues?state=all`).pipe(
      map(issues => issues.filter(issue => !issue.pull_request)) // Filter out pull requests
    );
  }

  getRepositoryDetails(owner: string, repo: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/repos/${owner}/${repo}`);
  }
}
