import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalNotificationService } from '@valtimo/shared';
import { Notification } from '../interface/error-notification.interface';

@Injectable({ providedIn: 'root' })
export class UserNotificationService {
  private readonly notificationService: GlobalNotificationService = inject(
    GlobalNotificationService,
  );
  private readonly translateService: TranslateService =
    inject(TranslateService);

  private readonly ERROR_MESSAGE_DURATION_IN_MS: number = 20000;

  showError(notification: Notification): void {
    const actionDescription = this.translateService.instant(
      notification.actionDescriptionKey ??
        'samenwerkfunctionaliteit.userFeedback.message.failedGeneric',
    );

    const message = this.translateService.instant(
      notification.messageKey ??
        'samenwerkfunctionaliteit.userFeedback.message.contactYourAdmin',
    );

    this.notificationService.showNotification({
      type: 'error',
      title: actionDescription,
      message: message,
      duration: this.ERROR_MESSAGE_DURATION_IN_MS,
      showClose: true,
    });
  }
}
