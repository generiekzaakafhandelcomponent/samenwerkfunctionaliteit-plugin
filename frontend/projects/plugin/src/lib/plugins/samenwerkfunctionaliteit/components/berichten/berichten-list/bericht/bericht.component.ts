import { Component, input, signal } from '@angular/core';
import { ChatBericht } from '../../../../models/bericht.model';
import { DatePipe } from '@angular/common';
import { LayerModule } from 'carbon-components-angular';

@Component({
  selector: 'swf-bericht',
  imports: [DatePipe, LayerModule],
  templateUrl: './bericht.component.html',
  styleUrl: './bericht.component.scss',
})
export class BerichtComponent {
  message = input<ChatBericht>();
  isSender = signal(false);

  ngOnInit() {
    const random: number = Math.random() * 10;
    if (random < 5) {
      this.isSender.set(true);
    }
  }
}
