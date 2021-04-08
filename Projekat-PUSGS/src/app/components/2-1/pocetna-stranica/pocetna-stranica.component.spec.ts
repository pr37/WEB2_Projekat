import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocetnaStranicaComponent } from './pocetna-stranica.component';

describe('PocetnaStranicaComponent', () => {
  let component: PocetnaStranicaComponent;
  let fixture: ComponentFixture<PocetnaStranicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PocetnaStranicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PocetnaStranicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
