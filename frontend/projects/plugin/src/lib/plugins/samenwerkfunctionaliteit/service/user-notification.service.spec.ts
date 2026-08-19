import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { GlobalNotificationService } from '@valtimo/shared';
import { UserNotificationService } from './user-notification.service';

describe('UserNotificationService', () => {
  let service: UserNotificationService;

  let translateService: jasmine.SpyObj<TranslateService>;
  let notificationService: jasmine.SpyObj<GlobalNotificationService>;

  beforeEach(() => {
    translateService = jasmine.createSpyObj('TranslateService', ['instant']);

    notificationService = jasmine.createSpyObj('GlobalNotificationService', [
      'showNotification',
    ]);

    TestBed.configureTestingModule({
      providers: [
        UserNotificationService,
        { provide: TranslateService, useValue: translateService },
        { provide: GlobalNotificationService, useValue: notificationService },
      ],
    });

    service = TestBed.inject(UserNotificationService);
  });

  it('should successfully call showNotification', () => {
    translateService.instant.and.returnValue('translated');

    service.showSuccess({
      titleKey: 'title',
      messageKey: 'message',
    });

    expect(translateService.instant).toHaveBeenCalledWith('title', undefined);
    expect(translateService.instant).toHaveBeenCalledWith('message', undefined);

    expect(notificationService.showNotification).toHaveBeenCalledWith({
      type: 'success',
      title: 'translated',
      message: 'translated',
      duration: 8000,
      showClose: true,
    });
  });
});
