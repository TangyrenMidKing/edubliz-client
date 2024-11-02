import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingChinsesComponent } from './training-chinses.component';

describe('TrainingChinsesComponent', () => {
  let component: TrainingChinsesComponent;
  let fixture: ComponentFixture<TrainingChinsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingChinsesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingChinsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
