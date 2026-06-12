import {Component, DestroyRef, inject, OnInit, signal, WritableSignal} from "@angular/core";
import {SamenwerkingsStatusComponent} from "../samenwerkingsstatus/samenwerkingsstatus.component";
import {Status} from "../model/status.model";
import {SamenwerkingsinformatiepaginaService} from "../service/samenwerkingsinformatiepagina.service";
import {Subject, takeUntil} from "rxjs";
import {Samenwerking} from "../model/samenwerking.model";
import {SamenwerkingComponent} from "../samenwerking/samenwerking.component";


@Component({
  selector: 'swf-informatie-pagina',
  templateUrl: './swf-informatie-pagina.component.html',
  standalone: true,
  imports: [
    SamenwerkingsStatusComponent,
    SamenwerkingComponent,
  ],
  styleUrl: './swf-informatie-pagina.component.scss'
})
export class SwfInformatiePaginaComponent implements OnInit {

  samenwerkingService = inject(SamenwerkingsinformatiepaginaService);

  status: Status = {
    status: "OPEN"
  };

  samenwerking: WritableSignal<Samenwerking> = signal(null);
  samenwerkingId: string = "SAM-66497";


  destroyRef: DestroyRef = inject(DestroyRef);
  destroy$: Subject<void> = new Subject<void>();


  ngOnInit() {
    this.samenwerkingService.getSamenwerking("SAM-66497").pipe(takeUntil(this.destroy$)).subscribe({
      next: (samenwerking: Samenwerking) => this.samenwerking.set(samenwerking),
      error: (error: Error) => console.log(error.message)
    })
    this.destroyRef.onDestroy(() => this.destroy$.next());
  }


}
