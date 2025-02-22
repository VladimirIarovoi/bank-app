import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {StickyHeaderComponent} from './components/sticky-header/sticky-header.component';
import {BnrApiService} from './services/bnr-api/bnr-api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StickyHeaderComponent ],
  providers: [BnrApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})

export class AppComponent {
  title = 'bank-app';
}
