import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RstMinerComponent } from './rst-miner.component';

describe('RstMinerComponent', () => {
    let component: RstMinerComponent;
    let fixture: ComponentFixture<RstMinerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RstMinerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(RstMinerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
