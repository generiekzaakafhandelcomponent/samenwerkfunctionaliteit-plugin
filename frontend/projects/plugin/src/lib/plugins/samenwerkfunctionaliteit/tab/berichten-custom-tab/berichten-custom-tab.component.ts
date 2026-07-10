import { Component } from '@angular/core';
import { StuurBerichtComponent } from "../../components/berichten/stuur-bericht/stuur-bericht.component";

@Component({
  selector: 'berichten-custom-tab',
  imports: [StuurBerichtComponent],
  templateUrl: './berichten-custom-tab.component.html',
  styleUrl: './berichten-custom-tab.component.css'
})
export class BerichtenCustomTabComponent {

}
