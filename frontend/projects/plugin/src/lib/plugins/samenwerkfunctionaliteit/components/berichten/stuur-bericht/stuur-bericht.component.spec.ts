import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StuurBerichtComponent} from './stuur-bericht.component';

describe('GgdSendMessageComponent', () => {
  let component: StuurBerichtComponent;
  let fixture: ComponentFixture<StuurBerichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StuurBerichtComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StuurBerichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
