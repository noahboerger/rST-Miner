import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { UploadButtonComponent } from './upload-button.component';

describe('UploadButtonComponent', () => {
    let component: UploadButtonComponent;
    let fixture: ComponentFixture<UploadButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UploadButtonComponent, MatIcon],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UploadButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should react to file upload field change', () => {
        const element = fixture.nativeElement;
        const input = element.querySelector('.file-input');
        spyOn(component, 'handleFileInput');

        input.dispatchEvent(new Event('change'));

        expect(component.handleFileInput).toHaveBeenCalled();
    });

    it('should emit event with file extension and content', done => {
        const element = fixture.nativeElement;
        const input = element.querySelector('.file-input');
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(new File([exampleFileContent], 'test-file.txt'));
        input.files = dataTransfer.files;

        let subscriber = ([fileExtension, fileContent]: [string, string]) => {
            expect(fileExtension).toBe('txt');
            expect(fileContent).toBe(exampleFileContent);
            done();
        };
        component.newFileUploadedEventExtensionContent.subscribe(subscriber);
        input.dispatchEvent(new Event('change'));
    });

    it('should throw warning if file extension is not permitted', () => {
        component.permittedFileExtensions = ['log', 'txt'];

        const element = fixture.nativeElement;
        const input = element.querySelector('.file-input');

        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(new File([''], 'test-file.xes'));
        input.files = dataTransfer.files;

        spyOn(window, 'alert');

        input.dispatchEvent(new InputEvent('change'));

        expect(window.alert).toHaveBeenCalledWith(
            'Only file types .log,.txt are currently supported'
        );
    });

    const exampleFileContent = '.type log\n.events\ne1 a\ne2 b\n.arcs\ne1 2';
});
