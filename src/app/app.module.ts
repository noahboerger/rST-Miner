import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { DownloadButtonComponent } from './components/download-button/download-button.component';
import { UploadButtonComponent } from './components/upload-button/upload-button.component';
import { DragDropFileUploadDirective } from './directives/drag-drop-file-upload.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DownloadSampleFileComponent } from './components/download-sample-file/download-sample-file.component';
import { MatCardModule } from '@angular/material/card';
import { RstMinerComponent } from './components/rst-miner/rst-miner.component';
import { RstSettingsDialogComponent } from './components/rst-settings-dialog/rst-settings-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        DragDropFileUploadDirective,
        DownloadButtonComponent,
        UploadButtonComponent,
        DownloadSampleFileComponent,
        RstMinerComponent,
        RstSettingsDialogComponent,
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
        MatCardModule,
        MatDialogModule,
        MatToolbarModule,
        MatExpansionModule,
        MatRadioModule,
        FormsModule,
        MatSelectModule,
        MatCheckboxModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
