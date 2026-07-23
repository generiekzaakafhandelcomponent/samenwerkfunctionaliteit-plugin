import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { ChatBericht } from '../../../models/bericht.model';
import { BerichtComponent } from './bericht/bericht.component';

@Component({
  selector: 'berichten-list',
  imports: [BerichtComponent],
  templateUrl: './berichten-list.component.html',
  styleUrl: './berichten-list.component.scss',
})
export class BerichtenListComponent {
  messages: InputSignal<ChatBericht[]> = input.required<ChatBericht[]>();
  isLoading: InputSignal<boolean> = input.required<boolean>();
  sortedMessages: Signal<ChatBericht[]> = computed(() => {
    return [...this.messages()].sort(
      (a, b) => a.createdOn.getTime() - b.createdOn.getTime(),
    );
  });
}
