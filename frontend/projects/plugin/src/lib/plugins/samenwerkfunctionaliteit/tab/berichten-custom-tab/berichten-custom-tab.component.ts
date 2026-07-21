import { Component } from '@angular/core';
import { StuurBerichtComponent } from '../../components/berichten/stuur-bericht/stuur-bericht.component';
import { BerichtenListComponent } from '../../components/berichten/berichten-list/berichten-list.component';

@Component({
  selector: 'berichten-custom-tab',
  imports: [StuurBerichtComponent, BerichtenListComponent],
  templateUrl: './berichten-custom-tab.component.html',
  styleUrl: './berichten-custom-tab.component.css',
})
export class BerichtenCustomTabComponent {}
