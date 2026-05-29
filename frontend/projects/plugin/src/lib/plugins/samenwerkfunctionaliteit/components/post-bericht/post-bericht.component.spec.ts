import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostBerichtComponent } from './post-bericht.component';

describe('PostBerichtComponent', () => {
  let component: PostBerichtComponent;
  let fixture: ComponentFixture<PostBerichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostBerichtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostBerichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
