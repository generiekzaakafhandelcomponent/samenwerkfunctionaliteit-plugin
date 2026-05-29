import {Component, EventEmitter} from '@angular/core';
import {FunctionConfigurationComponent, FunctionConfigurationData} from '@valtimo/plugin';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-get-all-actieverzoeken',
  templateUrl: './get-all-actieverzoeken.component.html',
  standalone: true,
  styleUrl: './get-all-actieverzoeken.component.scss'
})
export class GetAllActieverzoekenComponent implements FunctionConfigurationComponent {
  configuration: EventEmitter<FunctionConfigurationData>;
  disabled$: Observable<boolean>;
  pluginId: string;
  save$: Observable<void>;
  valid: EventEmitter<boolean>;

}
