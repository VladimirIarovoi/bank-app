import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {StickyHeaderComponent} from './components/sticky-header/sticky-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StickyHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})

export class AppComponent {
  title = 'bank-app';
}
