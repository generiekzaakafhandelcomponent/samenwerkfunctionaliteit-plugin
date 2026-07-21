import { Component } from '@angular/core';
import { NotificatieCardListComponent } from '../../components/notificatie-card-list/notificatie-card-list.component';

@Component({
  selector: 'swf-notificaties-custom-tab',
  imports: [NotificatieCardListComponent],
  templateUrl: './notificaties-custom-tab.component.html',
  styleUrl: './notificaties-custom-tab.component.scss',
  standalone: true,
})
export class NotificatiesCustomTabComponent {}
