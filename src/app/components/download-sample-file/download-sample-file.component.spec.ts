import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadSampleFileComponent } from './download-sample-file.component';

describe('DownloadSampleFileComponent', () => {
  let component: DownloadSampleFileComponent;
  let fixture: ComponentFixture<DownloadSampleFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadSampleFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadSampleFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
