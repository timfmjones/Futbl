import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkrtelComponent } from './skrtel.component';

describe('SkrtelComponent', () => {
  let component: SkrtelComponent;
  let fixture: ComponentFixture<SkrtelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkrtelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkrtelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
