import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateActieverzoekStatusComponent } from './update-actieverzoek-status.component';
import { HttpClient } from '@angular/common/http';
import { Actieverzoek } from '../../../models/actieverzoek.model';
import {
  ActieverzoekStatusType,
  ActieverzoekStatusTypes,
} from '../../../types/actieverzoek-status.type';

const mockActieverzoekStatusTypes: ActieverzoekStatusType[] = [];
const mockActieverzoek: Actieverzoek = {
  actieverzoekId: '',
  amountOfMessages: 0,
  createdOn: new Date(),
  description: '',
  documents: [],
  lastChangedBy: '',
  lastChangedByName: '',
  lastChangedDateTime: '',
  links: null,
  notice: '',
  productId: '',
  receiver: '',
  receiverName: '',
  samenwerkingId: '',
  sender: '',
  senderName: '',
  status: ActieverzoekStatusTypes.OPEN,
  title: '',
};

describe('UpdateActieverzoekStatusComponent', () => {
  let component: UpdateActieverzoekStatusComponent;
  let fixture: ComponentFixture<UpdateActieverzoekStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateActieverzoekStatusComponent],
      providers: [{ provide: HttpClient, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateActieverzoekStatusComponent);

    fixture.componentRef.setInput('actieverzoek', mockActieverzoek);
    fixture.componentRef.setInput(
      'actieverzoekStatusTypes',
      mockActieverzoekStatusTypes,
    );

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
