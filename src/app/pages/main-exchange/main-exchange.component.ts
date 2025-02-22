import {Component} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {BnrApiService} from '../../services/bnr-api/bnr-api.service';

@Component({
  selector: 'app-main-exchange',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './main-exchange.component.html',
  styleUrl: './main-exchange.component.less'
})
export class MainExchangeComponent {
  constructor(private BNRApiService: BnrApiService) {
  }

  public loadBNRData(): void {
    this.BNRApiService.getExchangeRates().subscribe(response => {
      console.log('response', response);
    })
  }
}
