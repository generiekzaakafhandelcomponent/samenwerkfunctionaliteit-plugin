import {Component, EventEmitter} from '@angular/core';
import {FunctionConfigurationComponent, FunctionConfigurationData} from '@valtimo/plugin';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-post-bericht',
  templateUrl: './post-bericht.component.html',
  standalone: true,
  styleUrl: './post-bericht.component.scss'
})
export class PostBerichtComponent implements FunctionConfigurationComponent{
  configuration: EventEmitter<FunctionConfigurationData>;
  disabled$: Observable<boolean>;
  pluginId: string;
  save$: Observable<void>;
  valid: EventEmitter<boolean>;

}
