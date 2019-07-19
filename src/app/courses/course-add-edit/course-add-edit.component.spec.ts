import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAddEditComponent } from './course-add-edit.component';

describe('CourseAddEditComponent', () => {
  let component: CourseAddEditComponent;
  let fixture: ComponentFixture<CourseAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
