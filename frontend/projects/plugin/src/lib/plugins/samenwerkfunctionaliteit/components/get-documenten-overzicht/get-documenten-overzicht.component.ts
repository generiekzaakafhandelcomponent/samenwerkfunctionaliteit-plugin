import {Component, EventEmitter} from '@angular/core';
import {FunctionConfigurationComponent, FunctionConfigurationData} from '@valtimo/plugin';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-get-documenten-overzicht',
  templateUrl: './get-documenten-overzicht.component.html',
  standalone: true,
  styleUrl: './get-documenten-overzicht.component.scss'
})
export class GetDocumentenOverzichtComponent implements FunctionConfigurationComponent {
  configuration: EventEmitter<FunctionConfigurationData>;
  disabled$: Observable<boolean>;
  pluginId: string;
  save$: Observable<void>;
  valid: EventEmitter<boolean>;

}
