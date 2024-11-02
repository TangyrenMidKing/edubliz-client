import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSpanishComponent } from './training-spanish.component';

describe('TrainingSpanishComponent', () => {
  let component: TrainingSpanishComponent;
  let fixture: ComponentFixture<TrainingSpanishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingSpanishComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingSpanishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
