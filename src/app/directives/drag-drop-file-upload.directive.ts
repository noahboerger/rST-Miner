import {
    Directive,
    EventEmitter,
    Output,
    HostListener,
    HostBinding,
} from '@angular/core';

@Directive({
    selector: '[appDragDropFileUpload]',
})
export class DragDropFileUploadDirective {
    @HostBinding('class.file-over') fileOver: boolean = false;
    @Output() fileDropped = new EventEmitter<any>();

    @HostListener('dragover', ['$event']) onDragOver(event: any) {
        event.preventDefault();
        event.stopPropagation();
        this.fileOver = true;
    }

    // Dragleave listener
    @HostListener('dragleave', ['$event']) public onDragLeave(event: any) {
        event.preventDefault();
        event.stopPropagation();
        this.fileOver = false;
    }

    @HostListener('drop', ['$event']) public onDrop(event: any) {
        this.fileOver = false;
        event.preventDefault();
        event.stopPropagation();
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            this.fileDropped.emit(files[0]);
        }
    }
}
