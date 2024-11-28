import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoMainComponent } from './pedido-main.component';

describe('PedidoMainComponent', () => {
  let component: PedidoMainComponent;
  let fixture: ComponentFixture<PedidoMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
