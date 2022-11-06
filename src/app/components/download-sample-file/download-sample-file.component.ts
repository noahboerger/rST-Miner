import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-download-sample-file',
    templateUrl: './download-sample-file.component.html',
    styleUrls: ['./download-sample-file.component.scss'],
})
export class DownloadSampleFileComponent {
    @Input() title: string = '';
    @Input() subtitle: string = '';
    @Input() description: string = '';
    @Input() disabled = false;

    @Input() link: Array<string> | string | undefined;

    constructor() {}
}
