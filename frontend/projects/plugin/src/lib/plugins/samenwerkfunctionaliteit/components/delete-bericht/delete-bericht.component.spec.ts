import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBerichtComponent } from './delete-bericht.component';

describe('DeleteBerichtComponent', () => {
  let component: DeleteBerichtComponent;
  let fixture: ComponentFixture<DeleteBerichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteBerichtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBerichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
