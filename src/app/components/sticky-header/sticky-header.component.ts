import {Component} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-sticky-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './sticky-header.component.html',
  styleUrl: './sticky-header.component.less'
})
export class StickyHeaderComponent {

}
