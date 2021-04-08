import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledIncidenataComponent } from './pregled-incidenata.component';

describe('PregledIncidenataComponent', () => {
  let component: PregledIncidenataComponent;
  let fixture: ComponentFixture<PregledIncidenataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledIncidenataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledIncidenataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
