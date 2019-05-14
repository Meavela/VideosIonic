import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDetailPage } from './video-detail.page';

describe('VideoDetailPage', () => {
  let component: VideoDetailPage;
  let fixture: ComponentFixture<VideoDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
