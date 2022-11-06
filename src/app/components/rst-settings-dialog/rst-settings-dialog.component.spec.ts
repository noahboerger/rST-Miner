import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RstSettingsDialogComponent } from './rst-settings-dialog.component';

describe('RstSettingsDialogComponent', () => {
    let component: RstSettingsDialogComponent;
    let fixture: ComponentFixture<RstSettingsDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RstSettingsDialogComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(RstSettingsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
