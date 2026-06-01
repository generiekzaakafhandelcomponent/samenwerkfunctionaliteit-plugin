import {Component, EventEmitter} from '@angular/core';
import {FunctionConfigurationComponent, FunctionConfigurationData} from '@valtimo/plugin';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-get-samenwerking-notificaties',
  templateUrl: './get-samenwerking-notificaties.component.html',
  standalone: true,
  styleUrl: './get-samenwerking-notificaties.component.scss'
})
export class GetSamenwerkingNotificatiesComponent implements FunctionConfigurationComponent {
  configuration: EventEmitter<FunctionConfigurationData>;
  disabled$: Observable<boolean>;
  pluginId: string;
  save$: Observable<void>;
  valid: EventEmitter<boolean>;

}
