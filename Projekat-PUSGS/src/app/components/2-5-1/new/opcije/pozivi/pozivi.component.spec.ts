import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoziviComponent } from './pozivi.component';

describe('PoziviComponent', () => {
  let component: PoziviComponent;
  let fixture: ComponentFixture<PoziviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoziviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoziviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
