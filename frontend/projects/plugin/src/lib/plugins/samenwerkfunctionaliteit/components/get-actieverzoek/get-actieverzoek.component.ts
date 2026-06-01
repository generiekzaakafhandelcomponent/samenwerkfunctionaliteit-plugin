import {Component, EventEmitter} from '@angular/core';
import {FunctionConfigurationComponent, FunctionConfigurationData} from '@valtimo/plugin';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-get-actieverzoek',
  templateUrl: './get-actieverzoek.component.html',
  standalone: true,
  styleUrl: './get-actieverzoek.component.scss'
})
export class GetActieverzoekComponent implements FunctionConfigurationComponent {
  configuration: EventEmitter<FunctionConfigurationData>;
  disabled$: Observable<boolean>;
  pluginId: string;
  save$: Observable<void>;
  valid: EventEmitter<boolean>;

}
