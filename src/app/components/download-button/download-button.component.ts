import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-download-button',
    templateUrl: './download-button.component.html',
    styleUrls: ['./download-button.component.scss'],
})
export class DownloadButtonComponent {
    @Input() buttonText: string | undefined;
    @Input() buttonIcon: string | undefined;
    @Input() downloadButtonAction: ((e: MouseEvent) => void) = e => {
    };
    @Input() disabled: boolean = true;

    constructor() {
    }

    prevent(e: Event) {
        e.preventDefault();
        e.stopPropagation();
    }

    hoverStart(e: MouseEvent) {
        this.prevent(e);
        if (!this.disabled) {
            const target = e.target as HTMLElement;
            target.classList.add('mouse-hover');
        }
    }

    hoverEnd(e: MouseEvent) {
        this.prevent(e);
        const target = e.target as HTMLElement;
        target.classList.remove('mouse-hover');
    }

    processMouseClick(e: MouseEvent) {
        if (!this.disabled) {
            this.downloadButtonAction(e);
        }
    }
}
