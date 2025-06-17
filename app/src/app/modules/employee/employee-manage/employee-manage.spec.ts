import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeManage } from './employee-manage';

describe('EmployeeManage', () => {
  let component: EmployeeManage;
  let fixture: ComponentFixture<EmployeeManage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeManage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeManage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
