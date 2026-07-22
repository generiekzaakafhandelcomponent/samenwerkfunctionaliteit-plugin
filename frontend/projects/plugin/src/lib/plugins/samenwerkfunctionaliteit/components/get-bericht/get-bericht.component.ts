import {Component, EventEmitter} from '@angular/core';
import {FunctionConfigurationComponent, FunctionConfigurationData} from '@valtimo/plugin';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-get-bericht',
  templateUrl: './get-bericht.component.html',
  standalone: true,
  styleUrl: './get-bericht.component.scss'
})
export class GetBerichtComponent implements FunctionConfigurationComponent {
  configuration: EventEmitter<FunctionConfigurationData>;
  disabled$: Observable<boolean>;
  pluginId: string;
  save$: Observable<void>;
  valid: EventEmitter<boolean>;

}
