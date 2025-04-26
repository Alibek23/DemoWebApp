import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { By } from '@angular/platform-browser';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should disable Previous button on first page', () => {
    component.currentPage = 1;
    fixture.detectChanges();
    const prevButton = fixture.debugElement.query(By.css('.page-item:first-child'));
    expect(prevButton.classes['disabled']).toBeTrue();
  });

  it('should emit pageChange when clicking Next if next page is available', () => {
    component.currentPage = 1;
    component.isNextAvailable = true;
    spyOn(component.pageChange, 'emit');

    fixture.detectChanges();

    const nextButton = fixture.debugElement.queryAll(By.css('.page-item'))[2].nativeElement;
    nextButton.querySelector('a').click();

    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('should not emit pageChange when clicking Next if no next page', () => {
    component.currentPage = 1;
    component.isNextAvailable = false;
    spyOn(component.pageChange, 'emit');

    fixture.detectChanges();

    const nextButton = fixture.debugElement.queryAll(By.css('.page-item'))[2].nativeElement;
    nextButton.querySelector('a').click();

    expect(component.pageChange.emit).not.toHaveBeenCalled();
  });
});
