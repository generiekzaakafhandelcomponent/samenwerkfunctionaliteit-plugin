import {Component, EventEmitter} from '@angular/core';
import {FunctionConfigurationComponent, FunctionConfigurationData} from '@valtimo/plugin';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  standalone: true,
  styleUrl: './upload-document.component.scss'
})
export class UploadDocumentComponent implements FunctionConfigurationComponent{
  configuration: EventEmitter<FunctionConfigurationData>;
  disabled$: Observable<boolean>;
  pluginId: string;
  save$: Observable<void>;
  valid: EventEmitter<boolean>;

}
