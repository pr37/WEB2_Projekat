import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementiMrezeComponent } from './elementi-mreze.component';

describe('ElementiMrezeComponent', () => {
  let component: ElementiMrezeComponent;
  let fixture: ComponentFixture<ElementiMrezeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementiMrezeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementiMrezeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
