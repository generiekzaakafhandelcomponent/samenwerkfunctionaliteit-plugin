import {Component} from '@angular/core';
import { InputModule, ButtonModule, IconModule, IconService } from 'carbon-components-angular';
import {FormsModule} from '@angular/forms';
import {Send32} from '@carbon/icons';

import {ProcessInstance, ProcessService} from '@valtimo/process';
import {ActivatedRoute} from '@angular/router';
import {NGXLogger} from 'ngx-logger';

@Component({
    selector: 'stuur-bericht',
    imports: [InputModule, ButtonModule, IconModule, FormsModule],
    templateUrl: './stuur-bericht.component.html',
    styleUrl: './stuur-bericht.component.scss'
})
export class StuurBerichtComponent {
    placeholder = 'Type hier uw bericht';
    rows = 5;
    enableCounter = true;
    maxLength = 512;
    message = "";

    constructor(
      private route: ActivatedRoute,
      private processService: ProcessService,
      private readonly logger: NGXLogger,
      private readonly iconService: IconService
    ) {
        this.iconService.registerAll([Send32]);
    }

    onClick() {
        this.logger.info(this.message);
    }
}
