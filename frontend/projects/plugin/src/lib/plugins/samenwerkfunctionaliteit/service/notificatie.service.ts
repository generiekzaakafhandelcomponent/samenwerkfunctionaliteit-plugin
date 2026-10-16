import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { NotificatieClient } from '../client/notificatie.client';
import {
  mapNotificatieResponseToNotificatiePage,
  NotificatieResponse,
} from '../dto/notificatie.dto';
import { Notificatie, NotificatiePage } from '../models/notificatie.model';

@Injectable({
  providedIn: 'root',
})
export class NotificatieService {
  notificatieClient = inject(NotificatieClient);

  private readonly AGGREGATE_NOTIFICATIES_PAGE_SIZE = 100;

  getNotificaties(
    samenwerkingId: string,
    page: number,
    size: number,
  ): Observable<NotificatiePage> {
    return this.notificatieClient
      .getNotificaties(samenwerkingId, page, size)
      .pipe(
        map((response: NotificatieResponse) => {
          return mapNotificatieResponseToNotificatiePage(response);
        }),
      );
  }

  getAllNotificaties(samenwerkingId: string): Observable<Notificatie[]> {
    return this.getNotificaties(
      samenwerkingId,
      1,
      this.AGGREGATE_NOTIFICATIES_PAGE_SIZE,
    ).pipe(
      switchMap((firstPage) => {
        const totalPages = firstPage.page.totalPages;

        if (totalPages === 1) {
          return of(firstPage.page.item);
        }

        const remainingPageRequests = Array.from(
          { length: totalPages - 1 },
          (_, index) =>
            this.getNotificaties(
              samenwerkingId,
              index + 2,
              this.AGGREGATE_NOTIFICATIES_PAGE_SIZE,
            ),
        );

        return forkJoin(remainingPageRequests).pipe(
          map((otherPages) =>
            [firstPage, ...otherPages].flatMap(
              (response) => response.page.item,
            ),
          ),
        );
      }),
    );
  }
}
