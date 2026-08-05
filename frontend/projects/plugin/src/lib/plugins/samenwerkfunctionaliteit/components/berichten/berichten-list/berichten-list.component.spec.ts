import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBericht } from '../../../models/bericht.model';
import { BerichtenListComponent } from './berichten-list.component';

const mockBerichten: ChatBericht[] = [];
const mockIsLoading: boolean = true;

describe('BerichtenListComponent', () => {
  let component: BerichtenListComponent;
  let fixture: ComponentFixture<BerichtenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BerichtenListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BerichtenListComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('messages', mockBerichten);
    fixture.componentRef.setInput('isLoading', mockIsLoading);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
