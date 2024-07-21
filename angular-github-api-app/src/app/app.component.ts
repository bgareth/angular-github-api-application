import { Component, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations/route-animations';
import { CommonModule } from '@angular/common';
import { NavigationService } from './services/navigation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'angular-github-api-app';

  constructor(private navigationService: NavigationService, private renderer: Renderer2) {}

  prepareRoute(outlet: RouterOutlet) {
    const animation = this.navigationService.isNavigatingBack ? 'backward' : 'forward';
    return animation;
  }
}
