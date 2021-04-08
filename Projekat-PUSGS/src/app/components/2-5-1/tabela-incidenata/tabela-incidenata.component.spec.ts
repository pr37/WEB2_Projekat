import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaIncidenataComponent } from './tabela-incidenata.component';

describe('TabelaIncidenataComponent', () => {
  let component: TabelaIncidenataComponent;
  let fixture: ComponentFixture<TabelaIncidenataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaIncidenataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaIncidenataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
