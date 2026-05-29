import {Component, EventEmitter} from '@angular/core';
import {FunctionConfigurationComponent, FunctionConfigurationData} from '@valtimo/plugin';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-delete-bericht',
  templateUrl: './delete-bericht.component.html',
  standalone: true,
  styleUrl: './delete-bericht.component.scss'
})
export class DeleteBerichtComponent implements FunctionConfigurationComponent {
  configuration: EventEmitter<FunctionConfigurationData>;
  disabled$: Observable<boolean>;
  pluginId: string;
  save$: Observable<void>;
  valid: EventEmitter<boolean>;

}
