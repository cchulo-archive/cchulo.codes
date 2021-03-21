import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogContentsComponent } from './blog-contents.component';

describe('BlogContentsComponent', () => {
  let component: BlogContentsComponent;
  let fixture: ComponentFixture<BlogContentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogContentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
