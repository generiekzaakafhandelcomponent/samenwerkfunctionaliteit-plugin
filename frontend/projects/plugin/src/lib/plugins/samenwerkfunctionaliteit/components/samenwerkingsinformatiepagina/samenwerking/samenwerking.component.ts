import { Component, inject, input } from '@angular/core';
import { InputModule } from 'carbon-components-angular';
import { Samenwerking } from '../../../models/samenwerking.model';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { capitalize } from '../../../utils/capitalize';

@Component({
  selector: 'samenwerking',
  templateUrl: './samenwerking.component.html',
  standalone: true,
  styleUrl: './samenwerking.component.scss',
  imports: [InputModule, DatePipe, TitleCasePipe],
})
export class SamenwerkingComponent {
  samenwerking = input.required<Samenwerking>();
  capitalize = capitalize;
  titleCase = inject(TitleCasePipe)

  protected transformToTitle(text: string): string{
    const titleText = this.titleCase.transform(text);
    return titleText.replace('_', ' ');
  }
}
