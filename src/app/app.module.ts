import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {FooterComponent} from './components/footer/footer.component';
import {TemplateButtonComponent} from './components/template-button/template-button.component';
import {UploadButtonComponent} from "./components/upload-button/upload-button.component";
import {DragDropFileUploadDirective} from "./directives/drag-drop-file-upload.directive";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DownloadSampleFileComponent } from './components/download-sample-file/download-sample-file.component';
import {MatCardModule} from "@angular/material/card";
import { RstMinerComponent } from './components/rst-miner/rst-miner.component';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        DragDropFileUploadDirective,
        TemplateButtonComponent,
        UploadButtonComponent,
        DownloadSampleFileComponent,
        RstMinerComponent,
    ],
    imports: [
        BrowserModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatCardModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
