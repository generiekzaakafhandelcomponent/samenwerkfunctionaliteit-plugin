import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { ChatBericht } from '../../../models/bericht.model';
import { BerichtComponent } from './bericht/bericht.component';
import { IconModule } from 'carbon-components-angular';

@Component({
  selector: 'berichten-list',
  imports: [BerichtComponent, IconModule],
  templateUrl: './berichten-list.component.html',
  styleUrl: './berichten-list.component.scss',
})
export class BerichtenListComponent {
  messages: InputSignal<ChatBericht[]> = input.required<ChatBericht[]>();
  messageReceiver: InputSignal<string> = input.required<string>();
  isLoading: InputSignal<boolean> = input.required<boolean>();
  sortedMessages: Signal<ChatBericht[]> = computed((): ChatBericht[] => {
    return [...this.messages()].sort(
      (a, b) => a.createdOn.getTime() - b.createdOn.getTime(),
    );
  });
}
