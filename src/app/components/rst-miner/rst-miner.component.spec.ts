import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RstMinerComponent } from './rst-miner.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';

describe('RstMinerComponent', () => {
    let component: RstMinerComponent;
    let fixture: ComponentFixture<RstMinerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RstMinerComponent],
            providers: [MatDialog, Overlay],
            imports: [MatDialogModule],
        }).compileComponents();

        fixture = TestBed.createComponent(RstMinerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
