import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarloginComponent } from './mostrarlogin.component';

describe('MostrarloginComponent', () => {
  let component: MostrarloginComponent;
  let fixture: ComponentFixture<MostrarloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MostrarloginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
