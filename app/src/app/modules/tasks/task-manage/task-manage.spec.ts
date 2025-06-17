import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskManage } from './task-manage';

describe('TaskManage', () => {
  let component: TaskManage;
  let fixture: ComponentFixture<TaskManage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskManage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskManage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
