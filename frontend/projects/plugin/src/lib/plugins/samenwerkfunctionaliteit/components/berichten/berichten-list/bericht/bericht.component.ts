import { Component, inject, input, signal } from '@angular/core';
import { ChatBericht } from '../../../../models/bericht.model';
import { LayerModule } from 'carbon-components-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'swf-bericht',
  imports: [LayerModule],
  templateUrl: './bericht.component.html',
  styleUrl: './bericht.component.scss',
})
export class BerichtComponent {
  private readonly translateService: TranslateService =
    inject(TranslateService);
  message = input<ChatBericht>();
  isSender = signal(false);
  formattedDate: string = '';

  ngOnInit() {
    const random: number = Math.random() * 10;
    if (random < 5) {
      this.isSender.set(true);
    }
    this.formattedDate = this.getFormattedDate(this.message().createdOn);
  }

  private getFormattedDate(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 1) {
      return this.translateService.instant(
        'samenwerkfunctionaliteit.messages.datetimestamp.justNow',
      );
    }

    if (diffMinutes < 60) {
      return diffMinutes === 1
        ? this.translateService.instant(
            'samenwerkfunctionaliteit.messages.datetimestamp.minuteSingular',
            {
              minuteCount: diffMinutes,
            },
          )
        : this.translateService.instant(
            'samenwerkfunctionaliteit.messages.datetimestamp.minutePlural',
            {
              minuteCount: diffMinutes,
            },
          );
    }

    if (date.getDate() === now.getDate()) {
      return (
        this.translateService.instant(
          'samenwerkfunctionaliteit.messages.datetimestamp.today',
        ) + `, ${date.getHours()}:${date.getMinutes()}`
      );
    }

    return new Intl.DateTimeFormat(this.translateService.currentLang, {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(date);
  }
}
