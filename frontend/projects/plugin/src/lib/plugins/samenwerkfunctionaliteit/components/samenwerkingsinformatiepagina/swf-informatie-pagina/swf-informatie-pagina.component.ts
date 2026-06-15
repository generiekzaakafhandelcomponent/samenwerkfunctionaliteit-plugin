import {Component, DestroyRef, inject, OnInit, signal, WritableSignal} from "@angular/core";
import {SamenwerkingsStatusComponent} from "../samenwerkingsstatus/samenwerkingsstatus.component";
import {SamenwerkingService} from "../../../service/samenwerking.service";
import {skipWhile, Subject, takeUntil} from "rxjs";
import {Samenwerking} from "../model/samenwerking.model";
import {SamenwerkingComponent} from "../samenwerking/samenwerking.component";
import {LoadingModule} from "carbon-components-angular";
import {NgClass} from "@angular/common";


@Component({
  selector: 'swf-informatie-pagina',
  templateUrl: './swf-informatie-pagina.component.html',
  standalone: true,
  imports: [
    SamenwerkingsStatusComponent,
    SamenwerkingComponent,
    LoadingModule,
    NgClass,
  ],
  styleUrl: './swf-informatie-pagina.component.scss'
})
export class SwfInformatiePaginaComponent implements OnInit {
  samenwerkingService = inject(SamenwerkingService);

  samenwerking: WritableSignal<Samenwerking> = signal(null);
  isLoading: WritableSignal<boolean> = signal(true);

  hasError: WritableSignal<boolean> = signal(false);
  errorMessage: WritableSignal<string> = signal("");

  samenwerkingId: string = "SAM-66497"; //TODO samenwerkingId komt uit document (scheduler service)

  destroyRef: DestroyRef = inject(DestroyRef);
  destroy$: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.loadSamenwerking();
    this.destroyRef.onDestroy(() => this.destroy$.next());
  }

  private loadSamenwerking(): void {
    this.samenwerkingService.getSamenwerking(this.samenwerkingId).pipe(
      skipWhile(samenwerking => samenwerking === null),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (samenwerking: Samenwerking) => {
        this.isLoading.set(false);
        this.samenwerking.update(() => samenwerking)
      },
      error: (error: Error) => {
        this.hasError.set(true);
        this.errorMessage.set(error.stack);
      }
    })
  }

}
