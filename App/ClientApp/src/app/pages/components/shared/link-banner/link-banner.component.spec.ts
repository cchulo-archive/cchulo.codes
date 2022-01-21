import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkBannerComponent } from './link-banner.component';

describe('LinkBannerComponent', () => {
  let component: LinkBannerComponent;
  let fixture: ComponentFixture<LinkBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
